<template>
<bq-page>
  <bq-header title="home">
    <router-link to="/" slot="left">
      <i class="bq-font bq-ion-fanhui"></i>
    </router-link>
  </bq-header>
  <bq-content ref="content" @scroll="onScroll" class="bg">
  111
  </bq-content>
</bq-page>
</template>
<script>
import WxConfig from '@/config/wx.config'
import TestService from '@/services/test.service'
export default {
  data () {
    return {
      select: null,
      select2: null,
      uploadValues: ''
    }
  },
  created() {
    this.TestService = new TestService()
    this.TestService.getHome().then(res => {
      console.log(res)
    })
  },
  mounted () {
    this.WxConfig = new WxConfig()
  },
  computed: {
  },
  methods: {
    onSuccess(val) {
      this.uploadValues = val
    },
    onScroll(e) {
      console.log(e)
    }
  },
  updated () {
  },
  beforeDestroy () {
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
.bg {
  background-color: $bg-color;
}
.del {
  background: #FFF2B2;
  border: 0 solid #CCCCCC;
}
</style>
