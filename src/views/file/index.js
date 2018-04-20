// import Home from './src/home.vue'
const File = resolve => require(['./src/file.vue'], resolve)
export default function (router) {
  router.push({
    path: '/file',
    name: 'file',
    component: File,
    meta: {
      // requiresAuth: false,
      isApp: true
    }
  })
}
