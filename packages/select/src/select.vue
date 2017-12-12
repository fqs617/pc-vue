<template>
  <bq-popup
    v-model="currentValue"
    position="bottom"
    :closeOnClickModal="true"
    class="bq-select" ref="popup">
    <bq-picker
      :slots.sync="selectSlots"
      @change="onChange"
      class="bq-select-picker"
      ref="picker"
      :valueKey="valueKey"
      show-toolbar>
      <span class="bq-select-action bq-select-cancel" @click="close">取消</span>
      <span class="bq-select-action bq-select-confirm" @click="confirm" >确定</span>
    </bq-picker>
  </bq-popup>
</template>
<script>
  import {Popup} from 'mint-ui'
  export default {
    name: 'bq-select',
    data() {
      return {
        currentValue: false,
        onClose: null,
        closed: false,
        isJsShow: false,
        selectSlots: [],
        valueKey: null
      }
    },
    watch: {
      value(val) {
        this.currentValue = val
      },
      currentValue(val) {
        this.$emit('input', val)
      },
      closed(newVal) {
        if (newVal) {
          this.currentValue = false
          // 设置为false 防止监听不触发
          this.closed = false
          this.destroyElement()
        }
      },
      itemList(newVal) {
        this.setValues(newVal || [])
      }
    },
    mounted() {
      this.valueKey = this.field || 'text'
      // 如果是js 调起 需要做初始化操作
      if (this.isJsShow) {
        this.setValues(this.itemSlots)
      }
      // 如果是 弹出时 需要销毁 dom
      this.$refs.popup.onClose = () => {
        this.close()
      }
      // fix 滚动 select 空白处 页面的 以跟随滚动的bug
      this.$refs.popup.$el.ontouchmove = () => { return false }

      // init props itemList
      if (this.itemList) {
        this.setValues(this.itemList)
      }
    },
    beforeDestroy() {
      this.timer && clearTimeout(this.timer)
    },
    props: {
      value: {},
      itemList: {
        type: Array
      },
      field: {
        type: String,
        default: 'text'
      }
    },
    methods: {
      open() {
        this.currentValue = true
      },
      destroyElement() {
        // 非js 打开的 不需要销毁
        if (!this.isJsShow) {
          return
        }
        this.timer = setTimeout(() => {
          this.$el.removeEventListener('transitionend', this.destroyElement)
          this.$destroy(true)
          this.$el.parentNode.removeChild(this.$el)
        }, 500)
      },
      close() {
        this.closed = true
        if (this.$bqUtils.isFunction(this.onClose)) {
          this.onClose(this)
        }
      },
      onChange(picker, values) {
        this.$emit('pickerChange', picker, values)
        // 如果是 js 调起
        if (this.onPickerChange && this.isJsShow) {
          this.onPickerChange.call(this, picker, values) // eslint-disable-line
        }
      },
      confirm() {
        this.closed = true
        let values = this.$refs.picker.getValues()
        this.$emit('confirm', values)
        // 如果是 js 调起
        if (this.onConfirm && this.isJsShow) {
          this.onConfirm.call(this, values) // eslint-disable-line
        }
      },
      generateSlots(list = []) {
        return list.map((item, index) => {
          return { flex: 1, className: `slot${index + 1}`, textAlign: 'center', ...item }
        })
      },
      getValue() {
        return this.$refs.picker.getValues()
      },
      setValues(values) {
        if (this.$bqUtils.isObject(values) && Array.isArray(values)) {
          this.$refs.picker.setSlotsValues(this.generateSlots(values))
        }
      }
    },
    components: {
      bqPopup: Popup
    }
  }
</script>
<style lang="scss">
  @import '../../../scss/variables.scss';
  @import '../../../scss/mixin.scss';
  .bq-select {
    width: 100%;
    &-picker {
     width: 100%;
     .picker-toolbar {
       height: 48px;
       display: flex;
       align-items: center;
       z-index: 3;
       @include border-zero-5{
         z-index: 1;
       }
       .bq-select-action {
         height: 46px;
         line-height: 46px;
         text-align: center;
         color: #333;
         flex: 1;
         z-index: 4;
         @include font-dpr(14px);
         &.bq-select-confirm {
           background-color: $primary;
         }
       }
     }
    }
  }
</style>
