import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import device from './modules/device'
import loading from './modules/loading'
import createLogger from 'vuex/dist/logger'
import VuexLocalPlugin from 'plugins/vuex/vuex.local'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let localConfig = VuexLocalPlugin({
  paths: ['device', 'order'],
  // 根据店铺独有
  isStore: ['order'],
  mutationsReg: /_ORDERS_|^ORDERS_|_ORDERS$|_DEVICE/
})

const plugins = debug ? [createLogger(), localConfig] : [localConfig]

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    device,
    loading
  },
  strict: debug,
  plugins: plugins
})
