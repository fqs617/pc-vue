import WebStorageCache from 'web-storage-cache'
import { VERSION } from '@/config/global.config'
import assign from 'lodash.assign'

/**
 * 本地存储
 * @param {String} [options.storage] 存储的仓库 默认是 localStorage [可选] 'localStorage',
 *  'sessionStorage', window.localStorage, window.sessionStorage
 * @param {Number} [options.exp] 默认 exp: Infinity 无限大
 */
const local = (options = {}) => {
  let defaultOpts = {
    storage: 'localStorage',
    exp: 604800, // 设置了 默认7天的过期 时间 Infinity 代表无限大
    key: `bq-saar-${VERSION}-`
  }
  let opt = assign(defaultOpts, options)
  let wsCache = new WebStorageCache(opt)
  return {
    isSupported() {
      return wsCache.isSupported()
    },
    /**
     * 根据key获取缓存中未超时数据。
     * @param {String} key
     * @returns 返回相应类型String、Boolean、PlainObject、Array的值。
     */
    get(key) {
      return wsCache.get(this.getKey(key))
    },
    /**
     * 往缓存中插入数据
     * @param {String} key  [必填] 必须要为String类型。
     * @param {any} value  [必填] 支持所以可以JSON.parse 的类型。注：当为undefined的时候会执行 delete(key)操作
     * @param {any} [opts={}]  options [选填] js对象，包含两个属性 exp 和 force
     * @param {Number} [opts.exp] [选填] 类型Number。超时时间，秒。默认无限大。
     * @param {Boolean} [opts.force] [选填] 类型Boolean,为true时：当超过最大容量导致无法继续插入数据操作时，先清空缓存中已超时的
     * @desc this.$local.set('username', 'wqteam', {exp : 100})
     */
    set(key, value, opts = { exp: defaultOpts.exp }) {
      wsCache.set(this.getKey(key), value, opts)
    },
    /**
     * 根据key删除缓存中的值
     * @param {String} key [必填] 必须要为String类型
     */
    delete(key) {
      wsCache.delete(this.getKey(key))
    },
    /**
     * 删除缓存中所有通过WebStorageCache存储的超时值。
     */
    deleteAllExpires() {
      wsCache.deleteAllExpires()
    },
    /**
     * 清除客户端中所有缓存
     */
    clear() {
      wsCache.clear()
    },
    /**
     * 为已存在的（未超时的）缓存值设置新的超时时间
     * @param {String} key 存储的keyname
     * @param {any} exp [必填] number 单位：秒 js对象包含exp属性（以当前时间为起点的新的超时时间）
     */
    touch(key, exp) {
      wsCache.touch(this.getKey(key), exp)
    },
    /**
     * 如果缓存中没有key为username2的缓存，则添加username2。反之什么都不做 wsCache.add('username2', 'wqteam', {exp : 1})
     * 根据key做插入操作，如果key对应的值不存在或者已超时则插入该值，反之什么都不做。 注：不是通过WebStorageCache插入的值也会当作失效的值，依然执行add操作
     * @param {String} key  username2
     * @param {any} value wqteam
     * @param {any} opts  {exp : 1} 1单位是 秒
     */
    add(key, value, opts = {}) {
      wsCache.add(this.getKey(key), value, opts)
    },
    /**
     * 如果缓存中有key为username的缓存，则替换为新值。反之什么都不做
     * 根据key做插入操作，如果key对应的值存在并且未超时则插入该值，反之什么都不做
     * 注：超时时间以当前时间为基准重新设置
     * @param {String} key
     * @param {any} value
     * @param {any} [opts={}]
     */
    replace(key, value, opts = {}) {
      wsCache.replace(this.getKey(key), value, opts)
    },
    getKey(key) {
      return `${opt.key}${key}`
    }
  }
}

export default local
