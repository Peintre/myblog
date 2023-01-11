import{i as K}from"./image-conversion.2d06665b.js";import{ag as o,aj as W,o as m,Q as h,R as l,a as i,W as f,X as t,a7 as Q,U as V,S as R,c as b,a6 as X,F as q,V as u,b7 as H,b6 as Y}from"./@vue.9e9a2d45.js";import{_ as Z}from"./index.ae6b5db7.js";import"./@babel.1ce85722.js";import"./axios.cdba3bd7.js";import"./form-data.d1f94bc2.js";import"./vue-router.b11bef48.js";import"./vuex.029ab250.js";import"./vuex-persistedstate.fa252374.js";import"./nprogress.8c2c2e00.js";import"./vue-axios.516efde1.js";import"./element-plus.e856da41.js";import"./lodash-es.1d9717e1.js";import"./@vueuse.15af719d.js";import"./@element-plus.b2728cca.js";import"./@popperjs.36402333.js";import"./@ctrl.82a509e0.js";import"./dayjs.68f6f475.js";import"./async-validator.fb49d0f5.js";import"./memoize-one.4ee5c96d.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./@floating-ui.f14f28ca.js";import"./@kangc.b9a0ef8b.js";import"./vue.a84c3055.js";import"./markdown-it-emoji.952032df.js";import"./@vuepress.3e7afe62.js";import"./markdown-it-container.512a5043.js";import"./highlight.js.6e93349b.js";import"./codemirror.59d98cc1.js";const x={created(){this.listAlbums()},data:function(){return{albumTitle:"",keywords:"",loading:!0,isdelete:!1,addOrEdit:!1,albumForum:{id:null,albumName:"",albumDesc:"",albumCover:"",status:1},albumList:[],current:1,size:8,count:0}},methods:{openModel(e){e?(this.albumForum=JSON.parse(e),this.albumTitle="\u4FEE\u6539\u76F8\u518C"):(this.albumForum={id:null,albumName:"",albumLabel:"",albumCover:"",status:1},this.albumTitle="\u65B0\u5EFA\u76F8\u518C"),this.addOrEdit=!0},checkPhoto(e){this.$router.push({path:"/albums/"+e.id})},checkDelete(){this.$router.push({path:"/photos/delete"})},listAlbums(){this.axios.get("/api/photoAlbum/getAlbums",{params:{current:this.current,size:this.size,keywords:this.keywords}}).then(({data:e})=>{this.albumList=e.data.recordList,this.count=e.data.count,this.loading=!1})},addOrEditAlbum(){if(this.albumForum.albumName.trim()=="")return this.$message.error("\u76F8\u518C\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),!1;if(this.albumForum.albumDesc.trim()=="")return this.$message.error("\u76F8\u518C\u63CF\u8FF0\u4E0D\u80FD\u4E3A\u7A7A"),!1;if(this.albumForum.albumCover==null)return this.$message.error("\u76F8\u518C\u5C01\u9762\u4E0D\u80FD\u4E3A\u7A7A"),!1;this.albumForum.id==null?this.axios.post("/api/photoAlbum/addAlbum",this.albumForum).then(({data:e})=>{e.flag?(this.$notify.success({title:"\u6210\u529F",message:e.message}),this.listAlbums()):this.$notify.error({title:"\u5931\u8D25",message:e.message})}):this.axios.post("/api/photoAlbum/updateAlbum",this.albumForum).then(({data:e})=>{e.flag?(this.$notify.success({title:"\u6210\u529F",message:e.message}),this.listAlbums()):this.$notify.error({title:"\u5931\u8D25",message:e.message})}),this.addOrEdit=!1},uploadCover(e){this.albumForum.albumCover=e.data},beforeUpload(e){return["image/jpeg","image/png","image/gif"].includes(e.type)?new Promise((g,F)=>{e.size/1024<200&&g(e),K.compressAccurately(e,200).then(n=>{g(n)})}):(this.$message.error("\u56FE\u7247\u683C\u5F0F\u53EA\u80FD\u662F JPG/PNG/GIF!"),!1)},handleCommand(e){const a=e.substring(0,6),c=e.substring(6);a=="delete"?(this.albumForum.id=c,this.isdelete=!0):this.openModel(c)},deleteAlbum(){this.axios.delete("/api/photoAlbum/deleteAlbum/"+this.albumForum.id).then(({data:e})=>{e.flag?(this.$notify.success({title:"\u6210\u529F",message:e.message}),this.listAlbums()):this.$notify.error({title:"\u5931\u8D25",message:e.message}),this.isdelete=!1})},searchAlbums(){this.current=1,this.listAlbums()},sizeChange(e){this.size=e,this.listAlbums()},currentChange(e){this.current=e,this.listAlbums()}}},p=e=>(H("data-v-6c73484a"),e=e(),Y(),e),ee={class:"title"},te={class:"operation-container"},le=p(()=>i("span",null,"\u65B0\u5EFA\u76F8\u518C",-1)),oe={style:{"margin-left":"auto"}},se=p(()=>i("span",null,"\u56DE\u6536\u7AD9",-1)),ae=p(()=>i("span",null,"\u641C\u7D22",-1)),ie=["onClick"],ne={class:"album-opreation"},ue={class:"album-photo-count"},re={key:0,class:"iconfont el-icon-mymima"},me={class:"album-name"},de={class:"dialog-title-container"},pe={key:0,class:"upload-empty"},ce=p(()=>i("div",{class:"el-upload__text"},[u(" \u5C06\u6587\u4EF6\u62D6\u5230\u6B64\u5904\uFF0C\u6216"),i("em",null,"\u70B9\u51FB\u4E0A\u4F20")],-1)),_e=["src"],he={class:"dialog-title-container"},fe=p(()=>i("div",{style:{"font-size":"1rem"}},"\u662F\u5426\u5220\u9664\u8BE5\u76F8\u518C\uFF1F",-1));function be(e,a,c,g,F,n){const z=o("Plus"),r=o("el-icon"),d=o("el-button"),v=o("Delete"),C=o("Search"),y=o("el-input"),N=o("el-empty"),D=o("More"),E=o("Edit"),k=o("el-dropdown-item"),S=o("el-dropdown-menu"),O=o("el-dropdown"),L=o("el-image"),U=o("el-col"),$=o("el-row"),P=o("el-pagination"),_=o("el-form-item"),T=o("upload-filled"),I=o("el-upload"),A=o("el-radio"),M=o("el-radio-group"),B=o("el-form"),w=o("el-dialog"),j=o("Warning"),G=o("el-card"),J=W("loading");return m(),h(G,{class:"main-card my-album-card"},{default:l(()=>[i("div",ee,f(this.$route.name),1),i("div",te,[t(d,{type:"primary",size:"default",onClick:a[0]||(a[0]=s=>n.openModel(null))},{default:l(()=>[t(r,null,{default:l(()=>[t(z)]),_:1}),le]),_:1}),i("div",oe,[t(d,{link:"",type:"primary",size:"small",style:{"margin-right":"1rem"},onClick:n.checkDelete},{default:l(()=>[t(r,null,{default:l(()=>[t(v)]),_:1}),se]),_:1},8,["onClick"]),t(y,{modelValue:e.keywords,"onUpdate:modelValue":a[1]||(a[1]=s=>e.keywords=s),size:"default",placeholder:"\u8BF7\u8F93\u5165\u76F8\u518C\u540D",style:{width:"200px"},onKeyup:Q(n.searchAlbums,["enter","native"])},{prefix:l(()=>[t(r,null,{default:l(()=>[t(C)]),_:1})]),_:1},8,["modelValue","onKeyup"]),t(d,{type:"primary",size:"default",style:{"margin-left":"1rem"},onClick:n.searchAlbums},{default:l(()=>[t(r,null,{default:l(()=>[t(C)]),_:1}),ae]),_:1},8,["onClick"])])]),e.albumList==null?(m(),h(N,{key:0,description:"\u6682\u65E0\u76F8\u518C"})):V("",!0),R((m(),h($,{class:"album-container",gutter:12},{default:l(()=>[(m(!0),b(q,null,X(e.albumList,s=>(m(),h(U,{key:s.id,md:6},{default:l(()=>[i("div",{class:"album-item",onClick:ge=>n.checkPhoto(s)},[i("div",ne,[t(O,{onCommand:n.handleCommand},{dropdown:l(()=>[t(S,null,{default:l(()=>[t(k,{command:"update"+JSON.stringify(s)},{default:l(()=>[t(r,null,{default:l(()=>[t(E)]),_:1}),u("\u7F16\u8F91 ")]),_:2},1032,["command"]),t(k,{command:"delete"+s.id},{default:l(()=>[t(r,null,{default:l(()=>[t(v)]),_:1}),u("\u5220\u9664 ")]),_:2},1032,["command"])]),_:2},1024)]),default:l(()=>[t(r,{style:{color:"#fff"}},{default:l(()=>[t(D)]),_:1})]),_:2},1032,["onCommand"])]),i("div",ue,[i("div",null,f(s.photoCount),1),s.status==2?(m(),b("i",re)):V("",!0)]),t(L,{fit:"cover",class:"album-cover",src:s.albumCover},null,8,["src"]),i("div",me,f(s.albumName),1)],8,ie)]),_:2},1024))),128))]),_:1})),[[J,e.loading]]),t(P,{"hide-on-single-page":!0,class:"pagination-container",onSizeChange:n.sizeChange,onCurrentChange:n.currentChange,"current-page":e.current,"page-size":e.size,total:e.count,layout:"prev, pager, next"},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"]),t(w,{modelValue:e.addOrEdit,"onUpdate:modelValue":a[6]||(a[6]=s=>e.addOrEdit=s),width:"35%",top:"10vh"},{header:l(()=>[i("div",de,f(e.albumTitle),1)]),footer:l(()=>[t(d,{onClick:a[5]||(a[5]=s=>e.addOrEdit=!1)},{default:l(()=>[u("\u53D6 \u6D88")]),_:1}),t(d,{type:"primary",onClick:n.addOrEditAlbum},{default:l(()=>[u(" \u786E \u5B9A ")]),_:1},8,["onClick"])]),default:l(()=>[t(B,{"label-width":"80px",size:"default",model:e.albumForum},{default:l(()=>[t(_,{label:"\u76F8\u518C\u540D\u79F0"},{default:l(()=>[t(y,{style:{width:"220px"},modelValue:e.albumForum.albumName,"onUpdate:modelValue":a[2]||(a[2]=s=>e.albumForum.albumName=s)},null,8,["modelValue"])]),_:1}),t(_,{label:"\u76F8\u518C\u63CF\u8FF0"},{default:l(()=>[t(y,{style:{width:"220px"},modelValue:e.albumForum.albumDesc,"onUpdate:modelValue":a[3]||(a[3]=s=>e.albumForum.albumDesc=s)},null,8,["modelValue"])]),_:1}),t(_,{label:"\u76F8\u518C\u5C01\u9762"},{default:l(()=>[t(I,{class:"upload-cover",drag:"","show-file-list":!1,"before-upload":n.beforeUpload,action:"/api/photoAlbum/uploadAlbumCover","on-success":n.uploadCover},{default:l(()=>[e.albumForum.albumCover==""?(m(),b("div",pe,[t(r,null,{default:l(()=>[t(T)]),_:1}),ce])):(m(),b("img",{key:1,src:e.albumForum.albumCover,style:{width:"360px",height:"180px"}},null,8,_e))]),_:1},8,["before-upload","on-success"])]),_:1}),t(_,{label:"\u53D1\u5E03\u5F62\u5F0F"},{default:l(()=>[t(M,{modelValue:e.albumForum.status,"onUpdate:modelValue":a[4]||(a[4]=s=>e.albumForum.status=s)},{default:l(()=>[t(A,{label:1},{default:l(()=>[u("\u516C\u5F00")]),_:1}),t(A,{label:2},{default:l(()=>[u("\u79C1\u5BC6")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue"]),t(w,{modelValue:e.isdelete,"onUpdate:modelValue":a[8]||(a[8]=s=>e.isdelete=s),width:"30%"},{header:l(()=>[i("div",he,[t(r,{style:{color:"#ff9900"}},{default:l(()=>[t(j)]),_:1}),u("\u63D0\u793A ")])]),footer:l(()=>[t(d,{onClick:a[7]||(a[7]=s=>e.isdelete=!1)},{default:l(()=>[u("\u53D6 \u6D88")]),_:1}),t(d,{type:"primary",onClick:n.deleteAlbum},{default:l(()=>[u(" \u786E \u5B9A ")]),_:1},8,["onClick"])]),default:l(()=>[fe]),_:1},8,["modelValue"])]),_:1})}var qe=Z(x,[["render",be],["__scopeId","data-v-6c73484a"]]);export{qe as default};