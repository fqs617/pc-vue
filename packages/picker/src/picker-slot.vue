<template>
  <div class="picker-slot" :class="classNames" :style="flexStyle">
    <div v-if="!divider" ref="wrapper" class="picker-slot-wrapper" :class="{ dragging: dragging }" :style="{ height: contentHeight + 'px' }">
      <div class="picker-item" v-for="itemValue in mutatingValues"
        :class="{ 'picker-selected': itemValue === currentValue }"
        v-html="typeof itemValue === 'object' && itemValue[valueKey] ? itemValue[valueKey] : itemValue"
        :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }">
      </div>
    </div>
    <div v-if="divider"></div>
  </div>
</template>
<script>
  import PickerSlot from 'mint-ui/packages/picker/src/picker-slot.vue'
  export default {
    mixins: [PickerSlot]
  }
</script>
