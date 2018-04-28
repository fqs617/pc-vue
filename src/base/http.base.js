import { API_HOST } from '@/config/global.config'
import fetch from '@/config/axios.config'
import encrypt from '@/lib/crypto/encrypt.js'
import qs from 'qs'
import cookie from 'arale-cookie'

const DEFAULT_CONFIG = {
  isAutoMsg: true,
  // 自动loading
  isLoading: true,
  hasUid: true,
  // isApiHost  是否添加前缀 默认是true
  isApiHost: true
}

let token = '6qvlkh6khz'
const POST_HEADER = {
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
}
/**
 * get 提交
 * @param {String} url 请求的url
 * @param {any} params  请求的参数
 * @param {Boolean} isApiHost  是否添加前缀 默认是true
 * @param {Obejct} config  请求配置
 * @returns Promise
 */
export function get(url, params = {}, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...config}
  console.log(params)
  let uid = cookie.get('uid')
  let pToken = ''
  if (uid && opts.hasUid) {
    params.uid = uid
    pToken = cookie.get('token') || token
  } else {
    pToken = token
  }
  opts.params = encrypt.sign(params, pToken)
  return fetch.get(getUrl(url, opts.isApiHost), opts)
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
export function post(url, params = {}, config = {}) {
  let opts = {...DEFAULT_CONFIG, ...config, ...POST_HEADER}
  let uid = cookie.get('uid')
  let pToken = ''
  if (uid && opts.hasUid) {
    params.uid = uid
    pToken = cookie.get('token') || token
  } else {
    pToken = token
  }
  params = encrypt.sign(params, pToken)
  return fetch.post(getUrl(url, opts.isApiHost), qs.stringify(params), opts)
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
