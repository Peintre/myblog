<template>
  <el-card class="main-card my-card-article">
    <div class="title">{{ this.$route.name }}</div>
    <!-- 文章标题 -->
    <div class="article-title-container">
      <el-input
        v-model="article.articleTitle"
        size="default"
        placeholder="输入文章标题"
      />
      <el-button
        type="danger"
        size="default"
        class="save-btn"
        @click="saveArticleDraft"
        v-if="article.id == null || article.status == 3"
      >
        保存草稿
      </el-button>
      <el-button
        type="danger"
        size="default"
        @click="openModel"
        style="margin-left:10px"
      >
        发布文章
      </el-button>
    </div>
    <!-- 文章内容 -->
    <v-md-editor 
      v-model="article.articleContent" 
      :left-toolbar = "leftToolbar"
      :disabled-menus="[]"
      :toolbar="toolbar"  
      @upload-image="handleUploadImage"
      @save="saveChicked"
      ref="md"
     />
    <!-- 添加文章对话框 -->
    <el-dialog v-model="addOrEdit" width="40%" top="3vh">
      <template #header>
        <div class="dialog-title-container">
          发布文章
        </div>
      </template>
      <!-- 文章数据 -->
      <el-form label-width="80px" size="large" :model="article">
        <!-- 文章分类 -->
        <el-form-item label="文章分类">
          <el-tag
            type="success"
            v-show="article.categoryName"
            style="margin:0 1rem 0 0"
            :closable="true"
            @close="removeCategory"
          >
            {{ article.categoryName }}
          </el-tag>
          <!-- 分类选项 -->
          <el-popover
            placement="bottom-start"
            width="460"
            trigger="click"
            v-if="!article.categoryName"
          >
            <div class="popover-title">
              分类
            </div>
            <!-- 搜索框 -->
            <el-autocomplete
              style="width:100%"
              v-model="categoryName"
              :fetch-suggestions="searchCategories"
              @keyup.enter.native="saveCategory"
              @select="handleSelectCategories"
              placeholder="请输入分类名搜索,enter可添加自定义分类"
              :trigger-on-focus="false"
              >          
              <template #suffix>
                <el-icon><edit /></el-icon>
              </template>
              <template #default="{ item }">
                <div>{{ item.categoryName }}</div>
              </template>
            </el-autocomplete>
            <!-- 分类 -->
            <div class="popover-container">
              <div
                v-for="item of categoryList"
                :key="item.id"
                class="category-item"
                @click="addCategory(item)"
              >
                {{ item.categoryName }}
              </div>
            </div>
            <template #reference>
              <el-button type="success" plain slot="reference" size="default">
                添加分类
              </el-button>
            </template>
          </el-popover>
        </el-form-item>
        <!-- 文章标签 -->
        <el-form-item label="文章标签">
          <el-tag
            v-for="(item, index) of article.tagNameList"
            :key="index"
            style="margin:0 1rem 0 0"
            :closable="true"
            @close="removeTag(item)"
          >
            {{ item }}
          </el-tag>
          <!-- 标签选项 -->
          <el-popover
            placement="bottom-start"
            width="460"
            trigger="click" 
          >
            <div class="popover-title">标签</div>
            <!-- 搜索框 -->
            <el-autocomplete
              style="width:100%"
              v-model="tagName"
              :fetch-suggestions="searchTags"
              placeholder="请输入标签名搜索,enter可添加自定义标签"
              :trigger-on-focus="false"
              @keyup.enter.native="saveTag"
              @select="handleSelectTag"
            >
              <template #suffix>
                <el-icon><edit /></el-icon>
              </template>
              <template #default="{ item }">
                <div>{{ item.tagName }}</div>
              </template>
            </el-autocomplete>
            <!-- 标签 -->
            <div class="popover-container">
              <div style="margin-bottom:1rem">添加标签</div>
              <el-tag
                v-for="(item, index) of tagList"
                :key="index"
                :class="tagClass(item)"
                @click="addTag(item)"
              >
                {{ item.tagName }}
              </el-tag>
            </div>
            <template #reference>
              <el-button type="primary" plain size="default">
                添加标签
              </el-button>
            </template>
          </el-popover>
        </el-form-item>
        <el-form-item label="文章类型">
          <el-select v-model="article.type" placeholder="请选择类型">
            <el-option
              v-for="item in typeList"
              :key="item.type"
              :label="item.desc"
              :value="item.type"
            />
          </el-select>
        </el-form-item>
        <!-- 文章类型 -->
        <el-form-item label="原文地址" v-if="article.type != 1">
          <el-input
            v-model="article.originalUrl"
            placeholder="请填写原文链接"
          />
        </el-form-item>
        <el-form-item label="文章封面">
          <el-upload
            :class="myUploadClass"
            drag
            action="/api/article/images"
            :before-upload="beforeUpload"
            :on-success="uploadCover"
            :show-file-list="false"
          >
            <el-icon v-if="article.articleCover == ''"><Upload /></el-icon>
            <div class="el-upload__text" v-if="article.articleCover == ''">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <img
              v-else
              :src="article.articleCover"
              style="width:360px;height:180px"
            />
          </el-upload>
        </el-form-item>
        <el-form-item label="置顶">
          <el-switch
            v-model="article.isTop"
            active-color="#13ce66"
            inactive-color="#F4F4F5"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="发布形式">
          <el-radio-group v-model="article.status">
            <el-radio :label="1">公开</el-radio>
            <el-radio :label="2">私密</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addOrEdit = false">取 消</el-button>
        <el-button type="danger" @click="saveOrUpdateArticle">
          发 表
        </el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
