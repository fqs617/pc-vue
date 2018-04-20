import Vue from 'vue'
import Router from 'vue-router'
import AuthRouter from '@/utils/auth.router'
import App from '@/views/app.vue'
import demoRouter from '@/views/demo'
import homeRouter from '@/views/home'
import fileRouter from '@/views/file'
import meRouter from '@/views/me'
import searchRouter from '@/views/search'
Vue.use(Router)

let routes = []

// 根路由
let rootRoutr = {
  path: '/',
  component: App,
  children: [],
  meta: {
    requiresAuth: false
  }
}

// 重定向路由
let redirectRoute = {
  path: '*',
  redirect: '/'
}

demoRouter(routes) // 底部导航不显示的情况
homeRouter(rootRoutr.children, routes) // 底部导航显示的情况
fileRouter(rootRoutr.children, routes)
meRouter(rootRoutr.children, routes)
searchRouter(routes)

let authRouter = new AuthRouter()
let authRouters = authRouter.init(routes.concat([rootRoutr, redirectRoute]))

// 暂时不做路由区分
let mode = 'history'
export default new Router({
  mode: mode,
  routes: authRouters
})
