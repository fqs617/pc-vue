import Content from './src/content.vue'

Content.install = function(Vue) {
  Vue.component(Content.name, Content)
}

export default Content