// Vue中图片压缩的工具 
import * as imageConversion from "image-conversion"
import {praseDateStr} from "@/assets/js/common.js"
export default {
  created() {
    this.articleType()
  },
  unmounted() {
    //文章自动保存功能
    this.autoSaveArticle()
  },
  data: function() {
    return {
      addOrEdit: false,
      autoSave: true,
      categoryName: "",
      tagName: "",
      leftToolbar:"undo clear | h bold italic strikethrough quote | ul ol table hr | link image code | save | tips emoji",
      //自定义工具栏
      toolbar:{  
        tips: {
          icon: 'v-md-icon-tip',
          title: '提示信息',
          menus: [
            {
              name: 'info',
              text: 'info',
              action(editor) {
                editor.insert(function (selected) {
                  const prefix = '::: details'
                  const suffix = ':::'
                  const placeholder = '请输入文本'
                  const content = selected || placeholder
                  return {
                    text: `${prefix}\n${content}\n${suffix}`,
                    selected: content,
                  }
                })
              }
            },
            {
              name: 'success',
              text: 'success',
              action(editor) {
                editor.insert(function (selected) {
                  const prefix = '::: tip'
                  const suffix = ':::'
                  const placeholder = '请输入文本'
                  const content = selected || placeholder
                  return {
                    text: `${prefix}\n${content}\n${suffix}`,
                    selected: content,
                  }
                })
              }
            },
            {
              name: 'warning',
              text: 'warning',
              action(editor) {
                editor.insert(function (selected) {
                  const prefix = '::: warning'
                  const suffix = ':::'
                  const placeholder = '请输入文本'
                  const content = selected || placeholder
                  return {
                    text: `${prefix}\n${content}\n${suffix}`,
                    selected: content,
                  }
                })
              }
            },
            {
              name: 'danger',
              text: 'danger',
              action(editor) {
                editor.insert(function (selected) {
                  const prefix = '::: danger'
                  const suffix = ':::'
                  const placeholder = '请输入文本'
                  const content = selected || placeholder
                  return {
                    text: `${prefix}\n${content}\n${suffix}`,
                    selected: content,
                  }
                })
              }
            },
          ]
        },
      },
      categoryList: [],
      tagList: [],
      typeList: [
        {
          type: 1,
          desc: "原创"
        },
        {
          type: 2,
          desc: "转载"
        },
        {
          type: 3,
          desc: "翻译"
        }
      ],
      article: {
        id: null,
        articleTitle: '',
        articleContent: "",
        articleCover: "",
        categoryName: null,
        tagNameList: [],
        originalUrl: "",
        isTop: 0,
        type: 1,
        status: 1
      }  
    }
  },
  methods: {
    //判断页面类型
    articleType(){
      let articleId = this.$route.params.id
      const this_ = this
      if(articleId){
        //修改文章     
        this.axios.get("/api/article/getBackArticle/" + articleId).then(({ data }) => {
          this_.article = data.data
        })
      }else{
        //新文章
        const article = sessionStorage.getItem("article")
        if (article) {
          this_.article = JSON.parse(article)
        }
      } 
    },
    //查询分类
    listCategories() {
      this.axios.get("/api/category/getCategory").then(({ data }) => {
        this.categoryList = data.data
      })
    },
    //查询标签
    listTags() {
      this.axios.get("/api/tag/getTag").then(({ data }) => {
        this.tagList = data.data
      })
    },
    //打开发布页面
    openModel() {
      if (this.article.articleTitle.trim() == "") {
        this.$message.error("文章标题不能为空")
        return false
      }
      if (this.article.articleContent.trim() == "") {
        this.$message.error("文章内容不能为空")
        return false
      }
      this.listCategories()
      this.listTags()
      this.addOrEdit = true
    },
    //图片上传结果处理
    uploadCover(response) {
      this.$message.success('上传成功')
      this.article.articleCover = response.data
    },
    //图片上传之前处理
    beforeUpload(file) { 
      const typeList = ['image/jpeg', 'image/png', 'image/gif']
      const isTypeValid = typeList.includes(file.type)
      if (!isTypeValid) {
        this.$message.error('图片格式只能是 JPG/PNG/GIF!')
        return false
      } 
      return new Promise((resolve,reject) => {  
        // 图片小于200kb
        if (file.size / 1024 < 200) { 
          resolve(file)
        }
        // 大于 200 kb 就压缩
        imageConversion.compressAccurately(file, 200).then(res => {
          resolve(res)
        })
      })
    },
    //文章中上传图片
    handleUploadImage(event, insertImage, files) {
      let file = files[0]
      const typeList = ['image/jpeg', 'image/png', 'image/gif']
      const isTypeValid = typeList.includes(file.type)
      if (!isTypeValid) {
        this.$message.error('图片格式只能是 JPG/PNG/GIF!')
        return false
      }
      let formdata = new FormData()
      // 图片小于200kb
      if (file.size / 1024 < 200) {
        formdata.append("file", file)
        this.axios.post("/api/article/images", formdata)
        .then(({ data }) => {
          insertImage({
            url: data.data,
            desc: 'description',
            width: 'auto',
            height: 'auto',
          })
        })
      }else{
        imageConversion.compressAccurately(file, 200).then(res => {
          formdata.append("file",new window.File([res], file.name, { type: file.type }))
          this.axios.post("/api/article/images", formdata)
          .then(({ data }) => {
            insertImage({
              url: data.data,
              desc: 'description',
              width: 'auto',
              height: 'auto',
            })
          })
        })
      } 
    },
    //编辑器保存按钮
    saveChicked(){
      // 保存本地文章记录
      if (this.autoSave && this.article.id == null) {
        sessionStorage.setItem("article", JSON.stringify(this.article))
      }
    },
    //保存草稿
    saveArticleDraft() {
      if (this.article.articleTitle.trim() == "") {
        this.$message.error("文章标题不能为空")
        return false
      }
      if (this.article.articleContent.trim() == "") {
        this.$message.error("文章内容不能为空")
        return false
      }
      this.article.status = 3
      this.axios.post("/api/article/saveOrUpdateArticle", this.article).then(({ data }) => {
        if (data.flag) {
          if (this.article.id === null) {
            this.$store.commit("removeTab", "发布文章")
          } else {
            this.$store.commit("removeTab", "修改文章")
          }
          sessionStorage.removeItem("article")
          this.$router.push({ path: "/article-list" })
          this.$notify.success({
            title: "成功",
            message: "保存草稿成功"
          })
        } else {
          this.$notify.error({
            title: "失败",
            message: "保存草稿失败"
          })
        }
      })
      //关闭自动保存功能
      this.autoSave = false
    },
    //发布文章
    saveOrUpdateArticle() {
      if (this.article.articleTitle.trim() == "") {
        this.$message.error("文章标题不能为空")
        return false
      }
      if (this.article.articleContent.trim() == "") {
        this.$message.error("文章内容不能为空")
        return false
      }
      if (this.article.categoryName == null) {
        this.$message.error("文章分类不能为空")
        return false
      }
      if (this.article.tagNameList.length == 0) {
        this.$message.error("文章标签不能为空")
        return false
      }
      this.axios.post("/api/article/saveOrUpdateArticle", this.article).then(({ data }) => {
        if (data.flag) {
          if (this.article.id === null) {
            this.$store.commit("removeTab", "发布文章")
          } else {
            this.$store.commit("removeTab", "修改文章")
          }
          sessionStorage.removeItem("article")
          this.$router.push({ path: "/article-list" })
          this.$notify.success({
            title: "成功",
            message: data.message
          })
        } else {
          this.$notify.error({
            title: "失败",
            message: data.message
          })
        }
        this.addOrEdit = false
      })
      //关闭自动保存功能
      this.autoSave = false
    },
    //自动保存文章
    autoSaveArticle() {
      // 自动上传文章
      if (
        this.autoSave &&
        this.article.articleTitle.trim() != "" &&
        this.article.articleContent.trim() != "" &&
        this.article.id != null
      ) {
        this.axios
          .post("/api/article/saveOrUpdateArticle", this.article)
          .then(({ data }) => {
            if (data.flag) {
              this.$notify.success({
                title: "成功",
                message: "自动保存成功"
              })
            } else {
              this.$notify.error({
                title: "失败",
                message: "自动保存失败"
              })
            }
          })
      }
      // 保存本地文章记录
      if (this.autoSave && this.article.id == null) {
        sessionStorage.setItem("article", JSON.stringify(this.article))
      }
    },
    //关键字查询分类
    searchCategories(queryString, cb) {
      this.axios
        .get("/api/category/getCategory", {
          params: {
            keywords: queryString
          }
        })
        .then(({ data }) => {
          let results = data.data
          cb(results)
        })
    },
    handleSelectCategories(item) {
      this.addCategory({
        categoryName: item.categoryName
      })
    },
    saveCategory() {
      if (this.categoryName.trim() != "") {  
        this.article.categoryName= this.categoryName
        this.categoryName = ""
      }
    },
    addCategory(item) {
      this.article.categoryName = item.categoryName
    },
    removeCategory() {
      this.article.categoryName = null
    },
    //关键字查询标签
    searchTags(keywords, cb) {
      this.axios
        .get("/api/tag/getTag", {
          params: {
            keywords: keywords
          }
        })
        .then(({ data }) => {
          cb(data.data)
        })
    },
    handleSelectTag(item) {
      this.addTag({
        tagName: item.tagName
      })
    },
    saveTag() {
      if (this.tagName.trim() != "") {
        this.addTag({
          tagName: this.tagName
        })
        this.tagName = ""
      }
    },
    addTag(item) {
      if (this.article.tagNameList.indexOf(item.tagName) == -1) {
        this.article.tagNameList.push(item.tagName)
      }
    },
    removeTag(item) {
      const index = this.article.tagNameList.indexOf(item)
      this.article.tagNameList.splice(index, 1)
    }
  },
  computed: {
    tagClass() {
      const tagNameList = this.article.tagNameList
      return function(item) {
        const index = tagNameList.indexOf(item.tagName)
        return index != -1 ? "tag-item-select" : "tag-item"
      }
    },
    dataFormat(){
      return function(date){
        return praseDateStr(date,"YYYY-MM-DD")
      }
    },
    myUploadClass(){
      if(this.article.articleCover === ''){
        return 'upload-cover'
      }
      return 'my-upload-cover'
    }
  }
}
</script>

<style scoped>
.my-card-article .v-md-editor{
  height: calc(100vh - 250px);
}

.article-title-container {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  margin-top: 2.25rem;
}
.save-btn {
  margin-left: 0.75rem;
  background: #fff;
  color: #f56c6c;
}
.tag-item {
  margin-right: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
}
.tag-item-select {
  margin-right: 1rem;
  margin-bottom: 1rem;
  cursor: not-allowed;
  color: #ccccd8 !important;
}
.category-item {
  cursor: pointer;
  padding: 0.6rem 0.5rem;
}
.category-item:hover {
  background-color: #f0f9eb;
  color: #67c23a;
}
.popover-title {
  margin-bottom: 1rem;
  text-align: center;
}
.popover-container {
  margin-top: 1rem;
  height: 260px;
  overflow-y: auto;
}
</style>
