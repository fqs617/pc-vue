<template>
  <section class="bq-header" >
    <mi-header :title="title">
      <template slot="left">
        <slot name="left" v-if="isLeft"></slot>
        <bq-button v-if="!isLeft && isLeftButton" @click="onBack($event)">
          <slot name="leftIcon" v-if="isLeftIcon"></slot>
          <i v-if="!isLeftIcon" class="bq-icon-back" slot="icon" ></i>
        </bq-button>
      </template>
      <template slot="right">
        <slot name="right"></slot>
      </template>
    </mi-header>
  </section>
</template>
<script>
import { Header } from 'mint-ui'
export default {
  name: 'bq-header',
  props: {
    title: String,
    isLeft: {
      type: Boolean,
      default: false
    },
    isLeftButton: {
      type: Boolean,
      default: true
    },
    isLeftIcon: {
      type: Boolean,
      default: false
    }
  },
  components: {
    miHeader: Header
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let $el = $(this.$el)
      $el.on('touchmove', e => {
        e.preventDefault()
      })
    },
    // 返回
    onBack() {
      let { bq_mart_source: bqSource, bq_mart_share_source: bqShareSource, from } = this.$route.query
      if (bqSource === 'old' || bqShareSource === 'weixin' || from) {
        this.$router.push({ name: 'home' })
        return
      }
      this.$router.go(-1)
    }
  }
}
</script>
