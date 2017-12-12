import UCache from './u.cache'

const uCache = new UCache()

export default {
  install(Vue, _options) {
    Vue.bqUCache = uCache
    Vue.mixin({
      created: function() {
        this.$bqUCache = uCache
      }
    })
  }
}
