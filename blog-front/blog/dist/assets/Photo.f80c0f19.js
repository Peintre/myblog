import{B as d}from"./Banner.f3a83b27.js";import{p as u}from"./common.311f3e79.js";import{_ as g}from"./index.e86265c1.js";import{ag as n,o as i,c as r,X as a,R as f,a as _,F as b,a6 as v}from"./@vue.7b8d04ba.js";import"./dayjs.9ba53914.js";import"./markdown-it.eab76e61.js";import"./entities.0d2c0164.js";import"./uc.micro.f151ccc3.js";import"./mdurl.ad103969.js";import"./linkify-it.9218f95f.js";import"./punycode.7386053b.js";import"./highlight.js.b1ec4ab5.js";import"./vue-router.efca2369.js";import"./nprogress.81d841a1.js";import"./vuex.5944bdd4.js";import"./axios.e291c7f2.js";import"./form-data.93ca3752.js";import"./vue-axios.516efde1.js";import"./element-plus.0a987ec7.js";import"./lodash-es.1d9717e1.js";import"./@vueuse.926279f8.js";import"./@element-plus.9394e619.js";import"./@popperjs.36402333.js";import"./@ctrl.fd318bfa.js";import"./async-validator.fb49d0f5.js";import"./memoize-one.4ee5c96d.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./@floating-ui.5fd0284c.js";const L={mounted(){window.addEventListener("scroll",this.scrollEvent,!0)},unmounted(){window.removeEventListener("scroll",this.scrollEvent)},props:{blogInfos:{type:Object,default(){return{}}}},components:{Banner:d},created(){this.listPhotos(),this.webConfigData()},computed:{dataFormat(){return function(t){return u(t,"YYYY-MM-DD HH:mm:ss")}}},data(){return{isLoadComplete:!1,size:10,current:1,photoAlbumCover:"",photoAlbumName:"",photoList:[],blogInfo:{pageList:{pageCover:"",pageName:""}},cover:"",pageTitle:""}},methods:{listPhotos(){const t=this;this.axios.get("/api/photo/blog/getPhotos/"+this.$route.params.id,{params:{current:this.current,size:this.size}}).then(({data:o})=>{t.photoAlbumCover=o.data.photoAlbumCover,t.photoAlbumName=o.data.photoAlbumName,o.data.photoList.length<10&&(t.isLoadComplete=!0),o.data.photoList.length&&t.photoList.push(...o.data.photoList)})},bannerBackShow(t){const o=this;t.pageList&&t.pageList.length>0&&t.pageList.forEach(e=>{e.pageLabel=="archive"&&(o.cover=e.pageCover,o.pageTitle=e.pageName)})},webConfigData(){this.blogInfos.pageList&&(this.blogInfo=this.blogInfos),this.bannerBackShow(this.blogInfo)},scrollEvent(){let t=137,o=document.documentElement.scrollTop||document.body.scrollTop;const e=document.documentElement.clientHeight||document.body.clientHeight;(document.documentElement.offsetHeight||document.body.offsetHeight)-e-o-t<0&&(this.isLoadComplete||(this.current++,this.listPhotos()))}},watch:{blogInfos(t){this.blogInfo=t,this.bannerBackShow(this.blogInfo)}}},w={class:"my-main"},C={class:"photo-wrap"},B=["src"];function E(t,o,e,p,s,H){const m=n("Banner"),l=n("el-card");return i(),r("div",w,[a(m,{imageUrl:s.cover,pageTitle:s.pageTitle},null,8,["imageUrl","pageTitle"]),a(l,{class:"card-content my-photo-container"},{default:f(()=>[_("div",C,[(i(!0),r(b,null,v(s.photoList,(c,h)=>(i(),r("img",{class:"photo",key:h,src:c},null,8,B))),128))])]),_:1})])}var ot=g(L,[["render",E],["__scopeId","data-v-4b63a240"]]);export{ot as default};