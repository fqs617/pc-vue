import assign from 'lodash.assign'
import Raven from 'raven-js'

const DEFAULT_MSG_OPT = {
  level: 'info',
  logger: 'bq.log'
}

const DEFAULT_ERR_OPT = {
  level: 'info',
  logger: 'bq.exc'
}

/**
 *
 * 上传错误类
 * @see doc https://docs.sentry.io/clients/javascript/usage/
 * @class Log
 */
class Log {
  /**
   *
   * 发送一个日志
   * @static
   * @param {any} msg 消息
   * @param {any} [options={}] 配置
   * @memberof Log
   */
  static captureMessage(msg, options = {}) {
    let opt = assign({}, DEFAULT_MSG_OPT, options)
    Raven.captureMessage(msg, opt)
  }

  static info(msg, options = {}) {
    options.level = 'info'
    this.captureMessage(msg, options)
  }

  static warning(msg, options = {}) {
    options.level = 'warning'
    this.captureMessage(msg, options)
  }

  static error(msg, options = {}) {
    options.level = 'error'
    this.captureMessage(msg, options)
  }

  /**
   *
   * 上传一个错误
   * @static
   * @param {any} err 错误内容
   * @param {any} options 别的配置
   * @memberof Log
   */
  static captureException(err, options) {
    let opt = assign({}, DEFAULT_ERR_OPT, options)
    Raven.captureException(err, opt)
  }

  /**
   *
   * 程序执行生命周期
   * @static
   * @param {any} [params={}] 参考sentry 文档
   * @memberof Log
   */
  static captureBreadcrumb(params = {}) {
    Raven.captureBreadcrumb(params)
  }

  /**
   *
   * 用户登录时 用来回传用户 让 数据与用户关联
   * @static
   * @param {any} [params={}] 用户信息 email id
   * @memberof Log
   */
  static setUserContext(params = {}) {
    Raven.setUserContext(params)
  }
}

window.bqLog = Log

export default Log
