<!-- 弹出密码支付 -->
<template>
  <bq-popup v-model="currentVal" position="bottom" ref="popup">
    <div class="bq-pay-modal" :style="modalStyle">
      <bq-header class="bq-pay-modal-header" :is-left="true" :style="modalStyle" title="请输入密码">
        <bq-button  slot="right" @click="currentVal = false">
          <i class="bq-icon-close" slot="icon"></i>
        </bq-button>
      </bq-header>
      <bq-content>
        <!-- 密码输入框 -->
        <div class="bq-pay-modal-pwd">
          <div class="bq-pay-modal-pwd-input" :class="[{'active': active}]">
            <i :class="{'dotted': len(0)}">&nbsp;</i>
            <i :class="{'dotted': len(1)}">&nbsp;</i>
            <i :class="{'dotted': len(2)}">&nbsp;</i>
            <i :class="{'dotted': len(3)}">&nbsp;</i>
            <i :class="{'dotted': len(4)}">&nbsp;</i>
            <i :class="{'dotted': len(5)}">&nbsp;</i>
          </div>
        </div>
        <a class="bq-pay-modal-help" ref="gopayword" >
         忘记密码?
        </a>
        <ul class="bq-pay-modal-keyboard" ref="keyboard">
          <li data-key="1">1</li>
          <li data-key="2">2</li>
          <li data-key="3">3</li>
          <li data-key="4">4</li>
          <li data-key="5">5</li>
          <li data-key="6">6</li>
          <li data-key="7">7</li>
          <li data-key="8">8</li>
          <li data-key="9">9</li>
          <li data-key="-1"class="gray">&nbsp;</li>
          <li data-key="0">0</li>
          <li data-key="del" class="gray">
            <i class="bq-icon-key-del"></i>
          </li>
        </ul>
      </bq-content>
    </div>
  </bq-popup>
</template>
<script>
  import { Popup } from 'mint-ui'
  export default {
    data() {
      return {
        active: true,
        currentVal: false,
        inputVal: []
      }
    },
    computed: {
      modalStyle() {
        return {width: `${375 / 37.5}rem`}
      }
    },
    mounted() {
      this.inputVal = []
      this.$itemEl = $(this.$refs.keyboard).find('li')
      this.$btnPwd = $(this.$refs.gopayword)
      this.$refs.popup.onClose = () => {
        // this.initKeyboard()
        this.removeEvent()
      }
      this.initEvent()
    },
    beforeDestroy() {
      this.removeEvent()
    },
    methods: {
      initEvent() {
        this.$itemEl.on('touchstart', this.touchStart)
        this.$itemEl.on('touchcancel', this.touchEnd)
        this.$itemEl.on('touchend', this.touchEnd)
        // 去修改密码
        this.$btnPwd.on('click', this.goPwd)
      },
      initKeyboard() {
        this.$itemEl.forEach(li => {
          let $li = $(li)
          let key = $li.data('key')
          if (parseInt(key) >= 0) {
            $li.hasClass('gray') && $li.removeClass('gray')
          }
        })
      },
      removeEvent() {
        if (this.$itemEl) {
          this.$itemEl.unbind('touchstart', this.touchStart)
          this.$itemEl.unbind('touchcancel', this.touchEnd)
          this.$itemEl.unbind('touchend', this.touchEnd)
          this.$btnPwd.unbind('click', this.goPwd)
        }
      },
      goPwd() {
        this.currentVal = false
        window.router.push({path: '/pay/password'})
      },
      touchStart(e) {
        let $el = $(e.target)
        let key = $el.data('key')
        if (key === -1) {
          return
        }
        $el.toggleClass('gray')
        if (key === 'del') {
          this.inputVal.length > 0 && this.inputVal.pop()
        }
        if (key >= 0 && this.inputVal.length < 6) {
          this.inputVal.push(key)
        }
      },
      touchEnd(e) {
        let $el = $(e.target)
        let key = $el.data('key')
        if (key === -1) {
          return
        }
        $el.toggleClass('gray')
      },
      len(index) {
        return !this.$bqUtils.isUndefined(this.inputVal[index])
      }
    },
    watch: {
      inputVal(val) {
        if (val.length === 6) {
          let callback = this.callback
          callback && callback('confirm', val.join(''))
          this.timer && clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.currentVal = false
          }, 300)
        }
      }
    },
    components: {
      bqPopup: Popup
    }
  }
</script>
<style lang="scss">
  @import "../../../scss/variables.scss";
  @import "../../../scss/mixin.scss";
  .bq-pay-modal {
    height: 374px;
    width: 100%;
    background-color: #fff;
    &-header {
      .mint-header-button.is-right {
        width: 100px;
        flex: none;
        .bq-button {
          float: right;
          width: 50px;
        }
      }
    }

    &-pwd {
      height: 40px;
      padding: 0 40px;
      margin-top: 30px;
      &-input {
        height: 40px;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        i {
          &:first-child {
            margin-left: 0;
          }
          // flex: 0 0 13.8%;
          width: 40px;
          min-width: 40px;
          height: 40px;
          margin-left: 10px;
          @include border-zero-5 {
            border-radius: 8px;
          };
          &.dotted {
            background: url(../../../src/assets/img/components/pay/short-pwd-char.png) no-repeat center center;
            background-size: 16px 16px;
          }
        }
      }
    }

    &-help {
      display: inline-block;
      color: #FF872B;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: right;
      padding: 0 50px;
    }
    // 键盘样式
    &-keyboard {
      display: flex;
      flex-wrap: wrap;
      margin-top: 30px;
      li {
        width: 33.3%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        @include font-dpr(24px);
        color: #333;
        @include border-zero-5(#AEAEAE){
          border-right: 0;
          border-bottom: 0;
        };
        z-index: 2;
        &.gray {
          background: #D1D5DB;
        }
      }
    }
  }
</style>
