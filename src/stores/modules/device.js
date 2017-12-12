import {SET_DEVICE} from '../mutation.types'
const state = {
  // 设备信息 p5 设备类型 通过微信获取 p6 项目宽高
  device: {
    p9: 'wap',
    p10: 'wap'
  }
}

const mutations = {
  [SET_DEVICE](state, value) {
    state.device = {
      ...state.device,
      ...value
    }
  }
}

export default {
  state,
  mutations
}
