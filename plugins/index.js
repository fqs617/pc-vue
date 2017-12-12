import Bq from './bq/bq'
import Cookie from './cookie/cookie'
import Device from './device/device'
import LocalStorage from './local'
import Log from './log/log'
import Session from './session/session.storage'
import UCache from './u.cache'
import Utils from './utils'
const install = function(Vue) {
  Vue.use(Bq)
  Vue.use(Cookie)
  Vue.use(Device)
  Vue.use(LocalStorage)
  Vue.use(Session)
  Vue.use(UCache)
  Vue.use(Utils)
}
export default {
  install,
  Log
}
