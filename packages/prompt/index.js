import Prompt from './src/prompt.vue'

Prompt.install = function(Vue) {
  Vue.component(Prompt.name, Prompt)
}

export default Prompt
