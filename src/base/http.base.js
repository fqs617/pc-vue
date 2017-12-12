import { API_HOST } from '@/config/global.config'
import fetch from '@/config/axios.config'

const DEFAULT_CONFIG = {
  isAutoMsg: true
}

/**
 * get 提交
 * @param {String} url 请求的url
 * @param {any} params  请求的参数
 * @param {Boolean} isApiHost  是否添加前缀 默认是true
 * @param {Obejct} config  请求配置
 * @returns Promise
 */
export function get(url, params = {}, isApiHost = true, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...config}
  opts.params = params
  return fetch.get(getUrl(url, isApiHost), opts)
}

/**
 *
 * post 提交
 * @param {String} url 请求的url
 * @param {any} [params={}] 请求的参数
 * @param {Boolean} isApiHost 是否添加前缀 默认是true
 * @param {any} isApiHost 请求配置
 * @returns Promise
 *
 * @memberOf HttpBase
 */
export function post(url, params = {}, isApiHost = true, config) {
  let opts = {...DEFAULT_CONFIG, ...config}
  return fetch.post(this.getUrl(url, isApiHost), params, opts)
}

/**
 *
 * url 处理如果 isApiHost 为true 则添加 API_HOST
 * @param {any} url
 * @param {any} isApiHost
 * @returns
 *
 */
function getUrl(url, isApiHost) {
  if (!isApiHost) {
    return url
  }
  let arr = [API_HOST]
  arr.push(url)
  return arr.join('')
}
