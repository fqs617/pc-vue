<template>
  <article class="bq-content">
    <div class="scroller" ref="scroller">
       <slot></slot>
    </div>
  </article>
</template>
<script>
  import scroll from '@/utils/scroll'
  import {requestAnimationFrame, cancelAnimationFrame} from '@/utils/request.animation.frame'
  export default {
    name: 'bq-content',
    data() {
      return {
        height: 600,
        $scroller: null,
        isTop: 0
      }
    },
    mounted() {
      this.height = window.screen.height / 37.5
      this.$content = $(this.$el)
      this.initScroll()
      this.$scroller = this.$refs.scroller
      // 暴露滚动事件
      this.$scroller.addEventListener('scroll', this.$bqUtils.throttle(e => {
        this.$emit('scroll', e)
      }, 200))
    },
    beforeDestroy() {
      // 销毁 滚动动画
      this.timerIdByScroll && cancelAnimationFrame(this.timerIdByScroll)
    },
    methods: {
      scrollTo(top = 0) {
        // 是否滚动
        this.isSrcoll = true
        // 滚动动画id
        this.timerIdByScroll = null
        this.goTop = top
        // 动画滚动
        this.animateScroll()
      },
      animateScroll() {
        if (!this.isSrcoll) return
        let top = this.$scroller.scrollTop
        let goTop = this.goTop
        switch (true) {
          case goTop <= top || goTop === 0:
            top = top <= 0 ? 0 : top - 50
            break
          case goTop > top:
            top = top > goTop ? goTop : top + 50
            break
        }
        if (top === 0 || top === goTop || (this.isTop <= top && this.isTop !== 0)) {
          this.isSrcoll = false
          this.isTop = 0
          this.$scroller.scrollTop = top
          this.timerIdByScroll && cancelAnimationFrame(this.timerIdByScroll)
          return
        }
        this.$scroller.scrollTop = top
        this.isTop = top
        this.timerIdByScroll = requestAnimationFrame(this.animateScroll.bind(this))
        this.isSrcoll = true
      },
      initScroll() {
        this.$nextTick(() => {
          scroll(this.$content, '.scroller')
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "scss/mint.ui/mui.global.scss";
  .bq-content {
    position: absolute;
    top: 44px;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    overflow: hidden;
    &[fixed] {
      padding-top: $header-height;
    }
    &[padding] {
      .scroller {
        padding: 10px;
      }
    }
    .scroller {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      display: block;
      /* 增加该属性，可以增加弹性 */
      -webkit-overflow-scrolling: touch;
      overflow-x: hidden;
      overflow-y: scroll;
      will-change: scroll-position;
      backface-visibility: hidden;
      perspective: 1000;
      transform: translateZ(0);
      width: 100%;
    }
  }
</style>
