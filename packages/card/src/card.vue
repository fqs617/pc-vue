<template>
  <div class="bq-card">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'bq-card'
  }
</script>
<style lang="scss" scoped>
  @import 'scss/variables.scss';
  @import 'scss/mixin.scss';
  .bq-card {
    background-color: #fff;
    border-radius: 8px;
    @include border-zero-5 {
      border-radius: 16px;
      width: 199.7%;
    };
    margin: 0 10px;
    &[margin-top] {
      margin-top: 5px;
    }
  }
</style>
