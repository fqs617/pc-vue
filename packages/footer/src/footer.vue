<template>
  <footer class="bq-footer">
    <slot></slot>
  </footer>
</template>
<script>
export default {
  name: 'bq-footer'
}
</script>

<style lang="scss">
  @import 'scss/variables.scss';
  .bq-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    height: $footer-height;
    width: 100%;
    z-index: 2;
    .mint-button {
      height: 100%;
    }
  }
</style>
