<template>
  <bq-content class="empty">
    <div class="empty-icon">
    </div>
    <p></p>
    <div class="button">
      <slot></slot>
    </div>
  </bq-content>
</template>
<script>
  export default {
    name: 'bq-empty',
    props: ['writer'],
    methods: {
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../scss/variables.scss';
  @import '../../../scss/mixin.scss';
  $iconImgUrl: '../assets/img';
  .empty{
    .empty-icon{
      width: 240px;
      height: 240px;
      margin: 40px auto 0 auto;
      // background: url('#{$iconImgUrl}/location/kong.png') center no-repeat;
      background-size: 240px;
    }
    p{
      color: #666;
      @include font-dpr(15px);
      line-height: 20px;
      text-align: center;
      width: 100%;
      position: relative;
      top: -20px;
    }
    .button{
      width: 66%;
      margin: 80px auto 0 auto;
    }
  }
</style>
