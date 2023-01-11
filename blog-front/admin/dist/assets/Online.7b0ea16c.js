import{p as x}from"./common.10683f1a.js";import{ag as r,aj as O,o as d,Q as g,R as n,a as p,W as h,X as e,a7 as U,V as m,S as T}from"./@vue.9e9a2d45.js";import{_ as D}from"./index.ae6b5db7.js";import"./dayjs.68f6f475.js";import"./@babel.1ce85722.js";import"./axios.cdba3bd7.js";import"./form-data.d1f94bc2.js";import"./vue-router.b11bef48.js";import"./vuex.029ab250.js";import"./vuex-persistedstate.fa252374.js";import"./nprogress.8c2c2e00.js";import"./vue-axios.516efde1.js";import"./element-plus.e856da41.js";import"./lodash-es.1d9717e1.js";import"./@vueuse.15af719d.js";import"./@element-plus.b2728cca.js";import"./@popperjs.36402333.js";import"./@ctrl.82a509e0.js";import"./async-validator.fb49d0f5.js";import"./memoize-one.4ee5c96d.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./@floating-ui.f14f28ca.js";import"./@kangc.b9a0ef8b.js";import"./vue.a84c3055.js";import"./markdown-it-emoji.952032df.js";import"./@vuepress.3e7afe62.js";import"./markdown-it-container.512a5043.js";import"./highlight.js.6e93349b.js";import"./codemirror.59d98cc1.js";const S={created(){this.listOnlineUsers()},data(){return{loading:!0,userList:[],keywords:null,current:1,size:10,count:0,isCheck:!1,optLog:{}}},methods:{listOnlineUsers(){this.axios.get("/api/userInfo/listOnlineUsers",{params:{current:this.current,size:this.size,keywords:this.keywords}}).then(({data:t})=>{this.userList=t.data.recordList,this.count=t.data.count,this.loading=!1})},sizeChange(t){this.size=t,this.listOnlineUsers()},currentChange(t){this.current=t,this.listOnlineUsers()},removeOnlineUser(t){this.axios.delete("/api/admin/users/"+t.userInfoId+"/online").then(({data:a})=>{a.flag?(this.$notify.success({title:"\u6210\u529F",message:a.message}),this.listOnlineUsers()):this.$notify.error({title:"\u5931\u8D25",message:a.message})})}},computed:{tagType(){return function(t){switch(t){case"GET":return"";case"POST":return"success";case"PUT":return"warning";case"DELETE":return"danger"}}},dataFormat(){return function(t){return x(t,"YYYY-MM-DD")}}}},L={class:"title"},V={class:"operation-container"},E={style:{"margin-left":"auto"}},I=["src"];function Y(t,a,B,K,o,l){const u=r("Search"),c=r("el-icon"),f=r("el-input"),_=r("el-button"),i=r("el-table-column"),y=r("Timer"),w=r("Delete"),v=r("el-popconfirm"),C=r("el-table"),b=r("el-pagination"),z=r("el-card"),k=O("loading");return d(),g(z,{class:"main-card"},{default:n(()=>[p("div",L,h(this.$route.name),1),p("div",V,[p("div",E,[e(f,{modelValue:o.keywords,"onUpdate:modelValue":a[0]||(a[0]=s=>o.keywords=s),size:"small",placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u6635\u79F0",style:{width:"200px"},onKeyup:U(l.listOnlineUsers,["enter","native"])},{prefix:n(()=>[e(c,null,{default:n(()=>[e(u)]),_:1})]),_:1},8,["modelValue","onKeyup"]),e(_,{type:"primary",size:"small",style:{"margin-left":"1rem"},onClick:l.listOnlineUsers},{default:n(()=>[e(c,null,{default:n(()=>[e(u)]),_:1}),m(" \u641C\u7D22 ")]),_:1},8,["onClick"])])]),T((d(),g(C,{data:o.userList},{default:n(()=>[e(i,{type:"selection",width:"55",align:"center"}),e(i,{prop:"avatar",label:"\u5934\u50CF",align:"center",width:"100"},{default:n(s=>[p("img",{src:s.row.avatar,width:"40",height:"40"},null,8,I)]),_:1}),e(i,{prop:"nickname",label:"\u6635\u79F0",align:"center"}),e(i,{prop:"ipAddress",label:"ip\u5730\u5740",align:"center"}),e(i,{prop:"ipSource",label:"\u767B\u5F55\u5730\u5740",align:"center",width:"200"}),e(i,{prop:"browser",label:"\u6D4F\u89C8\u5668",align:"center",width:"160"}),e(i,{prop:"os",label:"\u64CD\u4F5C\u7CFB\u7EDF",align:"center"}),e(i,{prop:"lastLoginTime",label:"\u767B\u5F55\u65F6\u95F4",align:"center",width:"200"},{default:n(s=>[e(c,{style:{"margin-right":"5px"}},{default:n(()=>[e(y)]),_:1}),m(" "+h(l.dataFormat(s.row.lastLoginTime)),1)]),_:1}),e(i,{label:"\u64CD\u4F5C",align:"center",width:"150"},{default:n(s=>[e(v,{title:"\u786E\u5B9A\u4E0B\u7EBF\u5417\uFF1F",style:{"margin-left":"10px"},onConfirm:N=>l.removeOnlineUser(s.row)},{reference:n(()=>[e(_,{link:"",size:"small",type:"primary",slot:"reference"},{default:n(()=>[e(c,null,{default:n(()=>[e(w)]),_:1}),m(" \u4E0B\u7EBF ")]),_:1})]),_:2},1032,["onConfirm"])]),_:1})]),_:1},8,["data"])),[[k,o.loading]]),e(b,{class:"pagination-container",background:"",onSizeChange:l.sizeChange,onCurrentChange:l.currentChange,"current-page":o.current,"page-size":o.size,total:o.count,"page-sizes":[10,20],layout:"total, sizes, prev, pager, next, jumper"},null,8,["onSizeChange","onCurrentChange","current-page","page-size","total"])]),_:1})}var ge=D(S,[["render",Y],["__scopeId","data-v-490f8292"]]);export{ge as default};
