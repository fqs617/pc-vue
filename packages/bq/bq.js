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

    // 所属类型  用于控制接口 后是否 发sentry 等
    this.type = process.env.NODE_TYPE

    // 开发坏境
    this.isDevelopment = this.env === 'development'

    // 线上坏境
    this.isProduction = this.env === 'production'

    // 使用线上api
    this.isProductionAPI = this.isProduction && (this.type === 'pro' || this.type === 'sentry')

    // 主题色
    this.theme = '#FFD520'
    console.table([{'version': this.version, 'env': this.env, 'type': this.type}])
    // if (this.isProduction) {
    //   let job = `%c倍全FE 是一个年轻有基情的团队，\n我们有很多妹子！妹子！妹子 \n等撩中  \nemail: %cxierenhong@beiquan.org\n`
    //   /* eslint-disable */
    //   let logo = `%c
    //                   _/                  _/
    //                 _/_/_/      _/_/          _/_/_/  _/    _/    _/_/_/  _/_/_/
    //                 _/    _/  _/_/_/_/  _/  _/    _/  _/    _/  _/    _/  _/    _/
    //               _/    _/  _/        _/  _/    _/  _/    _/  _/    _/  _/    _/
    //               _/_/_/      _/_/_/  _/    _/_/_/    _/_/_/    _/_/_/  _/    _/
    //                                           _/
    //                                           _/
    //   `
    //   /* eslint-enable */
    //   console.info(logo, 'color:#008cd6;')
    //   console.info(job, 'font-weight:bold', 'color:#FF8113')
    // }
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
