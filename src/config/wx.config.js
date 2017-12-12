import Raven from 'raven-js'
/**
 * 微信配置
 * @export
 * @class WxConfig
 */
export default class WxConfig {

  /**
   * 初始化微信配置
   * @returns Promise 返回拉取到的 认证信息
   * @memberOf WxConfig
   */
  async init(url = window.location.href) {
    try {
      let res = await this.WechatService.getJsApiSign({url: url})
      wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: this.getJsApiList()
      })
      wx.ready(() => {
        // 隐藏刷新按钮
        wx.hideMenuItems({
          menuList: ['menuItem:openWithQQBrowser', 'menuItem:openWithSafari']
        })
      })
      wx.error(res => {
        Raven.captureMessage('微信 error', {level: 'error', logger: 'weixin.error', extra: res})
      })
      return res
    } catch (error) {
      Raven.captureException(error)
      return error
    }

  }

  /**
   * 返回网络类型2g，3g，4g，wifi
   * @returns Promise
   * @memberOf WxConfig
   */
  getNetworkType() {
    return new Promise((resolve, reject) => {
      wx.ready(() => {
        wx.getNetworkType({
          success: res => {
            // 返回网络类型2g，3g，4g，wifi
            resolve(res.networkType)
          },
          fail(res) {
            reject(res)
          }
        })
      })
    })
  }

  /**
   *
   * 选择图片
   * @returns 返回调用成功后的 localIds
   * @memberOf WxConfig
   */
  chooseImage() {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          resolve(res)
        },
        fail(res) {
          Raven.captureMessage('微信选择图片出错', {level: 'info', logger: 'weixin.error', extra: res})
          window.alert(JSON.stringify(res))
          reject(res)
        }
      })
    })
  }

  /**
   *
   * 上传图片
   * @returns 返回图片的服务器端ID serverId
   *
   * @memberOf WxConfig
   */
  uploadImage(localId) {
    return new Promise((resolve, reject) => {
      wx.uploadImage({
        localId: localId,
        isShowProgressTips: 1,
        success(res) {
          resolve(res)
        },
        fail(res) {
          Raven.captureMessage('微信上传图片出错', {level: 'info', logger: 'weixin.error', extra: res})
          reject(res)
        }
      })
    })
  }

  /**
   *
   * 调起微信扫一扫
   * @param {Number} needResult 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
   * @param {Array} scanType 可以指定扫二维码还是一维码，默认二者都有
   * @returns 返回得到的结果
   * @memberOf WxConfig
   */
  scanQRCode(needResult = 1, scanType = ['qrCode', 'barCode']) {
    return new Promise((resolve, reject) => {
      wx.scanQRCode({
        needResult: needResult,
        scanType: scanType,
        success(res) {
          resolve(res)
        },
        fail(res) {
          Raven.captureMessage('微信调起扫一扫出错', {level: 'info', logger: 'weixin.error', extra: res})
          window.alert(JSON.stringify(res))
          reject(res)
        }
      })
    })
  }

  getJsApiList() {
    return [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'uploadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'menuItem:openWithQQBrowser',
      'menuItem:openWithSafari'
    ]
  }

};
