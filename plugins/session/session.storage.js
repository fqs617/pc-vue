/**
 *
 * session Storeage
 * @class Session
 * @author xierenhong
 */
class Session {
  constructor() {
    this.session = window.sessionStorage
  }

  /**
   *
   * 根据key 获取value 值
   * @param {any} key
   * @returns 返回 获取到的value 如果获取不到则返回null
   * @memberOf Session
   */
  get(key) {
    return this.session.getItem(key) || null
  }

  /**
   * 存储新值
   * @param {String} key [必填]唯一建key 用于取key
   * @param {any} value [必填] 存储的数据
   *
   * @memberOf Session
   */
  set(key, value) {
    this.session.setItem(key, value)
  }

  /**
   *
   * 删除 一个存储
   * @param {any} key [必填] 唯一key
   *
   * @memberOf Session
   */
  delete(key) {
    this.session.removeItem(key)
  }

  /**
   * 清空所有
   * @memberOf Session
   */
  clear() {
    this.session.clear()
  }
}

const session = new Session()
export default {
  install(Vue, _options) {
    Vue.session = session
    Vue.mixin({
      created: function() {
        this.$session = session
      }
    })
  },
  Session
}
