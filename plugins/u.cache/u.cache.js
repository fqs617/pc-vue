import Local from '../local/local.storage'
import cookie from 'arale-cookie'

/**
 *
 * 用户缓存插件 缓存的内容 只有当前用户id 可以存取
 * 默认使用插件 $local 用于存储 那边配置什么 这边按什么存储
 * @class UCache
 * @author xierenhong
 */
export default class UCache {
  constructor(options = {}) {
    this.map = new Map()
    this.local = Local(options)

    // 默认时间
    this.maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC')
    this.defaultExpire = this.maxExpireDate
    // 如果有登录用户呢 则删除 T00000001
    if (this.getUserId() !== 'T00000001') {
      this.clear('u-cache-T00000001')
    }
  }

  /**
   *
   * 根据key 获取value 值
   * @param {any} key
   * @returns 返回 获取到的value 如果获取不到则返回null
   * @memberOf UCache
   */
  get(key) {
    let _key = this._getKey(key)
    let value = this.map.get(_key)
    if (value) {
      let timeNow = (new Date()).getTime()
      return timeNow < value.expires ? value.value : null
    } else {
      return this.local.get(_key)
    }
  }

  /**
   * 存储新值
   * @param {String} key [必填]唯一建key 用于取key
   * @param {any} value [必填] 存储的数据
   * @param {any} exp 过期时间 默认无限大 可以为s 以可以是时间
   *
   * @memberOf UCache
   */
  set(key, value, exp) {
    let _key = this._getKey(key)
    if (value === undefined) {
      return this.delete(_key)
    }
    this.map.set(_key, this._getValue(value, exp))
    this.local.set(_key, value, {exp: exp})

    // 记录下当前的key 值用于 clear 使用
    let uKey = this.getUKey()
    let uKeyNames = this.local.get(uKey)
    this.local.set(uKey, uKeyNames === null ? uKeyNames + `,${_key}` : _key, {exp: exp})
  }

  /**
   *
   * 删除 一个存储
   * @param {any} key [必填] 唯一key
   *
   * @memberOf UCache
   */
  delete(key) {
    let _key = this._getKey(key)
    if (this.map.has(_key)) {
      this.map.delete(_key)
    }
    if (this.local.get(_key)) {
      this.local.delete(_key)
    }
  }

  deleteAllExpires() {
    this.local.deleteAllExpires()
  }

  /**
   * 清空所有
   * @memberOf UCache
   */
  clear(ukey) {
    let uKey = ukey || this.getUKey()
    if (uKey === null) {
      return
    }
    let uKeyNames = this.local.get(uKey)
    if (uKeyNames === null) {
      return
    }
     // 去重复
    let arr = [...new Set(uKeyNames.split(','))]
    arr.forEach(item => {
      this.local.delete(item)
    })
    this.map.clear()
  }

  /**
   * 获取存储 keyname 的 key
   * @returns
   * @memberOf UCache
   */
  getUKey() {
    return `u-cache-${this.getUserId()}`
  }

  /**
   *
   * 获取店铺信息 => vuex 用
   * @returns 返回店铺信息
   * @memberOf UCache
   */
  getStore() {
    return this.local.get('store') || {}
  }

  /**
   *
   * 获取当前登录的用户id
   * @returns 返回用户id 如果取不到当前的用户id 则返回 T00000001
   *
   * @memberOf UCache
   */
  getUserId() {
    return cookie.get('user_id') || 'T00000001'
  }

  /**
   *
   * 获取重新组的key
   * 如果key 不是string 类型 的转为string 类型
   * @param {String} key [必填]
   * @returns 返回重组后的key
   *
   * @memberOf UCache
   */
  _getKey(key) {
    if (typeof key !== 'string') {
      console.warn(key + ' used as a key, but it is not a string.')
      key = String(key)
    }
    let userId = this.getUserId()
    if (!userId) {
      // throw new Error('`user_id` 取不到,u.cache插件只允许在登录状态下的页面使用')
      console.error('`user_id` 取不到,u.cache插件只允许在登录状态下的页面使用')
    }
    return `${userId}-${key}`
  }

  /**
   *
   * 获取转化后的value
   * @param {any} value 存储的value
   * @param {any} exp 过期时间
   *
   * @memberOf UCache
   */
  _getValue(value, exp) {
    let time = (new Date()).getTime()
    let _exp = exp || this.defaultExpire
    let _expires = this._getExpiresDate(_exp)
      // expiresTime
    let expTime = _expires.getTime()

    return { c: time, expires: expTime, value: value }
  }

  _isValidDate(date) {
    return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())
  }

  /**
   *
   * 获取过期时间
   * @param {any} expires [必填] 可以为 秒或者时间
   * @param {any} now [非必填] 当前时间
   * @returns 返回过期时间
   *
   * @memberOf UCache
   */
  _getExpiresDate(expires, now) {
    let _now = now || new Date()
    if (typeof expires === 'number') {
      expires = expires === Infinity ? this.maxExpireDate : new Date(_now.getTime() + (expires * 1000))
    } else if (typeof _expires === 'string') {
      expires = new Date(expires)
    }
    if (expires && !this._isValidDate(expires)) {
      throw new Error('`expires` parameter cannot be converted to a valid Date instance')
    }
    return expires
  }

}
