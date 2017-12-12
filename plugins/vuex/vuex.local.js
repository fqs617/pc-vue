import assign from 'lodash.assign'
import UCache from '../u.cache/u.cache'
/**
 *
 * Vuex缓存插件 缓存 vuex 的内容
 * 默认使用插件 $local 用于存储 那边配置什么 这边按什么存储
 * @class VuexLocal
 * @author xierenhong
 */
class VuexLocal {
  constructor(isStore) {
    this.isStore = isStore
    this.uCache = new UCache()
    this.uCache.deleteAllExpires()
  }

  get(states) {
    let nStatus = {}
    // 如果未登陆 不进行存储操作
    if (this._noUser()) {
      return nStatus
    }
    for (let state in states) {
      let val = this.uCache.get(this.getKey(state))
      if (val) {
        nStatus[state] = val
      }
    }
    return nStatus
  }

  set(states) {
    // 如果未登陆 不进行存储操作
    if (this._noUser()) {
      return
    }
    let now = new Date()
    // 设置了一天的过期时间 默认缓存一天
    now.setDate(now.getDate() + 1)
    for (let state in states) {
      this.uCache.set(this.getKey(state), states[state], now)
    }
  }

  getKey(key) {
    let isStoreId = this.isStore.indexOf(key) !== -1
    return isStoreId ? `VUEX-d${this.getStoreId()}-${key}` : `VUEX-${key}`
  }

  _noUser() {
    // 未登陆 赋值用户ID 为 T00000001
    return this.uCache.getUserId() === 'T00000001'
  }

  getStoreId() {
    return this.uCache.getStore().store_id || 'STORE00001'
  }

}

export default function VuexLocalPlugin({
  paths = [],
  merge = defaultMerge,
  reducer = defaultReducer,
  isStore = [],
  // 匹配一些 mutations 名字 只在 这些 执行更新操作是更新local 操作
  mutationsReg = /_ORDERS_|^ORDERS_|_ORDERS$|_DEVICE/
} = {}) {
  let local = new VuexLocal(isStore)
  let reg = new RegExp(mutationsReg)
  return store => {
    let { state } = store
    let localState = local.get(reducer(state, paths))
    // 初始化时赋值
    store.replaceState(merge(state, localState))

    store.subscribe((mutation, state) => {
      let {type, payload} = mutation
      // 此规则 只处理 订单
      if (/_ORDERS_|^ORDERS_|_ORDERS$/.test(type) && payload && payload.storeId !== local.getStoreId()) {
        return
      }
      // 只对特定的一些 state 更新操作进行存储 避免频繁进行set 操作
      if (reg.test(type)) {
        local.set(reducer(state, paths))
      }
    })
  }
}

function defaultMerge(...args) {
  return assign({}, ...args)
}

function defaultReducer(state, paths) {
  return paths.length === 0 ? state : paths.reduce((substate, path) => {
    if (state.hasOwnProperty(path)) {
      return assign(substate, {
        [path]: state[path]
      })
    }
    return substate
  }, {})
}
