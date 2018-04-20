// import Home from './src/home.vue'
const Home = resolve => require(['./src/home.vue'], resolve)
export default function (router) {
  router.push({
    path: '/home',
    name: 'home',
    component: Home,
    alias: '/', // '/'与‘/home’ 跳转同一个页面
    meta: {
      // requiresAuth: false,
      // requireStoresId: false,
      isApp: true
    }
  })
}
