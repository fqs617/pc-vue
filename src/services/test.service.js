import {get} from 'http'
export default class TestService {
  getHome() {
    return get('stores/homePage', {store_id: 63001, p9: 'wap'})
  }
}
