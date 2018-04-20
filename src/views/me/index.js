// import Home from './src/home.vue'
const Me = resolve => require(['./src/me.vue'], resolve)
export default function (router) {
  router.push({
    path: '/me',
    name: 'me',
    component: Me,
    meta: {
      // requiresAuth: false,
    }
  })
}
