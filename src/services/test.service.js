import {get} from 'http'
export default class TestService {
  getHome(params = {}) {
    // return get('stores/homePage', {store_id: 63001, p9: 'wap'})
    return get('buyer/order/list', params, {isLoading: false})
  }
}
