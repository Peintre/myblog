package com.peintre.service.impl;

import cn.hutool.core.exceptions.ExceptionUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import cn.hutool.core.util.StrUtil;
import com.peintre.config.BizException;
import com.peintre.dao.ArticleDao;
import com.peintre.dao.ArticleTagDao;
import com.peintre.dao.CategoryDao;
import com.peintre.dao.TagDao;
import com.peintre.dto.ArticleBackDTO;
import com.peintre.dto.blog.*;
import com.peintre.entity.Article;
import com.peintre.entity.ArticleTag;
import com.peintre.entity.Category;
import com.peintre.entity.Tag;
import com.peintre.enums.FileExtEnum;
import com.peintre.enums.FilePathEnum;
import com.peintre.service.*;
import com.peintre.strategy.context.UploadStrategyContext;
import com.peintre.utils.BeanCopyUtils;
import com.peintre.utils.PageUtils;
import com.peintre.utils.UserUtils;
import com.peintre.vo.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import static com.peintre.constant.CommonConst.FALSE;
import static com.peintre.constant.CommonConst.TRUE;
import static com.peintre.constant.RedisPrefixConst.ARTICLE_LIKE_COUNT;
import static com.peintre.constant.RedisPrefixConst.ARTICLE_VIEWS_COUNT;
import static com.peintre.enums.ArticleStatusEnum.DRAFT;
import static com.peintre.enums.ArticleStatusEnum.PUBLIC;

/**
 * @Program: MyBlog
 * @Description: (tb_article)??????????????????
 * @Author: Peintre
 * @Date: 2022-12-18 16:34:08
 **/
@Service("articleService")
public class ArticleServiceImpl extends ServiceImpl<ArticleDao, Article> implements ArticleService {
   
    @Autowired
    private ArticleDao articleDao;

    @Autowired
    private UploadStrategyContext uploadStrategyContext;

    @Autowired
    private RedisService redisService;

    @Autowired
    private BlogInfoService blogInfoService;

    @Autowired
    private CategoryDao categoryDao;

    @Autowired
    private ArticleTagDao articleTagDao;

    @Autowired
    private ArticleTagService articleTagService;

    @Autowired
    private TagService tagService;

    @Autowired
    private TagDao tagDao;


    @Override
    public PageResultVo<ArticleBackDTO> listArticleBacks(ConditionVo condition) {
        // ??????????????????
        Integer count = articleDao.countArticleBacks(condition);
        if (count == 0) {
            return new PageResultVo<>();
        }
        // ??????????????????
        List<ArticleBackDTO> articleBackDTOList = articleDao.listArticleBacks(PageUtils.getLimitCurrent(), PageUtils.getSize(), condition);
        //?????????????????????????????????
        Map<Object, Double> viewsCountMap = redisService.zAllScore(ARTICLE_VIEWS_COUNT);
        Map<String, Object> likeCountMap = redisService.hGetAll(ARTICLE_LIKE_COUNT);
        // ???????????????????????????
        articleBackDTOList.forEach(item -> {
            Double viewsCount = viewsCountMap.get(item.getId());
            if (Objects.nonNull(viewsCount)) {
                item.setViewsCount(viewsCount.intValue());
            }
            item.setLikeCount((Integer) likeCountMap.get(item.getId().toString()));
        });
        return new PageResultVo<>(articleBackDTOList, count);
    }

