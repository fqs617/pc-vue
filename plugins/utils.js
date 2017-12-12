import * as Utils from '@/utils/utils'
export default {
  install(Vue, _options) {
    Vue.bqUtils = Utils
    Vue.mixin({
      created: function() {
        this.$bqUtils = Utils
      }
    })
  }
}
