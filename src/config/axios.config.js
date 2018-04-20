import Vue from 'vue'
import axios from 'axios'
// import store from '@/stores'

/**
 * 请求配置
 * @see https://github.com/mzabriskie/axios
 */

const service = axios.create({
  timeout: 60000000,                  // 请求超时时间
  withCredentials: true          // 跨域
})
// loading 组
let ARR_LOADING = []
let IS_LOADING = false
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
service.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.user.token) {
  //   // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  //   config.headers['X-Token'] = store.user.token
  // }
  if (config.isLoading) {
    if (!IS_LOADING) {
      ARR_LOADING.push(config.url)
      IS_LOADING = true
      Vue.$indicator.open()
    }
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    let {data: {code, message, data}, config} = response
    if (config.isLoading) {
      let index = ARR_LOADING.indexOf(config.url)
      ARR_LOADING.splice(index, 1)
      if (ARR_LOADING.length === 0) {
        Vue.$indicator.close()
        IS_LOADING = false
      }
    }
    // 如果不是code 返回值
    if (Vue.bqUtils.isUndefined(code)) {
      return response.data
    }
    if (code !== '0') {
      // 登录失效时移除cookie
      if (code === 'TOKENINVALID_999') {
        Vue.$messagebox.alert(message).then(() => {
          let arr = ['uid', 'token', 'uname']
          bq.isDevelopment && arr.push('openid')
          arr.forEach(key => {
            Vue.cookie.set(key, null, {
              path: '/',
              expires: new Date(0)
            })
          })
          window.location.reload()
        })
        return
      }
      // 是否自动提示消息
      if (config.isAutoMsg) {
        Vue.$messagebox.alert(message)
      }
      return Promise.reject({code, data, message}) // eslint-disable-line
    } else {
      return data
    }
  },
  error => {
    if (error.message !== undefined) {
      // 所有非 200 的请求的提示此错误 如果是业务逻辑的错误消息 请走200状态
      Vue.$messagebox.alert('网络异常, 请刷新重试')
      ARR_LOADING = []
      Vue.$indicator.close()
      IS_LOADING = false
    }
    return Promise.reject(error)
  }
)

export default service
