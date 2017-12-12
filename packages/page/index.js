import Page from './src/page.vue'

Page.install = function(Vue) {
  Vue.component(Page.name, Page)
}

export default Page
