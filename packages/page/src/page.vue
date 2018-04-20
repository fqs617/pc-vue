<template>
  <main class="bq-page">
    <slot></slot>
  </main>
</template>
<script>
export default {
  name: 'bq-page',
  mounted() {
    this.$html = $('html')
    !this.$html.data('bq') && this.$html.data('bq', true)
  },
  beforeDestroy() {
    // 针对 首页 订单 我的 单独处理下
    let arr = ['home', 'file', 'me']
    if (arr.indexOf(this.$route.name) === -1) {
      this.$html.data('bq') && this.$html.removeAttr('data-bq')
    }
  }
}
</script>
<style lang="scss" >
  %content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  html[data-bq] {
    @extend %content;
    body, #app {
      @extend %content;
    }
  }
  .bq-page {
    @extend %content;
  }
</style>
