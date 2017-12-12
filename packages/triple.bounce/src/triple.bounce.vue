<template>
  <div class="mint-spinner-triple-bounce">
    <div class="mint-spinner-triple-bounce-bounce1" :style="bounceStyle"></div>
    <div class="mint-spinner-triple-bounce-bounce2" :style="bounceStyle"></div>
    <div class="mint-spinner-triple-bounce-bounce3" :style="bounceStyle"></div>
  </div>
</template>
<script>
export default {
  name: 'bq-triple-bounce',
  props: {
    size: Number,
    color: String
  },
  computed: {
    spinnerColor() {
      return this.color || bq.theme
    },
    bounceStyle() {
      return {
        backgroundColor: this.spinnerColor
      }
    }
  }
}
</script>
<style lang="scss">
.mint-spinner-triple-bounce-bounce {
  &1,
  &2,
  &3 {
    width: 4px;
    height: 18px;
    border-radius: 4px;
  }
}
</style>
