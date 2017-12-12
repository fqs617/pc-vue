<template>
  <bq-page class="native-demo">
    <bq-header title="Native 交互测试">
      <router-link to="/" slot="left">
        <i class="bq-font bq-ion-fanhui"></i>
      </router-link>
    </bq-header>
    <bq-content>
      <br>
      <bq-button  type="primary" size="large" @click="onNative('couponList')">打开红包</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('orderList', 'order')">打开订单页面</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('credit')">贝壳页面</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('signIn')">签到页面</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('recharge')">充值页面</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('login')">登录</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('userInfo', 'user')">回传用户信息</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('back')">返回</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('goodDetail', 'detail')">商品详情页面</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('synCart', 'cart')">同步购物车</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('home')">首页</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('superMarket')">闪送超市</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('cartList')">购物车</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('center')">个人中心</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('openWeb', 'open')">openWeb</bq-button>
      <br>
      <bq-button type="primary" size="large" @click="onNative('share', 'share')">分享</bq-button>
      <br>
    </bq-content>
  </bq-page>
</template>
<script>
  export default {
    created() {

    },
    methods: {
      onNative(methods, type) {
        let BeiquanJSBridge = window.BeiquanJSBridge || null
        this.$messagebox.alert(BeiquanJSBridge)
        this.$device.nativeBridge(methods, this.getParams(type))
      },
      getParams(type = 'default') {
        switch (type) {
          case 'order':
            return {status: 0}
          case 'user':
            return {
              user_id: '13718244823',
              access_token: 'e3remmjsagl3cd6gb0e09u7gb5',
              user_name: '回传测试'
            }
          case 'detail':
            return {
              store_id: '63001',
              spec_id: '322358'
            }
          case 'cart':
            return {
              spec_id: '322358',
              act_id: '',
              type: 0,
              quantity: 10,
              goods_id: '322358'
            }
          case 'open':
            return {
              url: 'http://www.baidu.com'
            }
          case 'share':
            return {
              url: 'http://m.bqmart.cn/#/goods/detail/322358'
            }
          default:
            return {}
        }
      }
    }
  }
</script>
<style lang="scss">
  .native-demo {
    .bq-content .scroller {
      padding: 0 40px;
    }
  }
</style>
