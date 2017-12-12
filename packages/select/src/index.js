import Vue from 'vue'
let SelectConstructor = Vue.extend(require('./select.vue'))
let instance
let instances = []
let seed = 1

let Select = function(options = {}) {
  let id = 'select_' + seed++
  options.isJsShow = true
  instance = new SelectConstructor({
    data: options
  })
  let userOnClose = options.onClose

  options.close = function() {
    Select.close(id, userOnClose)
  }
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.open()
  instance.dom = instance.vm.$el
  instances.push(instance)
}

Select.close = function(id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    let instance = instances[i]
    if (id === instance.id) {
      if (Vue.bqUtils.isFunction(userOnClose)) {
        userOnClose(instance)
      }
      instances.splice(i, 1)
      break
    }
  }
}

export default Select