    @Override
    public List<String> exportArticles(List<Integer> articleIdList) {
        // ??????????????????
        List<Article> articleList = articleDao.selectList(new LambdaQueryWrapper<Article>()
                .select(Article::getArticleTitle, Article::getArticleContent)
                .in(Article::getId, articleIdList));
        // ?????????????????????
        List<String> urlList = new ArrayList<>();
        for (Article article : articleList) {
            try (ByteArrayInputStream inputStream = new ByteArrayInputStream(article.getArticleContent().getBytes())) {
                String url = uploadStrategyContext.executeUploadStrategy(article.getArticleTitle() + FileExtEnum.MD.getExtName(), inputStream, FilePathEnum.MD.getPath());
                urlList.add(url);
            } catch (Exception e) {
                log.error(StrUtil.format("??????????????????,??????:{}", ExceptionUtil.stacktraceToString(e)));
                throw new BizException("??????????????????");
            }
        }
        return urlList;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void saveOrUpdateArticle(ArticleVo articleVo) {
        // ????????????????????????
        CompletableFuture<WebsiteConfigVo> webConfig = CompletableFuture.supplyAsync(() -> blogInfoService.getWebsiteConfig());

        // ??????????????????
        Category category = saveArticleCategory(articleVo);
        // ?????????????????????
        Article article = BeanCopyUtils.copyObject(articleVo, Article.class);
        //????????????Id
        if (Objects.nonNull(category)) {
            article.setCategoryId(category.getId());
        }
        // ????????????????????????
        if (StrUtil.isBlank(article.getArticleCover())){
            try {
                article.setArticleCover(webConfig.get().getArticleCover());
            } catch (Exception e) {
                throw new BizException("??????????????????????????????");
            }
        }
        //????????????id
        article.setUserId(UserUtils.getLoginUser().getUserInfoId());
        this.saveOrUpdate(article);
        // ??????????????????
        saveArticleTag(articleVo, article.getId());
    }

    @Override
    public void updateArticlesStatus(IdsVo idsVo, Integer status) {
        // ??????????????????????????????
        List<Article> articleList = idsVo.getIdList().stream().map(id -> Article.builder()
                .id(id)
                .isTop(FALSE)
                .isDelete(status)
                .build())
                .collect(Collectors.toList());
        this.updateBatchById(articleList);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void deleteArticles(IdsVo idsVo) {
        // ????????????????????????
        articleTagDao.delete(new LambdaQueryWrapper<ArticleTag>().in(ArticleTag::getArticleId, idsVo.getIdList()));
        // ????????????
        articleDao.deleteBatchIds(idsVo.getIdList());
    }

    @Override
    public ArticleVo getArticleBackById(Integer articleId) {
        // ??????????????????
        Article article = articleDao.selectById(articleId);
        // ??????????????????
        Category category = categoryDao.selectById(article.getCategoryId());
        String categoryName = null;
        if (Objects.nonNull(category)) {
            categoryName = category.getCategoryName();
        }
        // ??????????????????
        List<String> tagNameList = tagDao.listTagNameByArticleId(articleId);
        // ????????????
        ArticleVo articleVo = BeanCopyUtils.copyObject(article, ArticleVo.class);
        articleVo.setCategoryName(categoryName);
        articleVo.setTagNameList(tagNameList);
        return articleVo;
    }

    @Override
    public void updateArticleTop(ArticleTopVo articleTopVo) {
        Article article = Article.builder().id(articleTopVo.getId()).isTop(articleTopVo.getIsTop()).build();
        articleDao.updateById(article);
    }

    @Override
    public List<ArticleBlogDTO> listArticles() {
        return articleDao.listArticles(PageUtils.getLimitCurrent(), PageUtils.getSize());
    }

    @Override
    public PageResultVo<ArchiveArticleDTO> listArchives() {
        Page<Article> page = new Page<>(PageUtils.getCurrent(), PageUtils.getSize());
        // ??????????????????
        Page<Article> articlePage = articleDao.selectPage(page, new LambdaQueryWrapper<Article>()
                .select(Article::getId, Article::getArticleTitle, Article::getCreateTime).orderByDesc(Article::getCreateTime)
                .eq(Article::getIsDelete, FALSE)
                .eq(Article::getStatus, PUBLIC.getStatus()));
        List<ArchiveArticleDTO> archiveDTOList = BeanCopyUtils.copyList(articlePage.getRecords(), ArchiveArticleDTO.class);
        return new PageResultVo<>(archiveDTOList, (int) articlePage.getTotal());
    }

    @Override
    public ArticleDTO getArticleById(Integer articleId) {
        // ??????????????????
        // CompletableFuture.supplyAsync???????????????????????????
        CompletableFuture<List<ArticleRecommendDTO>> recommendArticleList = CompletableFuture.supplyAsync(() -> articleDao.listRecommendArticles(articleId));
        // ??????????????????
        CompletableFuture<List<ArticleRecommendDTO>> newestArticleList = CompletableFuture.supplyAsync(() -> {
            List<Article> articleList = articleDao.selectList(new LambdaQueryWrapper<Article>()
                    .select(Article::getId, Article::getArticleTitle, Article::getArticleCover, Article::getCreateTime).eq(Article::getIsDelete, FALSE)
                    .eq(Article::getStatus, PUBLIC.getStatus()).orderByDesc(Article::getId).last("limit 5"));
            return BeanCopyUtils.copyList(articleList, ArticleRecommendDTO.class);
        });
        // ??????id????????????
        ArticleDTO article = articleDao.getArticleById(articleId);
        if (Objects.isNull(article)) {
            throw new BizException("???????????????");
        }
        // TODO ?????????????????????
//        updateArticleViewsCount(articleId);
        // ??????????????????????????????
        Article lastArticle = articleDao.selectOne(new LambdaQueryWrapper<Article>()
                .select(Article::getId, Article::getArticleTitle, Article::getArticleCover).eq(Article::getIsDelete, FALSE)
                .eq(Article::getStatus, PUBLIC.getStatus())
                .lt(Article::getId, articleId)
                .orderByDesc(Article::getId).last("limit 1"));
        Article nextArticle = articleDao.selectOne(new LambdaQueryWrapper<Article>()
                .select(Article::getId, Article::getArticleTitle, Article::getArticleCover).eq(Article::getIsDelete, FALSE)
                .eq(Article::getStatus, PUBLIC.getStatus())
                .gt(Article::getId, articleId).orderByAsc(Article::getId)
                .last("limit 1"));
        article.setLastArticle(BeanCopyUtils.copyObject(lastArticle, ArticlePaginationDTO.class));
        article.setNextArticle(BeanCopyUtils.copyObject(nextArticle, ArticlePaginationDTO.class));
        // TODO ???????????????????????????
//        Double score = redisService.zScore(ARTICLE_VIEWS_COUNT, articleId);
//        if (Objects.nonNull(score)) {
//            article.setViewsCount(score.intValue());
//        }
//        article.setLikeCount((Integer) redisService.hGet(ARTICLE_LIKE_COUNT, articleId.toString()));
        // ??????????????????
        try {
            article.setRecommendArticleList(recommendArticleList.get());
            article.setNewestArticleList(newestArticleList.get());
        } catch (Exception e) {
            log.error(StrUtil.format("????????????:{}", ExceptionUtil.stacktraceToString(e)));
        }
        return article;
    }

    @Override
    public ArticlePreviewListDTO listArticlesByCondition(ConditionVo condition) {
        // ????????????
        List<ArticlePreviewDTO> articlePreviewDTOList = articleDao.listArticlesByCondition(PageUtils.getLimitCurrent(), PageUtils.getSize(), condition);
        // ?????????????????????(??????????????????)
        String name;
        if (Objects.nonNull(condition.getCategoryId())) {
            name = categoryDao.selectOne(new LambdaQueryWrapper<Category>().select(Category::getCategoryName)
                    .eq(Category::getId, condition.getCategoryId())).getCategoryName();
        } else {
            name = tagService.getOne(new LambdaQueryWrapper<Tag>()
                    .select(Tag::getTagName).eq(Tag::getId, condition.getTagId())).getTagName();
        }
        return ArticlePreviewListDTO.builder().articlePreviewDTOList(articlePreviewDTOList).name(name).build();
    }

    @Override
    public void importArticles(MultipartFile[] files) {
        if(files.length<1){
            throw new BizException("???????????????");
        }
        for(MultipartFile file:files){
            // ?????????????????????????????????
            String filename = file.getOriginalFilename();
            if (StringUtils.isBlank(filename)) {
                throw new BizException("?????????????????????");
            }
            String[] arr = filename.split("\\.");
            String articleTitle = arr[0];
            // ??????????????????
            StringBuilder articleContent = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
                while (reader.ready()) {
                    articleContent.append((char) reader.read());
                }
            } catch (IOException e) {
                log.error(StrUtil.format("??????????????????, ??????:{}", ExceptionUtil.stacktraceToString(e)));
                throw new BizException("??????????????????");
            }
            // ????????????
            ArticleVo articleVO = ArticleVo.builder()
                    .articleTitle(articleTitle)
                    .articleContent(articleContent.toString())
                    .type(TRUE)
                    .status(DRAFT.getStatus())
                    .build();
            this.saveOrUpdateArticle(articleVO);
        }
    }

    /**
     * ??????????????????
     *
     * @param articleVo ????????????
     * @return {@link Category} ????????????
     */
    private Category saveArticleCategory(ArticleVo articleVo) {
        // ????????????????????????
        Category category = categoryDao.selectOne(new LambdaQueryWrapper<Category>().eq(Category::getCategoryName, articleVo.getCategoryName()));
        if (Objects.isNull(category) && !articleVo.getStatus().equals(DRAFT.getStatus())) {
            category = Category.builder().categoryName(articleVo.getCategoryName()).build();
            categoryDao.insert(category);
        }
        return category;
    }

    /**
     * ??????????????????
     *
     * @param articleVo ????????????
     */
    private void saveArticleTag(ArticleVo articleVo, Integer articleId) {
        // ???????????????????????????????????????
        if (Objects.nonNull(articleVo.getId())) {
            articleTagDao.delete(new LambdaQueryWrapper<ArticleTag>().eq(ArticleTag::getArticleId, articleVo.getId()));
        }
        // ??????????????????
        List<String> tagNameList = articleVo.getTagNameList();
        if (CollectionUtils.isNotEmpty(tagNameList)) {
            // ????????????????????????
            List<Tag> existTagList = tagService.list(new LambdaQueryWrapper<Tag>().in(Tag::getTagName, tagNameList));
            List<String> existTagNameList = existTagList.stream().map(Tag::getTagName).collect(Collectors.toList());
            List<Integer> existTagIdList = existTagList.stream().map(Tag::getId).collect(Collectors.toList());
            // ??????????????????????????????
            tagNameList.removeAll(existTagNameList);
            if (CollectionUtils.isNotEmpty(tagNameList)) {
                List<Tag> tagList = tagNameList.stream().map(item -> Tag.builder().tagName(item).build()).collect(Collectors.toList());
                tagService.saveBatch(tagList);
                List<Integer> tagIdList = tagList.stream().map(Tag::getId).collect(Collectors.toList());
                existTagIdList.addAll(tagIdList);
            }
            // ????????????id????????????
            List<ArticleTag> articleTagList = existTagIdList.stream().map(item -> ArticleTag.builder()
                    .articleId(articleId)
                    .tagId(item)
                    .build())
                    .collect(Collectors.toList());
            articleTagService.saveBatch(articleTagList);
        }
    }
}

