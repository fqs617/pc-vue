import Select$ from '../select/src'

const install = (Vue) => {
  Vue.$select = Vue.prototype.$select = Select$
}

export default {
  install,
  Select$
}
