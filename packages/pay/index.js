import Pay from './src/pay'

const install = (Vue) => {
  Vue.$pay = Vue.prototype.$pay = Pay
}

export default {
  install,
  Pay
}
