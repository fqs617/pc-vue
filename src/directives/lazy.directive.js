import Vue from 'vue'
/**
 * 自定义加载图片 lazy
 */
export default {
  bind(el, binding, _vnode) {
    Vue.nextTick(() => {
      let $el = $(el)
      let isLoad = $el.data('load')
      if (!isLoad) {
        let { value } = binding
        if (value) {
          $el.attr('src', value).data('load', true)
        }
      }

    })
  },

  install(Vue) {
    Vue.directive('bqLazy', {
      bind: this.bind
    })
  }
}
