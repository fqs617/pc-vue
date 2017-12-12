<template>
  <bq-popup
    class="bq-page-modal"
    v-model="currentVal"
    position="right"
    :modal="false">
    <bq-header :title="title" :is-left="true">
      <bq-button slot="left" @click="onClose">
        <i class="bq-icon-h-close" slot="icon"></i>
      </bq-button>
    </bq-header>
    <bq-content>
      <slot></slot>
    </bq-content>
  </bq-popup>
</template>
<script>
  import {Popup} from 'mint-ui'
  export default {
    name: 'bq-modal',
    data() {
      return {
        currentVal: false
      }
    },
    watch: {
      value(val) {
        this.currentVal = val
      },
      currentVal(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      onClose() {
        this.currentVal = false
      }
    },
    props: {
      value: {},
      title: String
    },
    components: {
      bqPopup: Popup
    }
  }
</script>
<style lang="scss">
  @import 'scss/variables.scss';
  .bq-page-modal {
    width: 100%;
    height: 100%;
    background-color: $bg-color;
    z-index: 2000;
    .bq-header {
      z-index: 100000;
    }
  }
</style>
