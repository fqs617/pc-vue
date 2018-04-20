// import Home from './src/home.vue'
const Home = resolve => require(['./src/home.vue'], resolve)
export default function (router) {
  router.push({
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: false,
      requireStoresId: false
    }
  })
}
