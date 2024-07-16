import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import LayoutView from '../views/layout/LayoutView.vue'
import store from "../store/index.js"

const routes = [
  {
    path: "/login",
    name: "login",
    component: ()=>import("../views/pages/login.vue")
  },
  {
    path: "/",
    name: "layout",
    component: LayoutView,
    redirect: "/index",
    children: [{
      path: "/index",
      name: "index",
      component:()=>import("../views/pages/index.vue")
    },
    {
      path: "/user",
      name: "user",
      component:()=>import("../views/pages/userList.vue")
    },
    {
      path: "/role",
      name: "role",
      component:()=>import("../views/pages/roleList.vue")
    }
    ]
  }
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  // {
  //   path:"/index",
  //   name:"layout",
  //   component: () => import("../views/LayoutView.vue")
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((from,to,next)=>{
  /**
   * from: 从哪个页面
   * to:到哪个页面
   * next：只有执行next()页面才会进行跳转
   */
  // 判断用户是否登录
  console.log("store",store.state.uInfo)
  const uInfo = store.state.uInfo.userInfo
  if(!uInfo.username) {
    if (from.path === "/login") {
      next()
      return
    }
    // 未登录，跳转到login
    next("/login")
  } else {
    next()
  }
})

export default router
