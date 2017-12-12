<template>
 <div class="bq-item-options">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'bq-item-options',
    data() {
      return {
        componentName: 'bqItemOptions'
      }
    },
    methods: {
      width() {
        return 80
      }
    }
  }
</script>
