import local from './local.storage'
export default {
  install(Vue, options) {
    const _local = local(options)
    Vue.local = _local
    Vue.mixin({
      created: function() {
        this.$local = _local
      }
    })
  }
}
