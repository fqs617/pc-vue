import Vue from 'vue'
import PayVue from './pay.vue'
const PayVueConstructor = Vue.extend(PayVue)
let instance
let currentMsg
let msgQueue = []

const defaultCallback = (action, inputVal) => {
  if (currentMsg) {
    if (currentMsg.resolve) {
      if (action === 'confirm') {
        currentMsg.resolve({ value: inputVal, action })
      } else if (action === 'cancel' && currentMsg.reject) {
        instance.inputVal = []
        currentMsg.reject(action)
      }
    }
  }
}

let Pay = function(options = {}, callback) {
  return new Promise((resolve, reject) => { // eslint-disable-line
    msgQueue.push({
      callback: callback,
      resolve: resolve,
      reject: reject
    })
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift()
      // instance 不做缓存
      instance = instance || new PayVueConstructor()
      instance.vm = instance.$mount()
      // 初始化时密码框 设置为 空
      instance.callback = defaultCallback
      instance.inputVal = []
      if (!instance.value || instance.closeTimer) {
        document.body.appendChild(instance.vm.$el)
        Vue.nextTick(() => {
          instance.currentVal = true
        })
      }
    }
  })
}

Pay.close = () => {
  Vue.nextTick(() => {
    if (instance) {
      instance.currentVal = false
    }
  })
}

export default Pay
