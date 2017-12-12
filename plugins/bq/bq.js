/**
 * 倍全全局配置
 * @author xierenhong
 * @class Global
 */
class Global {
  constructor() {
    // 版本
    this.version = process.env.VERSION

    // 环境版本
    this.env = process.env.NODE_ENV

    // 开发坏境
    this.isDevelopment = this.env === 'development'

    // 线上坏境
    this.isProduction = this.env === 'production'

    // 主题色
    this.theme = '#FFD520'
    console.table([{'版本': this.version, '开发环境': this.env}])
  }
}

const golobal = new Global()

window.bq = golobal

export default {
  install(Vue, _options) {
    Vue.bq = golobal
    Vue.mixin({
      created: function() {
        this.$bq = golobal
      }
    })
  }
}
