
import {MessageBox} from 'mint-ui'

const defaultOpts = {
  confirmButtonText: '知道了'
}
/**
 *
 * 通用消息
 * @class MessageBox
 */
class BqMessageBox {
  constructor() {
    this.$messagebox = MessageBox
  }

  alert(msg, title, options = defaultOpts) {
    return this.$messagebox.alert(msg, title, options)
  }
  confirm(msg, title, options = {}) {
    return this.$messagebox.confirm(msg, title, options)
  }

  prompt(msg, title, options = defaultOpts) {
    return this.$messagebox.prompt(msg, title, options)
  }

  close() {
    this.$messagebox.close()
  }
};
export default BqMessageBox
