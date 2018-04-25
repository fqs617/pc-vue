<template>
  <div class="my-view">
    <bq-header title="我的" :isLeftIcon="true"></bq-header>
    <bq-content>
      <div class="top">
        <img src="../../../assets/img/my/chahua.png" alt="">
        <p><i>姓名</i><i class="no-register">未认证</i></p>
        <div class="re-gister" @click="goRegister()">为了保证电子签名有效，请前往个人实名登记 ></div>
      </div>
      <bq-card>
        <bq-card-item padding no-margin :icon="true" :href="'/me/coupon'">
          <i class="wallet"></i>
          到期提醒
        </bq-card-item>
      </bq-card>
      <!-- <div class="btn">
        <bq-button type="primary" size="large" @click="onExit">退出</bq-button>
      </div> -->
    </bq-content>
  </div>
</template>
<script>
// import MyService from '@/services/my.service'
// import UserService from '@/services/user.service'
export default {
  data() {
    return {
      info: []
    }
  },
  mounted () {
    // this.MyService = new MyService()
    // this.UserService = new UserService()
    this.getMyInfo()
  },
  methods: {
    async getMyInfo() {
      try {
        let res = await this.MyService.getMyInfo()
        this.info = res
      } finally {
        this.$store.commit('UPDATE_LOADING', { isLoading: false })
      }
    },
    onExit() {
      this.$messagebox.confirm('您确定要退出吗？', '').then(() => {
        this.logout()
      }).catch(() => {
      })
    },
    async logout () {
      let arr = ['uid', 'token', 'uname']
      arr.forEach(key => {
        this.$cookie.set(key, null, {
          path: '/',
          expires: new Date(0)
        })
      })
      await this.UserService.loginOut({})
      bq.isDevelopment && arr.push('openid')
      arr.forEach(key => {
        this.$cookie.set(key, null, {
          path: '/',
          expires: new Date(0)
        })
      })
      window.location.reload()
    },
    goRegister () {
      this.$router.push('/my/info/set')
    }
  }
}
</script>
<style lang="scss" scoped>
@import './my.scss';
.bq-content {
  top: 0;
}
</style>
