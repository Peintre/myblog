import{i as K}from"./image-conversion.2d06665b.js";import{ag as a,aj as Z,o as p,Q as f,R as t,a as i,W as c,X as o,c as _,U as D,S as P,a6 as N,F as S,V as d,Y as z,b7 as x,b6 as ee}from"./@vue.9e9a2d45.js";import{_ as oe}from"./index.ae6b5db7.js";import"./@babel.1ce85722.js";import"./axios.cdba3bd7.js";import"./form-data.d1f94bc2.js";import"./vue-router.b11bef48.js";import"./vuex.029ab250.js";import"./vuex-persistedstate.fa252374.js";import"./nprogress.8c2c2e00.js";import"./vue-axios.516efde1.js";import"./element-plus.e856da41.js";import"./lodash-es.1d9717e1.js";import"./@vueuse.15af719d.js";import"./@element-plus.b2728cca.js";import"./@popperjs.36402333.js";import"./@ctrl.82a509e0.js";import"./dayjs.68f6f475.js";import"./async-validator.fb49d0f5.js";import"./memoize-one.4ee5c96d.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./@floating-ui.f14f28ca.js";import"./@kangc.b9a0ef8b.js";import"./vue.a84c3055.js";import"./markdown-it-emoji.952032df.js";import"./@vuepress.3e7afe62.js";import"./markdown-it-container.512a5043.js";import"./highlight.js.6e93349b.js";import"./codemirror.59d98cc1.js";const te={created(){this.getAlbumInfo(),this.listPhotos()},data:function(){return{loading:!0,checkAll:!1,isIndeterminate:!1,uploadPhoto:!1,editPhoto:!1,movePhoto:!1,batchDeletePhoto:!1,uploadList:[],photoList:[],photoIdList:[],selectPhotoIdList:[],albumList:[],albumInfo:{id:null,albumName:"",albumDesc:"",albumCover:"",photoCount:0},photoForm:{id:null,photoName:"",photoDesc:""},albumId:null,current:1,size:18,count:0}},methods:{movePhotos(){this.listAlbums()},getAlbumInfo(){this.axios.get("/api/photoAlbum/getAlbumById/"+this.$route.params.albumId).then(({data:e})=>{this.albumInfo=e.data})},listAlbums(){this.axios.get("/api/photoAlbum/getAlbumsAny").then(({data:e})=>{this.albumList=e.data,this.movePhoto=!0})},listPhotos(){this.axios.get("/api/photo/getPhotos",{params:{current:this.current,size:this.size,albumId:this.$route.params.albumId,isDelete:0}}).then(({data:e})=>{this.photoList=e.data.recordList,this.count=e.data.count,this.loading=!1})},sizeChange(e){this.size=e,this.listPhotos()},currentChange(e){this.current=e,this.listPhotos()},savePhotos(){var e=[];this.uploadList.forEach(l=>{e.push(l.url)}),this.axios.post("/api/photo/addPhotosToAlbum",{albumId:this.$route.params.albumId,photoUrlList:e}).then(({data:l})=>{l.flag?(this.$notify.success({title:"\u6210\u529F",message:l.message}),this.uploadList=[],this.listPhotos()):this.$notify.error({title:"\u5931\u8D25",message:l.message})}),this.uploadPhoto=!1},updatePhoto(){if(this.photoForm.photoName.trim()=="")return this.$message.error("\u7167\u7247\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),!1;this.axios.post("/api/photo/updatePhoto",this.photoForm).then(({data:e})=>{e.flag?(this.$notify.success({title:"\u6210\u529F",message:e.message}),this.listPhotos()):this.$notify.error({title:"\u5931\u8D25",message:e.message}),this.editPhoto=!1})},updatePhotoAlbum(){this.axios.post("/api/photo/movePhotos",{albumId:this.albumId,photoIdList:this.selectPhotoIdList}).then(({data:e})=>{e.flag?(this.$notify.success({title:"\u6210\u529F",message:e.message}),this.selectPhotoIdList=[],this.listPhotos()):this.$notify.error({title:"\u5931\u8D25",message:e.message}),this.movePhoto=!1})},handleRemove(e){this.uploadList.forEach((l,h)=>{l.url==e.url&&this.uploadList.splice(h,1)})},upload(e){this.uploadList.push({url:e.data})},beforeUpload(e){return["image/jpeg","image/png"].includes(e.type)?new Promise((b,U)=>{e.size/1024<200&&b(e),K.compressAccurately(e,200).then(n=>{b(n)})}):(this.$message.error("\u56FE\u7247\u683C\u5F0F\u53EA\u80FD\u662F JPG/PNG/GIF!"),!1)},handleCheckAllChange(e){this.selectPhotoIdList=e?this.photoIdList:[],this.isIndeterminate=!1},handleCheckedPhotoChange(e){let l=e.length;this.checkAll=l===this.photoIdList.length,this.isIndeterminate=l>0&&l<this.photoIdList.length},handleCommand(e){const l=e.substring(0,4),h=e.substring(4);l==="edit"?(this.photoForm=JSON.parse(h),this.editPhoto=!0):l==="move"?(this.selectPhotoIdList=[JSON.parse(h).id],this.listAlbums()):this.updatePhotoDelete(JSON.parse(h).id)},updatePhotoDelete(e){var l={};e==null?l.idList=this.selectPhotoIdList:l.idList=[e],this.axios.post("/api/photo/deletePhotos",l).then(({data:h})=>{h.flag?(this.$notify.success({title:"\u6210\u529F",message:h.message}),this.selectPhotoIdList=[],this.listPhotos()):this.$notify.error({title:"\u5931\u8D25",message:h.message})}),this.batchDeletePhoto=!1}},watch:{photoList(){this.photoIdList=[],this.photoList.forEach(e=>{this.photoIdList.push(e.id)})}}},r=e=>(x("data-v-f50321ee"),e=e(),ee(),e),le={class:"title"},se={class:"album-info"},ie={class:"album-detail"},ae={style:{"margin-bottom":"0.6rem"}},ne={class:"album-name"},de={class:"photo-count"},he={key:0,class:"album-desc"},ue=r(()=>i("span",null,"\u4E0A\u4F20\u7167\u7247",-1)),re={class:"operation"},pe={class:"all-check"},me=r(()=>i("span",null,"\u5168\u9009",-1)),ce={class:"check-count"},fe=r(()=>i("span",null,"\u6279\u91CF\u79FB\u52A8",-1)),_e=r(()=>i("span",null,"\u6279\u91CF\u5220\u9664",-1)),ge={class:"photo-list"},be={class:"photo-item"},ve={class:"photo-opreation"},Pe={class:"photo-name"},ye=r(()=>i("div",{class:"dialog-title-container"}," \u4E0A\u4F20\u7167\u7247 ",-1)),Le={class:"upload-container"},Ce={class:"upload"},Ie=r(()=>i("div",{class:"el-upload__text"},[d(" \u5C06\u6587\u4EF6\u62D6\u5230\u6B64\u5904\uFF0C\u6216"),i("em",null,"\u70B9\u51FB\u4E0A\u4F20")],-1)),ke=r(()=>i("div",{class:"el-upload__tip"}," \u652F\u6301\u4E0A\u4F20jpg/png\u6587\u4EF6 ",-1)),Ve={class:"upload-footer"},we={class:"upload-count"},Ae={style:{"margin-left":"auto"}},De=r(()=>i("div",{class:"dialog-title-container"}," \u4FEE\u6539\u4FE1\u606F ",-1)),Ne=r(()=>i("div",{class:"dialog-title-container"},[i("i",{class:"el-icon-warning",style:{color:"#ff9900"}}),d("\u63D0\u793A ")],-1)),Se=r(()=>i("div",{style:{"font-size":"1rem"}},"\u662F\u5426\u5220\u9664\u9009\u4E2D\u7167\u7247\uFF1F",-1)),ze=r(()=>i("div",{class:"dialog-title-container"}," \u79FB\u52A8\u7167\u7247 ",-1)),Ue={key:1,class:"show-albumList"},Fe={class:"albumList-item"};function $e(e,l,h,b,U,n){const y=a("el-image"),F=a("PictureFilled"),m=a("el-icon"),u=a("el-button"),L=a("el-checkbox"),C=a("Switch"),I=a("Delete"),k=a("el-empty"),$=a("More"),J=a("Edit"),v=a("el-dropdown-item"),E=a("el-dropdown-menu"),O=a("el-dropdown"),B=a("el-col"),j=a("el-row"),T=a("el-checkbox-group"),G=a("el-pagination"),R=a("Plus"),V=a("el-upload"),M=a("UploadFilled"),g=a("el-dialog"),w=a("el-input"),A=a("el-form-item"),Q=a("el-form"),W=a("el-radio-button"),X=a("el-radio-group"),Y=a("el-scrollbar"),q=a("el-card"),H=Z("loading");return p(),f(q,{class:"main-card my-photo-card"},{default:t(()=>[i("div",le,c(this.$route.name),1),i("div",se,[o(y,{fit:"cover",class:"album-cover",src:e.albumInfo.albumCover},null,8,["src"]),i("div",ie,[i("div",ae,[i("span",ne,c(e.albumInfo.albumName),1),i("span",de,c(e.count)+"\u5F20",1)]),i("div",null,[e.albumInfo.albumDesc?(p(),_("span",he,c(e.albumInfo.albumDesc),1)):D("",!0),o(u,{type:"primary",size:"default",onClick:l[0]||(l[0]=s=>e.uploadPhoto=!0)},{default:t(()=>[o(m,null,{default:t(()=>[o(F)]),_:1}),ue]),_:1})])]),i("div",re,[i("div",pe,[o(L,{indeterminate:e.isIndeterminate,modelValue:e.checkAll,"onUpdate:modelValue":l[1]||(l[1]=s=>e.checkAll=s),onChange:n.handleCheckAllChange},{default:t(()=>[me]),_:1},8,["indeterminate","modelValue","onChange"]),i("div",ce,"\u5DF2\u9009\u62E9"+c(e.selectPhotoIdList.length)+"\u5F20",1)]),o(u,{type:"success",onClick:n.movePhotos,disabled:e.selectPhotoIdList.length==0,size:"default"},{default:t(()=>[o(m,null,{default:t(()=>[o(C)]),_:1}),fe]),_:1},8,["onClick","disabled"]),o(u,{type:"danger",onClick:l[2]||(l[2]=s=>e.batchDeletePhoto=!0),disabled:e.selectPhotoIdList.length==0,size:"default"},{default:t(()=>[o(m,null,{default:t(()=>[o(I)]),_:1}),_e]),_:1},8,["disabled"])])]),i("div",ge,[e.photoList.length==0?(p(),f(k,{key:0,description:"\u6682\u65E0\u76F8\u7247"})):D("",!0),o(T,{modelValue:e.selectPhotoIdList,"onUpdate:modelValue":l[3]||(l[3]=s=>e.selectPhotoIdList=s),onChange:n.handleCheckedPhotoChange},{default:t(()=>[P((p(),f(j,{class:"photo-container",gutter:20},{default:t(()=>[(p(!0),_(S,null,N(e.photoList,s=>(p(),f(B,{class:"photo-container-col",md:4,key:s.id},{default:t(()=>[o(L,{label:s.id},{default:t(()=>[i("div",be,[i("div",ve,[o(O,{onCommand:n.handleCommand},{dropdown:t(()=>[o(E,null,{default:t(()=>[o(v,{command:"edit"+JSON.stringify(s)},{default:t(()=>[o(m,null,{default:t(()=>[o(J)]),_:1}),d("\u7F16\u8F91 ")]),_:2},1032,["command"]),o(v,{command:"dele"+JSON.stringify(s)},{default:t(()=>[o(m,null,{default:t(()=>[o(I)]),_:1}),d("\u5220\u9664 ")]),_:2},1032,["command"]),o(v,{command:"move"+JSON.stringify(s)},{default:t(()=>[o(m,null,{default:t(()=>[o(C)]),_:1}),d("\u79FB\u52A8 ")]),_:2},1032,["command"])]),_:2},1024)]),default:t(()=>[o(m,{style:{color:"#fff"}},{default:t(()=>[o($)]),_:1})]),_:2},1032,["onCommand"])]),o(y,{fit:"cover",class:"photo-img",src:s.photoSrc,"preview-photoSrc-list":e.photoList},null,8,["src","preview-photoSrc-list"]),i("div",Pe,c(s.photoName),1)])]),_:2},1032,["label"])]),_:2},1024))),128))]),_:1})),[[H,e.loading]])]),_:1},8,["modelValue","onChange"])]),o(G,{class:"pagination-container",onSizeChange:n.sizeChange,onCurrentChange:n.currentChange,"current-page":e.current,"page-size":e.size,total:e.count,layout:"prev, pager, next","hide-on-single-page":!0},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"]),o(g,{modelValue:e.uploadPhoto,"onUpdate:modelValue":l[5]||(l[5]=s=>e.uploadPhoto=s),width:"70%",top:"10vh"},{header:t(()=>[ye]),footer:t(()=>[i("div",Ve,[i("div",we,"\u5171\u4E0A\u4F20"+c(e.uploadList.length)+"\u5F20\u7167\u7247",1),i("div",Ae,[o(u,{onClick:l[4]||(l[4]=s=>e.uploadPhoto=!1)},{default:t(()=>[d("\u53D6 \u6D88")]),_:1}),o(u,{onClick:n.savePhotos,type:"primary",disabled:e.uploadList.length==0},{default:t(()=>[d(" \u5F00\u59CB\u4E0A\u4F20 ")]),_:1},8,["onClick","disabled"])])])]),default:t(()=>[i("div",Le,[P(o(V,{action:"/api/photo/uploadPhoto","list-type":"picture-card","file-list":e.uploadList,multiple:"","before-upload":n.beforeUpload,"on-success":n.upload,"on-remove":n.handleRemove},{default:t(()=>[o(m,null,{default:t(()=>[o(R)]),_:1})]),_:1},8,["file-list","before-upload","on-success","on-remove"]),[[z,e.uploadList.length>0]]),i("div",Ce,[P(o(V,{drag:"",multiple:"",action:"/api/photo/uploadPhoto","before-upload":n.beforeUpload,"on-success":n.upload,"show-file-list":!1},{tip:t(()=>[ke]),default:t(()=>[o(m,null,{default:t(()=>[o(M)]),_:1}),Ie]),_:1},8,["before-upload","on-success"]),[[z,e.uploadList.length==0]])])])]),_:1},8,["modelValue"]),o(g,{modelValue:e.editPhoto,"onUpdate:modelValue":l[9]||(l[9]=s=>e.editPhoto=s),width:"30%"},{header:t(()=>[De]),footer:t(()=>[o(u,{onClick:l[8]||(l[8]=s=>e.editPhoto=!1)},{default:t(()=>[d("\u53D6 \u6D88")]),_:1}),o(u,{type:"primary",onClick:n.updatePhoto},{default:t(()=>[d(" \u786E \u5B9A ")]),_:1},8,["onClick"])]),default:t(()=>[o(Q,{"label-width":"80px",size:"default",model:e.photoForm},{default:t(()=>[o(A,{label:"\u7167\u7247\u540D\u79F0"},{default:t(()=>[o(w,{style:{width:"220px"},modelValue:e.photoForm.photoName,"onUpdate:modelValue":l[6]||(l[6]=s=>e.photoForm.photoName=s)},null,8,["modelValue"])]),_:1}),o(A,{label:"\u7167\u7247\u63CF\u8FF0"},{default:t(()=>[o(w,{style:{width:"220px"},modelValue:e.photoForm.photoDesc,"onUpdate:modelValue":l[7]||(l[7]=s=>e.photoForm.photoDesc=s)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue"]),o(g,{modelValue:e.batchDeletePhoto,"onUpdate:modelValue":l[12]||(l[12]=s=>e.batchDeletePhoto=s),width:"30%"},{header:t(()=>[Ne]),footer:t(()=>[o(u,{onClick:l[10]||(l[10]=s=>e.batchDeletePhoto=!1)},{default:t(()=>[d("\u53D6 \u6D88")]),_:1}),o(u,{type:"primary",onClick:l[11]||(l[11]=s=>n.updatePhotoDelete(null))},{default:t(()=>[d(" \u786E \u5B9A ")]),_:1})]),default:t(()=>[Se]),_:1},8,["modelValue"]),o(g,{modelValue:e.movePhoto,"onUpdate:modelValue":l[15]||(l[15]=s=>e.movePhoto=s),width:"30%"},{header:t(()=>[ze]),footer:t(()=>[o(u,{onClick:l[14]||(l[14]=s=>e.movePhoto=!1)},{default:t(()=>[d("\u53D6 \u6D88")]),_:1}),o(u,{disabled:e.albumId==null,type:"primary",onClick:n.updatePhotoAlbum},{default:t(()=>[d(" \u786E \u5B9A ")]),_:1},8,["disabled","onClick"])]),default:t(()=>[e.albumList.length<2?(p(),f(k,{key:0,description:"\u6682\u65E0\u5176\u4ED6\u76F8\u518C"})):(p(),_("div",Ue,[o(Y,{"max-height":"250px"},{default:t(()=>[o(X,{modelValue:e.albumId,"onUpdate:modelValue":l[13]||(l[13]=s=>e.albumId=s),style:{display:"block"}},{default:t(()=>[(p(!0),_(S,null,N(e.albumList,s=>(p(),_("div",Fe,[o(W,{label:s.id},{default:t(()=>[d(c(s.photoAlbumName),1)]),_:2},1032,["label"])]))),256))]),_:1},8,["modelValue"])]),_:1})]))]),_:1},8,["modelValue"])]),_:1})}var mo=oe(te,[["render",$e],["__scopeId","data-v-f50321ee"]]);export{mo as default};
