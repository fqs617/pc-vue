<template>
  <mt-popup v-model="visible" position="bottom" class="mint-datetime">
    <bq-picker
      :slots="dateSlots"
      @change="onChange"
      :visible-item-count="5"
      class="mint-datetime-picker"
      ref="picker"
      :itemHeight="40"
      show-toolbar>
      <span class="mint-datetime-action mint-datetime-cancel" @click="visible = false">取消</span>
      <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">确认</span>
    </bq-picker>
  </mt-popup>
</template>
<script>
  import { DatetimePicker } from 'mint-ui'
  export default {
    name: 'bq-datetime-picker',
    mixins: [DatetimePicker],
    value: {
      type: Object,
      default() {
        return new Date()
      }
    },
    props: {
      startDate: {
        type: Date,
        default() {
          return new Date(new Date().getFullYear() - 10, 0, 1)
        }
      },
      yearFormat: {
        type: String,
        default: '{value} <i>年</i>'
      },
      monthFormat: {
        type: String,
        default: '{value} <i>月</i>'
      },
      dateFormat: {
        type: String,
        default: '{value} <i>日</i>'
      },
      hourFormat: {
        type: String,
        default: '{value} <i>时</i>'
      },
      minuteFormat: {
        type: String,
        default: '{value} <i>分</i>'
      }
    },
    methods: {
      pushSlots(slots, type, start, end) {
        slots.push({
          flex: type === 'Y' ? 1.2 : 1,
          className: `bq-slot-${type}`,
          values: this.fillValues(type, start, end)
        })
      }
    }
  }
</script>
