import{i as B}from"./image-conversion.2d06665b.js";import{_ as j}from"./index.ae6b5db7.js";import{ag as a,aj as G,o as r,Q as u,R as o,a as i,W as f,X as t,S as J,U as W,c as h,a6 as A,F as Q,V as d,b7 as R,b6 as X}from"./@vue.9e9a2d45.js";import"./@babel.1ce85722.js";import"./axios.cdba3bd7.js";import"./form-data.d1f94bc2.js";import"./vue-router.b11bef48.js";import"./vuex.029ab250.js";import"./vuex-persistedstate.fa252374.js";import"./nprogress.8c2c2e00.js";import"./vue-axios.516efde1.js";import"./element-plus.e856da41.js";import"./lodash-es.1d9717e1.js";import"./@vueuse.15af719d.js";import"./@element-plus.b2728cca.js";import"./@popperjs.36402333.js";import"./@ctrl.82a509e0.js";import"./dayjs.68f6f475.js";import"./async-validator.fb49d0f5.js";import"./memoize-one.4ee5c96d.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./@floating-ui.f14f28ca.js";import"./@kangc.b9a0ef8b.js";import"./vue.a84c3055.js";import"./markdown-it-emoji.952032df.js";import"./@vuepress.3e7afe62.js";import"./markdown-it-container.512a5043.js";import"./highlight.js.6e93349b.js";import"./codemirror.59d98cc1.js";const q={created(){this.listPages()},data:function(){return{pageTitle:"",keywords:"",loading:!0,current:1,size:8,count:0,isdeletePage:!1,addOrEdit:!1,pageForum:{id:null,pageName:"",pageLabel:"",pageCover:""},pageList:[]}},methods:{openModel(e){e?(this.pageForum=JSON.parse(e),this.pageTitle="\u4FEE\u6539\u9875\u9762"):(this.pageForum={id:null,pageName:"",pageLabel:"",pageCover:""},this.pageTitle="\u65B0\u5EFA\u9875\u9762"),this.addOrEdit=!0},listPages(){this.axios.get("/api/page/getPages").then(({data:e})=>{this.pageList=e.data,this.loading=!1})},addOrEditPage(){if(this.pageForum.pageName.trim()=="")return this.$message.error("\u9875\u9762\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),!1;if(this.pageForum.pageLabel.trim()=="")return this.$message.error("\u9875\u9762\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A"),!1;if(this.pageForum.pageCover==null)return this.$message.error("\u9875\u9762\u5C01\u9762\u4E0D\u80FD\u4E3A\u7A7A"),!1;this.pageForum.id==null?this.axios.post("/api/page/addPage",this.pageForum).then(({data:e})=>{e.flag?(this.$notify.success({title:"\u6210\u529F",message:e.message}),this.listPages()):this.$notify.error({title:"\u5931\u8D25",message:e.message})}):this.axios.post("/api/page/updatePage",this.pageForum).then(({data:e})=>{e.flag?(this.$notify.success({title:"\u6210\u529F",message:e.message}),this.listPages()):this.$notify.error({title:"\u5931\u8D25",message:e.message})}),this.addOrEdit=!1},uploadCover(e){console.log(e),this.pageForum.pageCover=e.data},beforeUpload(e){return["image/jpeg","image/png","image/gif"].includes(e.type)?new Promise((c,F)=>{e.size/1024<200&&c(e),B.compressAccurately(e,200).then(n=>{c(n)})}):(this.$message.error("\u56FE\u7247\u683C\u5F0F\u53EA\u80FD\u662F JPG/PNG/GIF!"),!1)},handleCommand(e){const s=e.substring(0,6),g=e.substring(6);s=="delete"?(this.pageForum.id=g,this.isdeletePage=!0):this.openModel(g)},deletePage(){this.axios.delete("/api/page/deletePage/"+this.pageForum.id).then(({data:e})=>{e.flag?(this.$notify.success({title:"\u6210\u529F",message:e.message}),this.listPages()):this.$notify.error({title:"\u5931\u8D25",message:e.message}),this.isdeletePage=!1})}}},y=e=>(R("data-v-2ee257ef"),e=e(),X(),e),H={class:"title"},K={class:"operation-container"},Y=y(()=>i("span",null,"\u65B0\u5EFA\u9875\u9762",-1)),Z={class:"page-item"},x={class:"page-opreation"},ee={class:"page-name"},te={class:"dialog-title-container"},oe={key:0,class:"upload-empty"},ae=y(()=>i("div",{class:"el-upload__text"},[d(" \u5C06\u6587\u4EF6\u62D6\u5230\u6B64\u5904\uFF0C\u6216"),i("em",null,"\u70B9\u51FB\u4E0A\u4F20")],-1)),se=["src"],le={class:"dialog-title-container"},ie=y(()=>i("div",{style:{"font-size":"1rem"}},"\u662F\u5426\u5220\u9664\u8BE5\u9875\u9762\uFF1F",-1));function ne(e,s,g,c,F,n){const w=a("Plus"),p=a("el-icon"),m=a("el-button"),b=a("el-empty"),V=a("MoreFilled"),k=a("Edit"),v=a("el-dropdown-item"),N=a("Delete"),L=a("el-dropdown-menu"),$=a("el-dropdown"),E=a("el-image"),O=a("el-col"),S=a("el-row"),P=a("el-input"),_=a("el-form-item"),T=a("upload-filled"),U=a("el-upload"),z=a("el-form"),C=a("el-dialog"),D=a("Warning"),I=a("el-card"),M=G("loading");return r(),u(I,{class:"main-card my-page-card"},{default:o(()=>[i("div",H,f(this.$route.name),1),i("div",K,[t(m,{type:"primary",size:"default",onClick:s[0]||(s[0]=l=>n.openModel(null))},{default:o(()=>[t(p,null,{default:o(()=>[t(w)]),_:1}),Y]),_:1})]),J((r(),u(S,{class:"page-container",gutter:12},{default:o(()=>[e.pageList.length==0?(r(),u(b,{key:0,description:"\u6682\u65E0\u9875\u9762"})):W("",!0),(r(!0),h(Q,null,A(e.pageList,l=>(r(),u(O,{key:l.id,md:6},{default:o(()=>[i("div",Z,[i("div",x,[t($,{onCommand:n.handleCommand},{dropdown:o(()=>[t(L,null,{default:o(()=>[t(v,{command:"update"+JSON.stringify(l)},{default:o(()=>[t(p,null,{default:o(()=>[t(k)]),_:1}),d("\u7F16\u8F91 ")]),_:2},1032,["command"]),t(v,{command:"delete"+l.id},{default:o(()=>[t(p,null,{default:o(()=>[t(N)]),_:1}),d("\u5220\u9664 ")]),_:2},1032,["command"])]),_:2},1024)]),default:o(()=>[t(p,{style:{color:"#fff"}},{default:o(()=>[t(V)]),_:1})]),_:2},1032,["onCommand"])]),t(E,{fit:"cover",class:"page-cover",src:l.pageCover},null,8,["src"]),i("div",ee,f(l.pageName),1)])]),_:2},1024))),128))]),_:1})),[[M,e.loading]]),t(C,{modelValue:e.addOrEdit,"onUpdate:modelValue":s[4]||(s[4]=l=>e.addOrEdit=l),width:"35%",top:"10vh"},{header:o(()=>[i("div",te,f(e.pageTitle),1)]),footer:o(()=>[t(m,{onClick:s[3]||(s[3]=l=>e.addOrEdit=!1)},{default:o(()=>[d("\u53D6 \u6D88")]),_:1}),t(m,{type:"primary",onClick:n.addOrEditPage},{default:o(()=>[d(" \u786E \u5B9A ")]),_:1},8,["onClick"])]),default:o(()=>[t(z,{"label-width":"80px",size:"default",model:e.pageForum},{default:o(()=>[t(_,{label:"\u9875\u9762\u540D\u79F0"},{default:o(()=>[t(P,{style:{width:"220px"},modelValue:e.pageForum.pageName,"onUpdate:modelValue":s[1]||(s[1]=l=>e.pageForum.pageName=l)},null,8,["modelValue"])]),_:1}),t(_,{label:"\u9875\u9762\u6807\u7B7E"},{default:o(()=>[t(P,{style:{width:"220px"},modelValue:e.pageForum.pageLabel,"onUpdate:modelValue":s[2]||(s[2]=l=>e.pageForum.pageLabel=l)},null,8,["modelValue"])]),_:1}),t(_,{label:"\u9875\u9762\u5C01\u9762"},{default:o(()=>[t(U,{class:"upload-cover",drag:"","show-file-list":!1,action:"/api/websiteConfig/image","before-upload":n.beforeUpload,"on-success":n.uploadCover},{default:o(()=>[e.pageForum.pageCover==""?(r(),h("div",oe,[t(p,null,{default:o(()=>[t(T)]),_:1}),ae])):(r(),h("img",{key:1,src:e.pageForum.pageCover,style:{width:"360px",height:"180px"}},null,8,se))]),_:1},8,["before-upload","on-success"])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue"]),t(C,{modelValue:e.isdeletePage,"onUpdate:modelValue":s[6]||(s[6]=l=>e.isdeletePage=l),width:"30%"},{header:o(()=>[i("div",le,[t(p,{style:{color:"#ff9900"}},{default:o(()=>[t(D)]),_:1}),d("\u63D0\u793A ")])]),footer:o(()=>[t(m,{onClick:s[5]||(s[5]=l=>e.isdeletePage=!1)},{default:o(()=>[d("\u53D6 \u6D88")]),_:1}),t(m,{type:"primary",onClick:n.deletePage},{default:o(()=>[d(" \u786E \u5B9A ")]),_:1},8,["onClick"])]),default:o(()=>[ie]),_:1},8,["modelValue"])]),_:1})}var Me=j(q,[["render",ne],["__scopeId","data-v-2ee257ef"]]);export{Me as default};