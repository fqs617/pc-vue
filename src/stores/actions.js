import {SET_DEVICE} from './mutation.types'
import { isWeixinBrowser } from '@/utils/utils'
import WxConfig from '@/config/wx.config'

let wxConfig = new WxConfig()
  // 初始化微信
export const initWx = async({ commit }, url) => {
  try {
    let screen = window.screen
    let p6 = screen.height + '*' + screen.width
    if (isWeixinBrowser()) {
      await wxConfig.init(url)
      let networkType = await wxConfig.getNetworkType()
      commit(SET_DEVICE, {
        p6: p6,
        p5: networkType
      })
    } else {
      commit(SET_DEVICE, { p6: p6 })
    }
  } catch (err) {
    console.log(err)
  }
}
