<!-- 页面 提示插件  -->
<template lang="html">
  <div class="bq-page-prompt">
    <div class="bq-page-prompt__content">
      <i :class="icon"></i>
      <p class="bq-f-size-15"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bq-prompt',
  props: {
    title: {
      type: String,
      default: '没有消息~'
    },
    icon: {
      type: String,
      default: 'bq-icon-prompt-nogoods'
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/variables.scss';
@import '../../../scss/mixin.scss';

.bq-page-prompt {
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: #ffffff;
    position: relative;
    left: 0;
    top: 0;
    &__content {
        position: absolute;
        width: 240px;
        height: 280px;
        transform: translateX(-50%);
        left: 50%;
        top: 40px;
        .bq-icon-prompt-nogoods {
            // @include baseIcon( '/goods/wushangpin.png',240px,240px);
        }
        p {
            text-align: center;
            color: #505050;
        }
    }
}
</style>
