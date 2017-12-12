import MessageBox from './src/messagebox'

const install = function(Vue) {
  Vue.$messagebox = Vue.prototype.$messagebox = new MessageBox()
}

export default {
  install,
  MessageBox
}
