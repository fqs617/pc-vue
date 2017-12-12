<template>
  <a :href="href" class="bq-card-item  bq-f-size-15 ">
    <div class="bq-card-item__info">
      <slot></slot>
    </div>
    <div class="bq-card-item__right">
      <slot name="right"></slot>
    </div>
    <slot name="icon" v-if="icon">
      <i class="bq-card-item__icon bq-icon-right"></i>
    </slot>
  </a>
</template>
<script>
  export default {
    name: 'bq-card-item',
    data() {
      return {
        componentName: 'bqCardItem'
      }
    },
    props: {
      href: {
        type: String
      },
      icon: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style lang="scss">
  .bq-card-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 15px;
    color: #333333;
    position: relative;
    border: none;
    z-index: 2;
    &:hover {
      color: #333333;
    }
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      background: #ccc;
      width: 100%;
      height: 1px;/*no*/
      transform: scaleY(0.5);
      transform-origin: 0 0;
    }
    // 最后一个 不加 border
    &:last-child {
      &:after {
        height: 0;
      }
    }
    &[padding] {
      padding: 10px 0;
    }
    &[max-padding] {
      padding: 15px 0;
    }
    &__info {
      flex: 1;
      >input {
        height: 30px;
        line-height: 30px;
        min-width: 250px;
        z-index: 20;
        position: absolute;
        top: 0;
        left:0;
      }
    }
    &__right {
      text-align: right;
      flex: 1;
      span {
        color: #666666;
      }
    }
  }
</style>
