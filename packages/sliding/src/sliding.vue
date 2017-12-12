<template>
  <div class="bq-item-sliding"
  v-clickoutside:touchstart="onSwipeMove"
  @click="onSwipeMove()"
  @touchstart="onStartDrag"
  @touchmove="onDrag"
  @touchend="endDrag"
  :class="[actived ? 'active-slide active-options-right' : '' ]">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'bq-item-sliding',
    data() {
      return {
        start: {
          x: 0,
          y: 0
        },
        dragging: false,
        actived: false
      }
    },
    mounted() {
      let children = this.$children
      for (const child of children) {
        let componentName = child.componentName
        if (componentName === 'bqCardItem' || componentName === 'cartItem') {
          this.itemComponent = child
        }
        if (componentName === 'bqItemOptions') {
          this.itemOptionsComponent = child
        }
      }
      if (!this.itemComponent) {
        throw new Error('bq-item-sliding 组件下必须包含 item 组件')
      }
      this.itemWrap = this.itemComponent.$el
      this.rightWrap = this.itemOptionsComponent.$el
      this.rightWidth = this.itemOptionsComponent.width()
    },
    methods: {
      translate3d(offset) {
        return `translate3d(${offset}px, 0, 0)`
      },
      onSwipeMove(offset = 0) {
        this.itemWrap.style.webkitTransform = this.translate3d(offset)
        if (offset === 0) {
          this.dragging = false
          this.actived = false
          this.start.x = 0
          this.start.y = 0
          this.offsetLeft = 0
        }
        this.swiping = true
      },
      onStartDrag(evt) {
        evt = evt.changedTouches ? evt.changedTouches[0] : evt
        this.dragging = true
        this.start.x = evt.pageX
        this.start.y = evt.pageY
      },
      onDrag(evt) {
        if (this.opened) {
          !this.swiping && this.onSwipeMove(0)
          this.opened = false
          return
        }
        if (!this.dragging) return
        const e = evt.changedTouches ? evt.changedTouches[0] : evt
        const offsetTop = e.pageY - this.start.y
        const offsetLeft = this.offsetLeft = e.pageX - this.start.x
        const x = Math.abs(offsetLeft)
        // 只做了 向从右到左 滑动  所以如果是从左到右滑 不处理
        if (offsetLeft > 0 || x > this.rightWidth || !this.rightWidth) {
          return
        }
        const y = Math.abs(offsetTop)
        this.swiping = !(x < 5 || (x >= 5 && y >= x * 1.73))
        if (!this.swiping) return
        evt.preventDefault()
        this.actived = true
        this.onSwipeMove(offsetLeft)
      },
      endDrag(_evt) {
        if (!this.swiping) return
        // 如果 this.offsetLeft > 0 是从左向右滑动 小于0 是从右到左滑动
        this.swipeLeaveTransition(this.offsetLeft > 0 ? 1 : -1)
      },
      swipeLeaveTransition(direction) {
        this.swipeLeave = true
        const oLeft = Math.abs(this.offsetLeft)
        // 从右到左滑动 如果滑动的距离超过按钮组的百分之40 则 显示出按钮来
        if (direction < 0 && oLeft > this.rightWidth * 0.4) {
          this.onSwipeMove(-this.rightWidth)
          this.swiping = false
          this.opened = true
          return
        }
        this.onSwipeMove(0)
      }
    }
  }
</script>
<style lang="scss" >
  @import './sliding.scss';
</style>
