<template>
  <el-card class="main-card">
    <div class="title">{{ this.$route.name }}</div>
    <!-- 文章状态 -->
    <div class="article-status-menu">
      <span>状态</span>
      <span @click="changeStatus('all')" :class="isActive('all')">全部</span>
      <span @click="changeStatus('public')" :class="isActive('public')">
        公开
      </span>
      <span @click="changeStatus('secret')" :class="isActive('secret')">
        私密
      </span>
      <span @click="changeStatus('draft')" :class="isActive('draft')">
        草稿箱
      </span>
      <span @click="changeStatus('delete')" :class="isActive('delete')">
        回收站
      </span>
    </div>
    <!-- 表格操作 -->
    <div class="operation-container">
      <el-button
        v-if="isDelete == 0"
        type="danger"
        size="default"
        :disabled="articleIdList.length == 0"
        @click="updateIsDelete = true"
      >
        <el-icon ><Delete /></el-icon>
        <span>批量删除</span>
      </el-button>
      <el-button
        v-else
        type="danger"
        size="default"
        :disabled="articleIdList.length == 0"
        @click="remove = true"
      >
        <el-icon><Delete /></el-icon>
        <span>批量删除</span>
      </el-button>
      <el-button
        type="success"
        size="default"
        :disabled="articleIdList.length == 0"
        style="margin-right:1rem"
        @click="isExport = true"
      >
        <el-icon><Download /></el-icon>
        <span>批量导出</span>
      </el-button>
      <el-button
          type="primary"
          size="default"
          style="margin-right:1rem"
          @click="this.$refs.fileUploadDialog.show()"
        >
          <el-icon><Upload /></el-icon>
          <span>批量导入</span>
      </el-button>
      <!-- 条件筛选 -->
      <div style="margin-left:auto">
        <!-- 文章类型 -->
        <el-select
          clearable
          v-model="type"
          placeholder="请选择文章类型"
          size="default"
          style="margin-right:1rem;width: 150px;"
        >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- 分类 -->
        <el-select
          clearable
          size="default"
          v-model="categoryId"
          filterable
          placeholder="请选择分类"
          style="margin-right:1rem;width: 150px;"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.categoryName"
            :value="item.id"
          />
        </el-select>
        <!-- 标签 -->
        <el-select
          clearable
          size="default"
          v-model="tagId"
          filterable
          placeholder="请选择标签"
          style="margin-right:1rem;width: 150px;"
        >
          <el-option
            v-for="item in tagList"
            :key="item.id"
            :label="item.tagName"
            :value="item.id"
          />
        </el-select>
        <!-- 文章名 -->
        <el-input
          clearable
          v-model="keywords"
          size="default"
          placeholder="请输入文章名"
          style="width:180px"
          @keyup.enter.native="searchArticles"
        >
          <template #prefix>
              <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button
          type="primary"
          size="default"
          style="margin-left:1rem"
          @click="searchArticles"
        >
         <el-icon><Search /></el-icon>
         <span>搜索</span>
        </el-button>
      </div>
    </div>
    <!-- 表格展示 -->
    <el-table
      border
      :data="articleList"
      @selection-change="selectionChange"
      v-loading="loading"
    >
      <!-- 表格列 -->
      <el-table-column type="selection" width="35" />
      <!-- 文章封面 -->
      <el-table-column
        prop="articleCover"
        label="文章封面"
        width="180"
        align="center"
      >
        <template #default="scope">
          <el-image
            class="article-cover"
            :src="
              scope.row.articleCover
                ? scope.row.articleCover
                : 'https://static.talkxj.com/articles/c5cc2b2561bd0e3060a500198a4ad37d.png'
            "
          />
          <i
            v-if="scope.row.status == 1"
            class="iconfont el-icon-mygongkai article-status-icon"
          />
          <i
            v-if="scope.row.status == 2"
            class="iconfont el-icon-mymima article-status-icon"
          />
          <i
            v-if="scope.row.status == 3"
            class="iconfont el-icon-mycaogaoxiang article-status-icon"
          />
        </template>
      </el-table-column>
      <!-- 文章标题 -->
      <el-table-column prop="articleTitle" label="标题" align="center" />
      <!-- 文章分类 -->
      <el-table-column
        prop="categoryName"
        label="分类"
        width="110"
        align="center"
      />
      <!-- 文章标签 -->
      <el-table-column
        prop="tagDTOList"
        label="标签"
        width="170"
        align="center"
      >
        <template #default="scope">
          <el-tag
            v-for="item of scope.row.tagDTOList"
            :key="item.tagId"
            style="margin-right:0.2rem;margin-top:0.2rem"
          >
            {{ item.tagName }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 文章浏览量 -->
      <el-table-column
        prop="viewsCount"
        label="浏览量"
        width="70"
        align="center"
      >
        <template #default="scope">
          <span v-if="scope.row.viewsCount">
            {{ scope.row.viewsCount }}
          </span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <!-- 文章点赞量 -->
      <el-table-column
        prop="likeCount"
        label="点赞量"
        width="70"
        align="center"
      >
        <template #default="scope">
          <span v-if="scope.row.likeCount">
            {{ scope.row.likeCount }}
          </span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <!-- 文章类型 -->
      <el-table-column prop="type" label="类型" width="80" align="center">
        <template #default="scope">
          <el-tag :type="articleType(scope.row.type).tagType">
            {{ articleType(scope.row.type).name }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 文章发表时间 -->
      <el-table-column
        prop="createTime"
        label="发表时间"
        width="130"
        align="center"
      >
        <template #default="scope">
          <el-icon style="margin-right:5px"><Timer /></el-icon>
          {{ dataFormat(scope.row.createTime)}}
        </template>
      </el-table-column>
      <!-- 文章置顶 -->
      <el-table-column prop="isTop" label="置顶" width="80" align="center">
        <template #default="scope">
          <el-switch
            v-model="scope.row.isTop"
            active-color="#13ce66"
            inactive-color="#F4F4F5"
            :disabled="scope.row.isDelete == 1"
            :active-value="1"
            :inactive-value="0"
            @change="changeTop(scope.row)"
          />
        </template>
      </el-table-column>
      <!-- 列操作 -->
      <el-table-column label="操作" align="center" width="150">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="editArticle(scope.row.id)"
            v-if="scope.row.isDelete == 0"
          >
            编辑
          </el-button>
          <el-popconfirm
            title="确定删除吗？"
            style="margin-left:10px"
            @confirm="deleteArticles(scope.row.id)"
            v-if="scope.row.isDelete == 0"
          >
            <template #reference>
              <el-button size="small" type="danger" slot="reference">
                删除
              </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm
            title="确定恢复吗？"
            v-if="scope.row.isDelete == 1"
            @confirm="recoveryArticles(scope.row.id)"
          >
            <template #reference>
              <el-button size="small" type="success" slot="reference">
                恢复
              </el-button>
            </template>       
          </el-popconfirm>
          <el-popconfirm
            style="margin-left:10px"
            v-if="scope.row.isDelete == 1"
            title="确定彻底删除吗？"
            width="160px"
            @confirm="deleteOkArticles(scope.row.id)"
          >
            <template #reference>
              <el-button size="small" type="danger" slot="reference">
                删除
              </el-button>
            </template>   
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination-container"
      background
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="current"
      :page-size="size"
      :total="count"
      :page-sizes="[10, 20]"
      layout="total, sizes, prev, pager, next, jumper"
    />
    <!-- 批量逻辑删除对话框 -->
    <el-dialog v-model="updateIsDelete" width="30%">
      <template #header>
        <div class="dialog-title-container">
          <el-icon style="color:#ff9900"><Warning /></el-icon>
          提示
        </div>
      </template> 
      <div style="font-size:1rem">是否删除选中项？</div>
      <template #footer>
        <el-button @click="updateIsDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteArticles(null)">
          确 定
        </el-button>
      </template>
    </el-dialog>
    <!-- 批量彻底删除对话框 -->
    <el-dialog v-model="remove" width="30%">
      <template #header>
        <div class="dialog-title-container">
          <el-icon style="color:#ff9900"><Warning /></el-icon>
          提示
        </div>
      </template> 
      <div style="font-size:1rem">是否彻底删除选中项？</div>
      <template #footer>
        <el-button @click="remove = false">取 消</el-button>
        <el-button type="primary" @click="deleteOkArticles(null)">
          确 定
        </el-button>
      </template>
    </el-dialog>
    <!-- 批量导出对话框 -->
    <el-dialog v-model="isExport" width="30%">
      <template #header>
        <div class="dialog-title-container">
          <el-icon style="color:#ff9900"><Warning /></el-icon>
          提示
        </div>
      </template>
      <div style="font-size:1rem">是否导出选中文章？</div>
      <template #footer>
        <el-button @click="isExport = false">取 消</el-button>
        <el-button type="primary" @click="exportArticles(null)">
          确 定
        </el-button>
      </template> 
    </el-dialog>
    <FileUpload ref="fileUploadDialog" :fileType="fileType" @uploadSuccess="listArticles"/>
  </el-card>
</template>

<script>
import {praseDateStr} from "@/assets/js/common.js"
import FileUpload from '@/components/FileUpload.vue'
export default {
  components:{
    FileUpload
  },
  created() {
    this.listArticles();
    this.listCategories();
    this.listTags();
  },
  data: function() {
    return {
      fileType: ['.md'],
      loading: true,
      updateIsDelete: false,
      remove: false,
      typeList: [
        {
          value: 1,
          label: "原创"
        },
        {
          value: 2,
          label: "转载"
        },
        {
          value: 3,
          label: "翻译"
        }
      ],
      activeStatus: "all",
      articleList: [],
      articleIdList: [],
      categoryList: [],
      tagList: [],
      keywords: null,
      type: null,
      categoryId: null,
      tagId: null,
      isDelete: 0,
      isExport: false,
      status: null,
      current: 1,
      size: 10,
      count: 0,
      openUploadModel: false,
    }
  },
  methods: {
    selectionChange(articleList) {
      this.articleIdList = [];
      articleList.forEach(item => {
        this.articleIdList.push(item.id);
      });
    },
    searchArticles() {
      this.current = 1;
      this.listArticles();
    },
    editArticle(id) {
      this.$router.push({ path: "/articles/" + id});
    },
    deleteArticles(id) {
      let param = {}
      if (id != null) {
        param.idList = [id]
      } else {
        param.idList = this.articleIdList
      }
      this.axios.post("/api/article/deleteArticles", param).then(({ data }) => {
        if (data.flag) {
          this.$notify.success({
            title: "成功",
            message: data.message
          })
          this.listArticles();
        } else {
          this.$notify.error({
            title: "失败",
            message: data.message
          })
        }
        this.updateIsDelete = false
      });
    },
    recoveryArticles(id){
      let param = {}
      param.idList = [id]
      this.axios.post("/api/article/recoveryArticles", param).then(({ data }) => {
        if (data.flag) {
          this.$notify.success({
            title: "成功",
            message: data.message
          });
          this.listArticles()
        } else {
          this.$notify.error({
            title: "失败",
            message: data.message
          });
        }
      });
    },
    deleteOkArticles(id) {
      var param = {}
      if (id != null) {
        param.idList = [id]
      } else {
        param.idList = this.articleIdList
      }
      this.axios.post("/api/article/deleteOkArticles", param).then(({ data }) => {
        if (data.flag) {
          this.$notify.success({
            title: "成功",
            message: data.message
          })
          this.listArticles()
        } else {
          this.$notify.error({
            title: "失败",
            message: data.message
          })
        }
        this.remove = false
      });
    },
    exportArticles(id) {
      var param = {};
      if (id == null) {
        param = this.articleIdList
      } else {
        param = [id]
      }
      console.log(param)
      this.axios.post("/api/article/exportArticles", param).then(({ data }) => {
        if (data.flag) {
          this.$notify.success({
            title: "成功",
            message: data.message
          })
          data.data.forEach(item => {
            this.downloadFile(item);
          })
          this.listArticles();
        } else {
          this.$notify.error({
            title: "失败",
            message: data.message
          })
        }
        this.isExport = false
      });
    },
    downloadFile(url) {
      const iframe = document.createElement("iframe")
      iframe.style.display = "none"  // 防止影响页面
      iframe.style.height = 0  // 防止影响页面
      iframe.src = url
      document.body.appendChild(iframe)
      setTimeout(() => {
        iframe.remove()
      }, 5 * 60 * 1000)
    },
    uploadArticle(data) {
      if (data.flag) {
        this.$notify.success({
          title: "成功",
          message: "导入成功"
        })
        this.listArticles();
      } else {
        this.$notify.error({
          title: "失败",
          message: data.message
        })
      }
    },
    sizeChange(size) {
      this.size = size;
      this.listArticles()
    },
    currentChange(current) {
      this.current = current
      this.listArticles()
    },
    changeStatus(status) {
      switch (status) {
        case "all":
          this.isDelete = 0;
          this.status = null;
          break;
        case "public":
          this.isDelete = 0;
          this.status = 1;
          break;
        case "secret":
          this.isDelete = 0;
          this.status = 2;
          break;
        case "draft":
          this.isDelete = 0;
          this.status = 3;
          break;
        case "delete":
          this.isDelete = 1;
          this.status = null;
          break;
      }
      this.current = 1;
      this.activeStatus = status;
    },
    changeTop(article) {
      this.axios
        .post("/api/article/articleTopStatus", {
          id: article.id,
          isTop: article.isTop
        })
        .then(({ data }) => {
          if (data.flag) {
            this.$notify.success({
              title: "成功",
              message: data.message
            });
          } else {
            this.$notify.error({
              title: "失败",
              message: data.message
            });
          }
          this.remove = false;
        });
    },
    listArticles() {
      this.axios
        .get("/api/article/getBackArticleList", {
          params: {
            current: this.current,
            size: this.size,
            keywords: this.keywords,
            categoryId: this.categoryId,
            status: this.status,
            tagId: this.tagId,
            type: this.type,
            isDelete: this.isDelete
          }
        })
        .then(({ data }) => {
          this.articleList = data.data.recordList;
          this.count = data.data.count;
          this.loading = false;
        });
    },
    listCategories() {
      this.axios.get("/api/category/getCategory").then(({ data }) => {
        this.categoryList = data.data;
      });
    },
    listTags() {
      this.axios.get("/api/tag/getTag").then(({ data }) => {
        this.tagList = data.data;
      });
    }
  },
  watch: {
    type() {
      this.current = 1;
      this.listArticles();
    },
    categoryId() {
      this.current = 1;
      this.listArticles();
    },
    tagId() {
      this.current = 1;
      this.listArticles();
    },
    status() {
      this.current = 1;
      this.listArticles();
    },
    isDelete() {
      this.current = 1;
      this.listArticles();
    }
  },
  computed: {
    articleType() {
      return function(type) {
        var tagType = "";
        var name = "";
        switch (type) {
          case 1:
            tagType = "danger";
            name = "原创";
            break;
          case 2:
            tagType = "success";
            name = "转载";
            break;
          case 3:
            tagType = "primary";
            name = "翻译";
            break;
        }
        return {
          tagType: tagType,
          name: name
        };
      };
    },
    isActive() {
      return function(status) {
        return this.activeStatus == status ? "active-status" : "status";
      };
    },
    dataFormat(){
      return function(date){
        return praseDateStr(date,"YYYY-MM-DD")
      }
    }
  }
};
</script>

<style scoped>
.operation-container {
  margin-top: 1.5rem;
}
.article-status-menu {
  font-size: 14px;
  margin-top: 40px;
  color: #999;
}
.article-status-menu span {
  margin-right: 24px;
}
.status {
  cursor: pointer;
}
.active-status {
  cursor: pointer;
  color: #333;
  font-weight: bold;
}
.article-cover {
  position: relative;
  width: 100%;
  height: 90px;
  border-radius: 4px;
}
.article-cover::after {
  content: "";
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.article-status-icon {
  color: #fff;
  font-size: 1.5rem;
  position: absolute;
  right: 1rem;
  bottom: 1.4rem;
}
</style>
