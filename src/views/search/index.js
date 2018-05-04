const searchFile = resolve => require(['./src/search.vue'], resolve)
const SearchResult = resolve => require(['./src/result.vue'], resolve)
export default function (router) {
  // 选择模板
  router.push({
    path: '/search/file',
    name: 'searchfile',
    component: searchFile
  })
  // 订单查询结果页
  router.push({
    path: '/search/result',
    name: 'SearchResult',
    component: SearchResult
  })
}
