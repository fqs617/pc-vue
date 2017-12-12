import Vue from 'vue'
import axios from 'axios'
// import store from '@/stores'

/**
 * 请求配置
 * @see https://github.com/mzabriskie/axios
 */

const service = axios.create({
  timeout: 5000,                  // 请求超时时间
  withCredentials: true          // 跨域
})

service.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.user.token) {
  //   // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  //   config.headers['X-Token'] = store.user.token
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    let {data: {code, message, data}} = response
    // 如果不是code 返回值
    if (Vue.bqUtils.isUndefined(code)) {
      return response.data
    }
    if (code !== 0) {
      Vue.$messagebox.alert(message)
      // 别的一些逻辑处理
      return Promise.reject(message)
    } else {
      return data
    }
  },
  error => {
    console.log('err' + error)
    Vue.$messagebox.alert(error.message)
    return Promise.reject(error)
  }
)

export default service
