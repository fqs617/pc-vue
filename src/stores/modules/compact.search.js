import {
  GET_SEARCH_STATUS
} from '../mutation.types'
const state = {
  searchParams: {
    type: 1,
    parameter: '',
    startTime: '',
    endTime: ''
  }
}

const mutations = {
  [GET_SEARCH_STATUS](state, value) {
    state.searchParams = value.params
  }
}

export default {
  state,
  mutations
}
