const searchFile = resolve => require(['./src/search.vue'], resolve)
export default function (router) {
  // 选择模板
  router.push({
    path: '/search/file',
    name: 'searchfile',
    component: searchFile
  })
}
