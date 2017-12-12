// 默认加载 loading 遮罩
import { UPDATE_LOADING, SET_FIRST_LOADING_STATE } from '../mutation.types'

const state = {
  isLoading: false,
  isLoadingTop: 44,
  isLastLoading: {}
}

const mutations = {
  [UPDATE_LOADING](state, value) {
    state.isLoading = value.isLoading
    state.isLoadingTop = value.isLoadingTop
  },
  [SET_FIRST_LOADING_STATE](state, value) {
    // 第一次进入路由 时 设为true  下一次 则不加载loading
    state.isLastLoading[value] = true
  }
}

export default {
  state,
  mutations
}
