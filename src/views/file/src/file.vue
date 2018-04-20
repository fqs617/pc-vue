<template>
<bq-page class="bq-page-search">
  <!-- <bq-header title="电子合同">
    <router-link to="/" slot="left">
      <i class="bq-font bq-ion-fanhui"></i>
    </router-link>
  </bq-header> -->
  <bq-header title="电子合同"></bq-header>
</bq-page>
</template>
<script>
import TestService from '@/services/test.service'
export default {
  data () {
    return {
    }
  },
  created() {
    this.TestService = new TestService()
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    onScroll(e) {
      console.log(e)
    }
  },
  updated () {
  },
  beforeDestroy () {
  },
  watch: {
  }
}
</script>
<style lang="scss">
.bq-page-search{
}
</style>
