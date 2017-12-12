<template>
<div class="bq-loading"  v-show="show" >
  <div class="bq-loading-toast">
    <bq-triple-bounce></bq-triple-bounce>
    <p>全力加载中...</p>
  </div>
</div>
</template>
<script>
import TripleBounce from '~/triple.bounce'
export default {
  name: 'bq-loading',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    top: {
      type: Number,
      default: 44
    }
  },
  created() {
    this.show = this.value
  },
  computed: {
    pxRem() {
      return this.top / 37.5
    }
  },
  data() {
    return {
      show: false
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.$emit('input', val)
    }
  },
  components: {
    TripleBounce
  }
}
</script>
<style lang="scss">
@import 'scss/variables.scss';
@import 'scss/mixin.scss';
.bq-loading {
  position: fixed;
  top: 0;
  z-index: 1888;
  width: 375px;
  height: 100%;
  background-color: $bg-color;
  margin: 0 auto;
  &-toast {
    position: fixed;
    z-index: 1889;
    width: 100px;
    min-height: 100px;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    background-color: $bg-color;
    text-align: center;
    p {
      @include font-dpr(14px);
      color: #333333;
      letter-spacing: 0;
      padding-top: 17px;
    }
  }
  &[max-top="true"] {
    .bq-loading-toast {
        top: 190px;
    }
  }
}
</style>
