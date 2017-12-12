export default {
  methods: {
    /**
     * 调起支付
     * @param {any} [params.timestamp]
     * @param {any} [params.nonceStr]
     * @param {any} [params.package]
     * @param {any} [params.signType]
     * @param {any} [params.paySign]
     */
    chooseWXPay(params = {}) {
      WeixinJSBridge.invoke('getBrandWCPayRequest', params, res => {
        let errMsg = res.err_msg
        this.$messagebox.alert(errMsg)
        switch (errMsg) {
          // 支付成功
          case 'get_brand_wcpay_request:ok':
            break
            // 支付过程中用户取消
          case 'get_brand_wcpay_request:cancel':
            break
            // 支付失败
          case 'get_brand_wcpay_request:fail':
            break
        }
      })
    }
  }
}
