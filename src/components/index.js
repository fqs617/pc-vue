// import bqGoodsContent from '@/components/goods/goods.content.vue'
// import bqGoodsItem from '@/components/goods/goods.item.vue'
// import bqShareCoupon from '@/components/share.coupon/share.coupon.vue'
import Base from './base.vue'

const install = (Vue) => {
  if (install.installed) {
    return
  }
  // Vue.component(bqGoodsContent.name, bqGoodsContent)
  // Vue.component(bqGoodsItem.name, bqGoodsItem)
  // Vue.component(bqShareCoupon.name, bqShareCoupon)
  Vue.component(Base.name, Base)

  Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
  Vue.$$loadingImgSrc = Vue.prototype.$$loadingImgSrc = 'http://static.js.bqmart.cn/static/img/l.gif'

}
export default {
  install
}
