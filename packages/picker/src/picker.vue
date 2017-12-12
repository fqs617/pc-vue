<template>
  <div class="picker" :class="{ 'picker-3d': rotateEffect }">
    <div class="picker-toolbar" v-if="showToolbar"><slot></slot></div>
    <div class="picker-items">
      <bq-picker-slot v-for="slot in slots" :key="slot.valueIndex"
       :valueKey="valueKey"
       :values="slot.values || []"
       :text-align="slot.textAlign || 'center'"
       :visible-item-count="visibleItemCount"
       :class-name="slot.className"
       :flex="slot.flex"
       v-model="values[slot.valueIndex]"
       :rotate-effect="rotateEffect"
       :divider="slot.divider"
       :content="slot.content"
       :itemHeight="itemHeight"
       :default-index="slot.defaultIndex">
      </bq-picker-slot>
      <div class="picker-center-highlight" :style="{ height: itemHeight + 'px', marginTop: -itemHeight / 2 + 'px' }"></div>
    </div>
  </div>
</template>
<script>
  import { Picker } from 'mint-ui'
  import PickerSlot from './picker-slot.vue'
  export default {
    name: 'bq-picker',
    mixins: [ Picker ],
    methods: {
      setSlotsValues(sValues) {
        let slots = this.slots || []
        if (slots.length === sValues.length) {
          return
        }
        this.values = []
        let valueIndexCount = 0
        sValues.forEach(item => {
          slots.push(item)
        })
        // 初始化
        slots.forEach(slot => {
          if (!slot.divider) {
            slot.valueIndex = valueIndexCount++
            this.values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0]
            this.slotValueChange()
          }
        })
      }
    },
    mounted() {
      // fix 滚动 select 空白处 页面的 以跟随滚动的bug
      this.$el.ontouchmove = () => { return false }
    },
    components: {
      bqPickerSlot: PickerSlot
    }
  }
</script>
