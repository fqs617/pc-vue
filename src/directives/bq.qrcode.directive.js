import Raven from 'raven-js'
import WxConfig from '@/config/wx.config'
const qrcodeHander = '@@bqQrcodeHander'
const wxConfig = new WxConfig()
/**
 * 二维码扫描通用逻辑处理
 */
export default {
  bind(el, binding, vnode) {
    let vm = vnode.context
    let expression = binding.value
    const hannder = async () => {
      if (!vm.$device.isWechat) {
        vm.$messagebox.alert('请在微信下打开！')
        expression && expression()
        return
      }
      let res = await wxConfig.scanQRCode()
      let {resultStr} = res
      switch (true) {
        case resultStr.indexOf('BQFACE') !== -1:
          let orderId = resultStr.replace(/[^0-9]/ig, '')
          vm.$router.push(`settlement/${orderId}`)
          break
        default:
          try {
            //  写逻辑
            let [sku] = /\d{13}/.exec(resultStr)
            let goodsRes = await sku
            let {code, data: [good]} = goodsRes
            if (code !== 0) {
              vm.$messagebox.alert('无此商品')
              expression && expression()
              return
            }
            vm.$router.push(`goods/detail/${good.spec_id}`)
          } catch (e) {
            Raven.captureException(e)
            console.error(e)
            expression && expression()
          }
      }
    }
    vm.$nextTick(() => {
      el[qrcodeHander] = {
        hannder,
        vm: vm
      }
      el.addEventListener('click', el[qrcodeHander].hannder)
    })
  },
  unbind(el) {
    el[qrcodeHander].hannder && el.removeEventListener('click', el[qrcodeHander].hannder)
  },
  install(Vue) {
    Vue.directive('bqQrcode', {
      bind: this.bind
    })
  }
}
