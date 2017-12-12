<template>
<bq-page>
  <bq-header title="demo">
    <router-link to="/" slot="left">
      <i class="bq-font bq-ion-fanhui"></i>
    </router-link>
  </bq-header>
  <bq-content ref="content" @scroll="onScroll" class="bg">
  <bq-wx-upload @on-success="onSuccess"></bq-wx-upload>
    
    <br>
    <div style="background:green;width:100%; height:100px;transition: height 1s ease"></div>
    <bq-card margin-top>
     <bq-item-sliding>
       <bq-card-item padding>
       111
       </bq-card-item>
       <bq-item-options>
         <div class="del">
          哈哈哈
         </div>
       </bq-item-options>
      </bq-item-sliding>
    </bq-card>
    <bq-button type="primary" size="large" @click="onParabola" ref="btn">抛物线</bq-button>
    <br>
    <bq-button type="primary" size="large" @click="onQrcode">调起微信二维码</bq-button>
    <br>
    <bq-button type="primary" size="large" @click="showSelect">js 弹出select</bq-button>
    <br>
    <bq-button type="primary" size="large" @click="zuJianSelect">组件 弹出select</bq-button>
    <br>
    <bq-button type="primary" size="large" @click="timeSelect">时间</bq-button>
    
    
    <br>
    <bq-button type="primary" size="large" @click="onPay" ref="end">支付</bq-button>
    <div style="height:1000px; width:100%; background:red;"></div>
     <bq-button type="primary" size="large" @click="onScrollTop">回到顶部</bq-button>
     <br> <br> <br> <br>
  </bq-content>
  <bq-datetime-picker
    ref="datePicker"
    type="datetime"
    v-model="pickerValue"></bq-datetime-picker>
  <bq-select v-model="isShow" :itemList="itemList" field="text" @pickerChange="onPickerChange" @confirm="onOK"></bq-select>
</bq-page>
</template>
<script>
import WxConfig from '@/config/wx.config'
import {Parabola} from '~'
import TestService from '@/services/test.service'
export default {
  data () {
    /* eslint-disable */
    return {
      pickerValue: '',
      isShow: false,
      select: null,
      select2: null,
      list:[
        {
          values:[{
            text: '北京',
            child: [
              {text: '昌平',
              child: [{text:'回龙观'},{text:'东大街'},{text:'霍营'}]
            },{text: '朝阳',child: [{text:'凹凹'}]}]
          },{
            text: '云南',
            child: [
              {text: '昭通',
              child: [{text:'彝良'},{text:'东大街1'},{text:'霍营2'}]
            },{text: '昆明',child: [
              {text: 'xx.'},
              {text: 'xx.1'},
              {text: 'xx.3'}
            ]}]
          }]
        },{
          values:[
              {text: '昌平',
              child: [{text:'回龙观'},{text:'东大街'},{text:'霍营'}]
            },{text: '朝阳',child: [{text:'凹凹'}]}]
        },{
          values:[{text:'回龙观'},{text:'东大街'},{text:'霍营'}]
        }
      ],
      list2:[
        {
          values:[{
            text: '北京我是组件',
            child: [
              {text: '昌平',
              child: [{text:'回龙观'},{text:'东大街'},{text:'霍营'}]
            },{text: '朝阳',child: [{text:'凹凹'}]}]
          },{
            text: '云南',
            child: [
              {text: '昭通',
              child: [{text:'彝良'},{text:'东大街1'},{text:'霍营2'}]
            },{text: '昆明',child: [
              {text: 'xx.'},
              {text: 'xx.1'},
              {text: 'xx.3'}
            ]}]
          }]
        },{
          values:[
              {text: '昌平',
              child: [{text:'回龙观'},{text:'东大街'},{text:'霍营'}]
            },{text: '朝阳',child: [{text:'凹凹'}]}]
        },{
          values:[{text:'回龙观'},{text:'东大街'},{text:'霍营'}]
        }
      ],
      itemList: null,
      uploadValues: ''
    }
    /* eslint-enable */
  },
  created() {
    this.TestService = new TestService()
    this.TestService.getHome().then(res => {
      console.log(res)
    })
  },
  mounted () {
    this.WxConfig = new WxConfig()
  },
  computed: {
  },
  methods: {
    showSelect() {
      this.$select({
        itemSlots: this.list,
        onPickerChange(picker, values) {
          let [one, two] = values
          if (!this.$bqUtils.isUndefined(one)) {
            picker.setSlotValues(1, one.child)
          }
          if (!this.$bqUtils.isUndefined(two)) {
            picker.setSlotValues(2, two.child)
          }
        },
        onConfirm: values => {
          this.select = values.map(item => item.text).join('-')
        }
      })
    },
    zuJianSelect() {
      this.isShow = true
      this.itemList = this.list2
    },
    timeSelect() {
      this.$refs.datePicker.open()
    },
    onOK(values) {
      this.select2 = values.map(item => item.text).join('-')
    },
    onPickerChange(picker, values) {
      let [one, two] = values
      if (!this.$bqUtils.isUndefined(one)) {
        picker.setSlotValues(1, one.child)
      }
      if (!this.$bqUtils.isUndefined(two)) {
        picker.setSlotValues(2, two.child)
      }
    },
    onPay() {
      this.$pay().then(val => {
        console.log(val)
      })
    },
    onSuccess(val) {
      this.uploadValues = val
    },
    onScroll(e) {
      console.log(e)
    },
    async onQrcode() {
      let res = await this.WxConfig.scanQRCode()
      let {resultStr} = res
      this.$messagebox.alert(resultStr)
    },
    onScrollTop() {
      this.$refs.content.scrollTo(0)
    },
    onParabola() {
      let el = this.$refs.btn.$el
      let opt = {
        el: el,
        targetEl: document.querySelector('.bq-parabola-end'),
        autostart: true,
        duration: 800,
        curvature: 0.005,
        body: this.$refs.content.$el.querySelector('.scroller')
      }
      let p = new Parabola(opt)
      console.log(p)
    }
  },
  updated () {
  },
  beforeDestroy () {
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
.bg {
  background-color: $bg-color;
}
.del {
  background: #FFF2B2;
  border: 0 solid #CCCCCC;
}
</style>
