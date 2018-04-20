import {get} from 'http'
export default class WxService {
  /**
   *
   * 获取签名
   * @param {any} [params={
   *     url: window.location.href
   *   }]
   * @returns Promise
   * @memberof WxService
   */
  getSign(params = {
    url: window.location.href
  }) {
    return get('wechat/base/jsapi/getsign', params, {isLoading: true, isAutoMsg: false})
  }

  /**
   *
   * 获取上传到 七牛云后的 图片地址
   * @param {any} params.mediaIds 图片id
   * @returns
   * @memberof WxService
   */
  getTmpMediaUrl(params) {
    return get('wechat/base/get/tmpMediaUrl', params)
  }

  /**
   *
   * 获取前端 微信授权重定向url
   * @param {any} url 授权url
   * @memberof WxService
   */
  getOauthUrl(url) {
    // let baseUrl = bq.isProductionAPI ? 'http://m.yuncai.bqmart.cn/' : 'http://test.illidan.bqmart.cn/'
    // return get('wechat/front/to/oauth', {url: `${baseUrl}${url}`})
    return get('wechat/front/to/oauth', {url: url})
  }

  /**
   *
   * 获取openid
   *
   * @param {any} code 微信重定向后获取到的code
   * @returns 返回获取到的 open id
   * @memberof WxService
   */
  getOpenId(code) {
    return get('wechat/front/process/oauth', {code: code})
  }
};
