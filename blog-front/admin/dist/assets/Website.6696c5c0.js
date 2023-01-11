import{i as Q}from"./image-conversion.2d06665b.js";import{ag as r,o as d,Q as f,R as o,X as e,c as C,V as s,S as A,Y as R}from"./@vue.9e9a2d45.js";import{_ as T}from"./index.ae6b5db7.js";import"./@babel.1ce85722.js";import"./axios.cdba3bd7.js";import"./form-data.d1f94bc2.js";import"./vue-router.b11bef48.js";import"./vuex.029ab250.js";import"./vuex-persistedstate.fa252374.js";import"./nprogress.8c2c2e00.js";import"./vue-axios.516efde1.js";import"./element-plus.e856da41.js";import"./lodash-es.1d9717e1.js";import"./@vueuse.15af719d.js";import"./@element-plus.b2728cca.js";import"./@popperjs.36402333.js";import"./@ctrl.82a509e0.js";import"./dayjs.68f6f475.js";import"./async-validator.fb49d0f5.js";import"./memoize-one.4ee5c96d.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./@floating-ui.f14f28ca.js";import"./@kangc.b9a0ef8b.js";import"./vue.a84c3055.js";import"./markdown-it-emoji.952032df.js";import"./@vuepress.3e7afe62.js";import"./markdown-it-container.512a5043.js";import"./highlight.js.6e93349b.js";import"./codemirror.59d98cc1.js";const q={created(){this.getWebsiteConfig()},data:function(){return{websiteConfigForm:{websiteAvatar:"",websiteName:"",websiteAuthor:"",websiteIntro:"",websiteNotice:"",websiteCreateTime:null,websiteRecordNo:"",socialLoginList:[],socialUrlList:[],qq:"",github:"",gitee:"",userAvatar:"",touristAvatar:"",isReward:1,weiXinQRCode:"",alipayQRCode:"",articleCover:"",isChatRoom:1,websocketUrl:"",isMusicPlayer:1,isEmailNotice:1,isCommentReview:0,isMessageReview:0},activeName:"info"}},methods:{getWebsiteConfig(){this.axios.get("/api/websiteConfig/getConfig").then(({data:l})=>{this.websiteConfigForm=l.data})},beforeAvatarUpload(l){return["image/jpeg","image/png","image/gif"].includes(l.type)?l.size/1024/1024>2?(this.$message.warning("\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC72M"),!1):!0:(this.$message.error("\u56FE\u7247\u683C\u5F0F\u53EA\u80FD\u662F JPG/PNG/GIF!"),!1)},beforeUpload(l){return["image/jpeg","image/png","image/gif"].includes(l.type)?new Promise((F,N)=>{l.size/1024<200&&F(l),Q.compressAccurately(l,200).then(n=>{F(n)})}):(this.$message.error("\u56FE\u7247\u683C\u5F0F\u53EA\u80FD\u662F JPG/PNG/GIF!"),!1)},handleClick(l){console.log(l)},handleWebsiteAvatarSuccess(l){this.$message.success("\u56FE\u7247\u4E0A\u4F20\u6210\u529F"),this.websiteConfigForm.websiteAvatar=l.data},handleUserAvatarSuccess(l){this.websiteConfigForm.userAvatar=l.data},handleArticleCoverSuccess(l){this.websiteConfigForm.articleCover=l.data},handleTouristAvatarSuccess(l){this.websiteConfigForm.touristAvatar=l.data},handleWeiXinSuccess(l){this.websiteConfigForm.weiXinQRCode=l.data},handleAlipaySuccess(l){this.websiteConfigForm.alipayQRCode=l.data},updateWebsiteConfig(){this.axios.post("/api/websiteConfig/updateWebsiteConfig",this.websiteConfigForm).then(({data:l})=>{l.flag?this.$notify.success({title:"\u6210\u529F",message:l.message}):this.$notify.error({title:"\u5931\u8D25",message:l.message})})}}},P=["src"],M=["src"],G=["src"],X=["src"],z=["src"],I=["src"];function Y(l,a,h,F,N,n){const b=r("Plus"),p=r("el-icon"),g=r("el-upload"),i=r("el-form-item"),u=r("el-input"),S=r("el-date-picker"),c=r("el-checkbox"),k=r("el-checkbox-group"),V=r("el-button"),v=r("el-form"),y=r("el-tab-pane"),_=r("el-col"),U=r("el-row"),m=r("el-radio"),w=r("el-radio-group"),W=r("el-tabs"),L=r("el-card");return d(),f(L,{class:"main-card"},{default:o(()=>[e(W,{modelValue:l.activeName,"onUpdate:modelValue":a[18]||(a[18]=t=>l.activeName=t),onTabClick:n.handleClick},{default:o(()=>[e(y,{label:"\u7F51\u7AD9\u4FE1\u606F",name:"info"},{default:o(()=>[e(v,{"label-width":"100px",model:l.websiteConfigForm,"label-position":"left",size:"default"},{default:o(()=>[e(i,{label:"\u7F51\u7AD9\u5934\u50CF"},{default:o(()=>[e(g,{class:"avatar-uploader",action:"/api/websiteConfig/image","show-file-list":!1,"on-success":n.handleWebsiteAvatarSuccess},{default:o(()=>[l.websiteConfigForm.websiteAvatar?(d(),C("img",{key:0,src:l.websiteConfigForm.websiteAvatar,class:"avatar"},null,8,P)):(d(),f(p,{key:1,class:"avatar-uploader-icon"},{default:o(()=>[e(b)]),_:1}))]),_:1},8,["on-success"])]),_:1}),e(i,{label:"\u7F51\u7AD9\u540D\u79F0"},{default:o(()=>[e(u,{modelValue:l.websiteConfigForm.websiteName,"onUpdate:modelValue":a[0]||(a[0]=t=>l.websiteConfigForm.websiteName=t),style:{width:"400px"}},null,8,["modelValue"])]),_:1}),e(i,{label:"\u7F51\u7AD9\u4F5C\u8005"},{default:o(()=>[e(u,{modelValue:l.websiteConfigForm.websiteAuthor,"onUpdate:modelValue":a[1]||(a[1]=t=>l.websiteConfigForm.websiteAuthor=t),style:{width:"400px"}},null,8,["modelValue"])]),_:1}),e(i,{label:"\u7F51\u7AD9\u7B80\u4ECB"},{default:o(()=>[e(u,{modelValue:l.websiteConfigForm.websiteIntro,"onUpdate:modelValue":a[2]||(a[2]=t=>l.websiteConfigForm.websiteIntro=t),style:{width:"400px"}},null,8,["modelValue"])]),_:1}),e(i,{label:"\u7F51\u7AD9\u521B\u5EFA\u65E5\u671F"},{default:o(()=>[e(S,{style:{width:"400px"},"value-format":"YYYY-MM-DD",modelValue:l.websiteConfigForm.websiteCreateTime,"onUpdate:modelValue":a[3]||(a[3]=t=>l.websiteConfigForm.websiteCreateTime=t),type:"date",placeholder:"\u9009\u62E9\u65E5\u671F"},null,8,["modelValue"])]),_:1}),e(i,{label:"\u7F51\u7AD9\u516C\u544A"},{default:o(()=>[e(u,{modelValue:l.websiteConfigForm.websiteNotice,"onUpdate:modelValue":a[4]||(a[4]=t=>l.websiteConfigForm.websiteNotice=t),placeholder:"\u8BF7\u8F93\u5165\u516C\u544A\u5185\u5BB9",style:{width:"400px"},type:"textarea",rows:5},null,8,["modelValue"])]),_:1}),e(i,{label:"\u5907\u6848\u53F7"},{default:o(()=>[e(u,{modelValue:l.websiteConfigForm.websiteRecordNo,"onUpdate:modelValue":a[5]||(a[5]=t=>l.websiteConfigForm.websiteRecordNo=t),style:{width:"400px"}},null,8,["modelValue"])]),_:1}),e(i,{label:"\u7B2C\u4E09\u65B9\u767B\u5F55"},{default:o(()=>[e(k,{modelValue:l.websiteConfigForm.socialLoginList,"onUpdate:modelValue":a[6]||(a[6]=t=>l.websiteConfigForm.socialLoginList=t)},{default:o(()=>[e(c,{label:"qq"},{default:o(()=>[s("QQ")]),_:1}),e(c,{label:"weibo"},{default:o(()=>[s("\u5FAE\u535A")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(V,{type:"primary",style:{"margin-left":"6.3rem"},onClick:n.updateWebsiteConfig},{default:o(()=>[s(" \u4FEE\u6539 ")]),_:1},8,["onClick"])]),_:1},8,["model"])]),_:1}),e(y,{label:"\u793E\u4EA4\u4FE1\u606F",name:"notice"},{default:o(()=>[e(v,{"label-width":"70px",model:l.websiteConfigForm,size:"default"},{default:o(()=>[e(k,{modelValue:l.websiteConfigForm.socialUrlList,"onUpdate:modelValue":a[10]||(a[10]=t=>l.websiteConfigForm.socialUrlList=t)},{default:o(()=>[e(i,{label:"QQ"},{default:o(()=>[e(u,{modelValue:l.websiteConfigForm.qq,"onUpdate:modelValue":a[7]||(a[7]=t=>l.websiteConfigForm.qq=t),style:{width:"400px","margin-right":"1rem"}},null,8,["modelValue"]),e(c,{label:"qq"},{default:o(()=>[s("\u662F\u5426\u5C55\u793A")]),_:1})]),_:1}),e(i,{label:"Github"},{default:o(()=>[e(u,{modelValue:l.websiteConfigForm.github,"onUpdate:modelValue":a[8]||(a[8]=t=>l.websiteConfigForm.github=t),style:{width:"400px","margin-right":"1rem"}},null,8,["modelValue"]),e(c,{label:"github"},{default:o(()=>[s("\u662F\u5426\u5C55\u793A")]),_:1})]),_:1}),e(i,{label:"Gitee"},{default:o(()=>[e(u,{modelValue:l.websiteConfigForm.gitee,"onUpdate:modelValue":a[9]||(a[9]=t=>l.websiteConfigForm.gitee=t),style:{width:"400px","margin-right":"1rem"}},null,8,["modelValue"]),e(c,{label:"gitee"},{default:o(()=>[s("\u662F\u5426\u5C55\u793A")]),_:1})]),_:1}),e(V,{type:"primary",style:{"margin-left":"4.375rem"},onClick:n.updateWebsiteConfig},{default:o(()=>[s(" \u4FEE\u6539 ")]),_:1},8,["onClick"])]),_:1},8,["modelValue"])]),_:1},8,["model"])]),_:1}),e(y,{label:"\u5176\u4ED6\u8BBE\u7F6E",name:"password"},{default:o(()=>[e(v,{"label-width":"120px",model:l.websiteConfigForm,"label-position":"left",size:"default"},{default:o(()=>[e(U,{style:{width:"600px"}},{default:o(()=>[e(_,{md:12},{default:o(()=>[e(i,{label:"\u7528\u6237\u5934\u50CF"},{default:o(()=>[e(g,{class:"avatar-uploader",action:"/api/websiteConfig/image","show-file-list":!1,"on-success":n.handleUserAvatarSuccess,"before-upload":n.beforeAvatarUpload},{default:o(()=>[l.websiteConfigForm.userAvatar?(d(),C("img",{key:0,src:l.websiteConfigForm.userAvatar,class:"avatar"},null,8,M)):(d(),f(p,{key:1,class:"avatar-uploader-icon"},{default:o(()=>[e(b)]),_:1}))]),_:1},8,["on-success","before-upload"])]),_:1})]),_:1}),e(_,{md:12},{default:o(()=>[e(i,{label:"\u6E38\u5BA2\u5934\u50CF"},{default:o(()=>[e(g,{class:"avatar-uploader",action:"/api/websiteConfig/image","show-file-list":!1,"on-success":n.handleTouristAvatarSuccess,"before-upload":n.beforeAvatarUpload},{default:o(()=>[l.websiteConfigForm.touristAvatar?(d(),C("img",{key:0,src:l.websiteConfigForm.touristAvatar,class:"avatar"},null,8,G)):(d(),f(p,{key:1,class:"avatar-uploader-icon"},{default:o(()=>[e(b)]),_:1}))]),_:1},8,["on-success","before-upload"])]),_:1})]),_:1})]),_:1}),e(i,{label:"\u9ED8\u8BA4\u6587\u7AE0\u5C01\u9762"},{default:o(()=>[e(g,{class:"cover-uploader",action:"/api/websiteConfig/image","before-upload":n.beforeUpload,"show-file-list":!1,"on-success":n.handleArticleCoverSuccess},{default:o(()=>[l.websiteConfigForm.articleCover?(d(),C("img",{key:0,src:l.websiteConfigForm.articleCover,class:"cover"},null,8,X)):(d(),f(p,{key:1,class:"cover-uploader-icon"},{default:o(()=>[e(b)]),_:1}))]),_:1},8,["before-upload","on-success"])]),_:1}),e(i,{label:"\u90AE\u7BB1\u901A\u77E5"},{default:o(()=>[e(w,{modelValue:l.websiteConfigForm.isEmailNotice,"onUpdate:modelValue":a[11]||(a[11]=t=>l.websiteConfigForm.isEmailNotice=t)},{default:o(()=>[e(m,{label:0},{default:o(()=>[s("\u5173\u95ED")]),_:1}),e(m,{label:1},{default:o(()=>[s("\u5F00\u542F")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(i,{label:"\u8BC4\u8BBA\u5BA1\u6838"},{default:o(()=>[e(w,{modelValue:l.websiteConfigForm.isCommentReview,"onUpdate:modelValue":a[12]||(a[12]=t=>l.websiteConfigForm.isCommentReview=t)},{default:o(()=>[e(m,{label:0},{default:o(()=>[s("\u5173\u95ED")]),_:1}),e(m,{label:1},{default:o(()=>[s("\u5F00\u542F")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(i,{label:"\u7559\u8A00\u5BA1\u6838"},{default:o(()=>[e(w,{modelValue:l.websiteConfigForm.isMessageReview,"onUpdate:modelValue":a[13]||(a[13]=t=>l.websiteConfigForm.isMessageReview=t)},{default:o(()=>[e(m,{label:0},{default:o(()=>[s("\u5173\u95ED")]),_:1}),e(m,{label:1},{default:o(()=>[s("\u5F00\u542F")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(i,{label:"\u6253\u8D4F\u72B6\u6001"},{default:o(()=>[e(w,{modelValue:l.websiteConfigForm.isReward,"onUpdate:modelValue":a[14]||(a[14]=t=>l.websiteConfigForm.isReward=t)},{default:o(()=>[e(m,{label:0},{default:o(()=>[s("\u5173\u95ED")]),_:1}),e(m,{label:1},{default:o(()=>[s("\u5F00\u542F")]),_:1})]),_:1},8,["modelValue"])]),_:1}),A(e(U,{style:{width:"600px"}},{default:o(()=>[e(_,{md:12},{default:o(()=>[e(i,{label:"\u5FAE\u4FE1\u6536\u6B3E\u7801"},{default:o(()=>[e(g,{class:"avatar-uploader",action:"/api/websiteConfig/image","show-file-list":!1,"on-success":n.handleWeiXinSuccess},{default:o(()=>[l.websiteConfigForm.weiXinQRCode?(d(),C("img",{key:0,src:l.websiteConfigForm.weiXinQRCode,class:"avatar"},null,8,z)):(d(),f(p,{key:1,class:"avatar-uploader-icon"},{default:o(()=>[e(b)]),_:1}))]),_:1},8,["on-success"])]),_:1})]),_:1}),e(_,{md:12},{default:o(()=>[e(i,{label:"\u652F\u4ED8\u5B9D\u6536\u6B3E\u7801"},{default:o(()=>[e(g,{class:"avatar-uploader",action:"/api/websiteConfig/image","show-file-list":!1,"on-success":n.handleAlipaySuccess},{default:o(()=>[l.websiteConfigForm.alipayQRCode?(d(),C("img",{key:0,src:l.websiteConfigForm.alipayQRCode,class:"avatar"},null,8,I)):(d(),f(p,{key:1,class:"avatar-uploader-icon"},{default:o(()=>[e(b)]),_:1}))]),_:1},8,["on-success"])]),_:1})]),_:1})]),_:1},512),[[R,l.websiteConfigForm.isReward==1]]),e(i,{label:"\u804A\u5929\u5BA4\u72B6\u6001"},{default:o(()=>[e(w,{modelValue:l.websiteConfigForm.isChatRoom,"onUpdate:modelValue":a[15]||(a[15]=t=>l.websiteConfigForm.isChatRoom=t)},{default:o(()=>[e(m,{label:0},{default:o(()=>[s("\u5173\u95ED")]),_:1}),e(m,{label:1},{default:o(()=>[s("\u5F00\u542F")]),_:1})]),_:1},8,["modelValue"])]),_:1}),A(e(i,{label:"Websocket\u5730\u5740"},{default:o(()=>[e(u,{modelValue:l.websiteConfigForm.websocketUrl,"onUpdate:modelValue":a[16]||(a[16]=t=>l.websiteConfigForm.websocketUrl=t),style:{width:"400px"}},null,8,["modelValue"])]),_:1},512),[[R,l.websiteConfigForm.isChatRoom==1]]),e(i,{label:"\u97F3\u4E50\u64AD\u653E\u5668\u72B6\u6001"},{default:o(()=>[e(w,{modelValue:l.websiteConfigForm.isMusicPlayer,"onUpdate:modelValue":a[17]||(a[17]=t=>l.websiteConfigForm.isMusicPlayer=t)},{default:o(()=>[e(m,{label:0},{default:o(()=>[s("\u5173\u95ED")]),_:1}),e(m,{label:1},{default:o(()=>[s("\u5F00\u542F")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(V,{type:"primary",style:{"margin-left":"6.3rem"},onClick:n.updateWebsiteConfig},{default:o(()=>[s(" \u4FEE\u6539 ")]),_:1},8,["onClick"])]),_:1},8,["model"])]),_:1})]),_:1},8,["modelValue","onTabClick"])]),_:1})}var _e=T(q,[["render",Y]]);export{_e as default};
