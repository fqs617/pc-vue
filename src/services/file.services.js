import {get} from 'http'
export default class TestService {
  getHome() {
    return get('buyer/goods/list', {store_id: 63001, p9: 'wap'})
  }
  getList(params = {}) {
    return get('buyer/order/list', params, {isLoading: false})
  }
}
