<template>
  <div class="bq-input-wrapper">
    <label class="bq-input-label" v-if="viewLabel" >
      <slot></slot>
    </label>
    <div class="bq-input">
      <template v-if="type !== 'textarea'">
        <input @change="$emit('change', currentValue)"
          v-clickoutside="doCloseActive"
          ref="input"
          class="text-input "
          :placeholder="placeholder"
          :number="type === 'number'"
          :type="type"
          @focus="active = true"
          @blur="active = false"
          :disabled="disabled"
          :readonly="readonly"
          :value="currentValue"
          :maxlength="maxlength"
          @input="handleInput" >
      </template>
      <textarea v-else @change="$emit('change', currentValue)"
        v-clickoutside="doCloseActive"
        ref="input"
        class="text-input "
        :placeholder="placeholder"
        @focus="active = true"
        @blur="active = false"
        :disabled="disabled"
        :readonly="readonly"
        :value="currentValue"
        :maxlength="maxlength !== undefined ? maxlength: '300'"
        @input="handleInput">
      </textarea>
      <slot name="button" v-if="viewButton">
      </slot>
      <bq-button class="btn-clear" v-if="disableClear && !viewButton" @click="handleClear()">
        <i :class="clearIcon" slot="icon"></i>
      </bq-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bq-card-input',
  data() {
    return {
      active: false,
      currentValue: this.value,
      viewLabel: true,
      viewButton: true
    }
  },
  beforeMount() {
    // 如果没有输入 则隐藏
    if (this.$slots.default === undefined) {
      this.viewLabel = false
    }
    if (this.$slots.button === undefined) {
      this.viewButton = false
    }
  },
  mounted() {
    this.$dom = $(this.$el)
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    disableClear: Boolean,
    maxlength: Number,
    clearIcon: {
      type: String,
      default: 'bq-icon-input-close'
    },
    value: {},
    attr: Object
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      let hasValue = (val !== null && val !== undefined && val !== '')
      this.$dom[hasValue ? 'addClass' : 'removeClass']('input-has-value')
      this.$emit('input', val)
    },
    active(val) {
      let cls = 'input-has-focus'
      this.$dom[val ? 'addClass' : 'removeClass'](cls)
    }
  },
  methods: {
    doCloseActive() {
      this.active = false
    },
    handleInput(e) {
      this.currentValue = e.target.value
    },
    handleClear() {
      if (this.disabled || this.readonly) return
      this.currentValue = ''
    }
  }
}
</script>
<style lang="scss">
  @import 'scss/variables.scss';
  @import 'scss/mixin.scss';
  .bq-input-wrapper {
    position: relative;
    display: flex;
    border: none;
    z-index: 3;
    margin: 0 15px;
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
    &[no-margin] {
      margin: 0;
      padding: 10px 15px;
    }

    &[fixed] {
      .bq-input-label {
        flex: 0 0 80px;
        width: 80px;
        min-width: 80px;
        max-width: 150px;
     }
    }
    // 另外一种样式
    &[stacked] {
      flex-direction: column;
      .text-input {
        margin: 13px 0 10px 0;
      }
      .mint-button {
        display: none;
      }
    }

    &.input-has-value:not(stacked) {
      .mint-button.btn-clear {
        display: block;
      }
    }

    .bq-input-label {
      @include font-dpr(14px);
      color: $font-color;
    }

    .bq-input {
      display: flex;
      flex: 1;
      .text-input {
        @include placeholder();
        @include appearance(none);
        display: inline-block;
        flex: 1;
        width: 92%;
        border: 0;
        border-radius: 0;
        background: transparent;
        margin: 4px 2px 3px 0;
        &[disabled] {
          opacity: .4;
        }
        &[readonly] {
          opacity: .4;
        }
      }
    }

    .mint-button {
      height: 20px;
      border: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-clear {
      display: none;
      font-size: 0;
      .mint-button-text {
        font-size: 0;
      }
    }
  }
</style>
