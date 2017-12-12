<template>
  <div class="bq-button" @click="onClick">
    <x-button :icon="icon" :disabled="disabled" :nativeType="nativeType" :plain="plain" :type="type" :size="size">
      <slot name="icon"></slot>
      <slot></slot>
    </x-button>
  </div>
</template>
<script>
  import { Button } from 'mint-ui'
  export default {
    name: 'bq-button',
    components: {
      xButton: Button
    },
    methods: {
      onClick(e) {
        e.preventDefault()
        let btn = e.target

        let ripple = document.createElement('div')
        ripple.classList.add('bq-ripple')
        let offsetHeight = btn.offsetHeight
        let offset2 = offsetHeight / 2
        ripple.style.height = `${offsetHeight}px`
        ripple.style.width = `${offsetHeight}px`
        ripple.style.left = `${offset2}px`
        ripple.style.top = `${offset2}px`
        btn.appendChild(ripple)
        ripple.classList.add('bq-ripple-effect')
        this.$emit('click', e)
        setTimeout(() => {
          btn.removeChild(ripple)
        }, 1000)
      }
    },
    props: {
      icon: String,
      disabled: Boolean,
      nativeType: String,
      plain: Boolean,
      type: {
        type: String,
        default: 'default',
        validator(value) {
          return [
            'default',
            'danger',
            'primary'
          ].indexOf(value) > -1
        }
      },
      size: {
        type: String,
        default: 'normal',
        validator(value) {
          return [
            'small',
            'normal',
            'large'
          ].indexOf(value) > -1
        }
      }
    }
  }

</script>
<style lang="scss">
  @import 'scss/variables.scss';
  @import 'scss/mixin.scss';
  $button-color:#333333;
  /* ANIMATION */

  $animation-curve-fast-out-slow-in: cubic-bezier(0.4, 0, 0.2, 1) !default;
  $animation-curve-linear-out-slow-in: cubic-bezier(0, 0, 0.2, 1) !default;
  $animation-curve-fast-out-linear-in: cubic-bezier(0.4, 0, 1, 1) !default;
  $animation-curve-default: $animation-curve-fast-out-slow-in !default;
  @mixin button-transition {
    transition: box-shadow 0.2s $animation-curve-fast-out-linear-in, background-color 0.2s $animation-curve-default, color 0.2s $animation-curve-default;
  }

  .bq-button {
    @include button-transition;
    .mint-button {
      height: 40px;
      &--primary {
        background-color: $primary;
        color: $button-color;
        border-radius: 20px;
        box-shadow: 0 3px 10px 3px rgba(203, 181, 80, 0.35);
      }
      &-text {
        @include font-dpr(14px);
        color: #333333;
      }
      &:after {
        background-color: $primary;
        border-radius: 20px;
        opacity: 0;
      }
    }
  }

  .bq-ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(#FFF, 0.4);
    min-width: 20px;
    min-height: 20px;
    opacity: 0;
  }

  .bq-ripple-effect {
    animation: ripple 2s;
    -webkit-animation: ripple 2s;
  }

  @keyframes ripple {
    0% {
      transform: scale(1);
      opacity: 0.4;
    }
    100% {
      transform: scale(20);
      opacity: 0;
    }
  }

  @-webkit-keyframes ripple {
    0% {
      -webkit-transform: scale(1);
      opacity: 0.4;
    }
    100% {
      -webkit-transform: scale(20);
      opacity: 0;
    }
  }
</style>
