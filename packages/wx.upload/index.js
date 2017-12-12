import WxUpload from './src/wx.upload.vue'

WxUpload.install = function(Vue) {
  Vue.component(WxUpload.name, WxUpload)
}

export default WxUpload
