import {createRouter,createWebHashHistory} from 'vue-router'
import NProgress from "nprogress";
import "nprogress/nprogress.css";



const routes = [
    {
        path: "/layout",
        component: () => import("@/layout/index.vue"),
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/Home.vue'),
            },
            {
                path: '/article/:id',
                component: () => import('@/views/article/Article.vue'),
            },
            {
                path: '/archive',
                component: () => import('@/views/archive/Archive.vue'),
            },
            {
                path: '/category',
                component: () => import('@/views/category/Category.vue'),
            },
            {
                path: '/category/:id',
                component: () => import('@/views/article/ArticleList.vue'),
            },
            {
                path: '/tag',
                component: () => import('@/views/tag/Tag.vue'),
            },
            {
                path: '/tag/:id',
                component: () => import('@/views/article/ArticleList.vue'),
            },
            {
                path: '/album',
                component: () => import('@/views/album/Album.vue'),
            },
            {
                path: '/album/:id',
                component: () => import('@/views/album/Photo.vue'),
            },
            {
                path: '/talk',
                component: () => import('@/views/talk/Talk.vue'),
            },
            {
                path: '/talk/:id',
                component: () => import('@/views/talk/TalkInfo.vue'),
            },
            {
                path: '/user',
                component: () => import('@/views/user/User.vue'),
            },
        ]
    }
]

const router = createRouter({
    routes: routes,
    history: createWebHashHistory(),
    scrollBehavior(to, from, savedPosition) {
        // ????????????????????????????????????
        if(to.path === from.path){
            return {}
        }
        return { top: 0 }
    },
})


//???????????????
NProgress.configure({
    easing: "ease", // ????????????
    speed: 500, // ????????????????????????
    showSpinner: false, // ??????????????????ico
    trickleSpeed: 200, // ??????????????????
    minimum: 0.3 // ??????????????????????????????
  });


//??????????????????
//to??????????????????????????????????????????
//from????????????????????????????????????????????????
router.beforeEach(async (to, from, next) => {
    NProgress.start();
    if (to.path === '/') {
        // ???????????????????????????
        next({ path: '/home' });
    }else{ 
        next();    
    }
})

router.afterEach(() => {
    NProgress.done();
  });

export function resetRouter() {
    const newRouter = createRouter({
        routes: routes,
        history: createWebHashHistory()
    })
    router.matcher = newRouter.matcher;
}

export default router



