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
    !this.$html.hasClass('bq') && this.$html.addClass('bq')
  },
  beforeDestroy() {
    this.$html.hasClass('bq') && this.$html.removeClass('bq')
  }
}
</script>
<style lang="scss" >
  %content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .bq {
    @extend %content;
    body, #app {
      @extend %content;
    }
  }
  .bq-page {
    @extend %content;
  }
</style>
