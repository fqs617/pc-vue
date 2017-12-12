import cookie from 'arale-cookie'
/**
 * set https://github.com/aralejs/cookie
 */
export default {
  install(Vue) {
    Vue.cookie = cookie
    Vue.mixin({
      created: function() {
        this.$cookie = cookie
      }
    })
  },
  cookie
}
