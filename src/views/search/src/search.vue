<template>
  <bq-page class="bq-page-order-search">
  <bq-header title="查询条件"></bq-header>
  <bq-content>
    <bq-tab-content class="tab-content-box">
      <bq-tab-content-item>
        <bq-card>
          <bq-card-input padding placeholder="输入文件标题、发件人、签署方" v-model="searchData.parameter">
          </bq-card-input>
          <bq-card-item padding fixed>
            开始时间  <div class="status-text" @click="showDatePicker(0)" :class="{'init': searchData.startTime == ''}">{{dateFormat(searchData.startTime)}}</div>
          </bq-card-item>
          <bq-card-item padding fixed >
            结束时间  <div class="status-text" @click="showDatePicker(1)" :class="{'init': searchData.endTime == ''}">{{dateFormat(searchData.endTime)}}</div>
          </bq-card-item>
          <bq-card-item padding fixed >
          合同状态  <div class="status-text" @click="showActionSheet()">{{ActionText}}</div>
        </bq-card-item>
        </bq-card>
      </bq-tab-content-item>
    </bq-tab-content>
    <bq-button type="primary" size="large" class="bq-btn-search" @click="searchList" >开始查询</bq-button>
  </bq-content>
  <bq-datetime-picker
    ref="datePicker"
    type="date"
    v-model="selTab.pickerValue" @confirm="onConfirm">
  </bq-datetime-picker>
    <bq-action-sheet
      cancelText=""
      :actions="searchData.actions"
      v-model="searchData.sheetVisible">
    </bq-action-sheet>
  </bq-page>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      code: '',
      selTab: {
        pickerValue: new Date()
      },
      selType: 1,
      searchData: {
        init: true,
        type: 1,
        parameter: '',
        startTime: '',
        endTime: '',
        actions: [
        {name: '全部', method: () => { this.selType = 1 }},
        {name: '代他人签署', method: () => { this.selType = 2 }},
        {name: '已完成签署', method: () => { this.selType = 3 }},
        {name: '草稿箱', method: () => { this.selType = 4 }},
        {name: '已撤销', method: () => { this.selType = 5 }},
        {name: '已撤销', method: () => { this.selType = 6 }},
        {name: '已解约', method: () => { this.selType = 7 }}],
        sheetVisible: false
      }
    }
  },
  computed: {
    ActionText() {
      return this.searchData.actions[this.selType - 1].name
    }
  },
  methods: {
    ...mapActions({
      setSearchParams: 'setSearchParams'
    }),
    onConfirm() {
      let timeArr = ['startTime', 'endTime']
      let time = this.$bqUtils.dateFormat(this.selTab.pickerValue, 'yyyy-MM-dd')
      this.searchData[timeArr[this.code]] = time
    },
    async searchList() {
      let typeData = this.searchData
      typeData.type = this.selType
      let {parameter, startTime, endTime, type} = typeData
      await this.setSearchParams({parameter, startTime, endTime, type})
      this.$router.push({path: `/search/result`})
    },
    dateFormat(val) {
      if (val === '') return '请选择'
      return this.$bqUtils.dateFormat(new Date(val), 'yyyy-MM-dd')
    },
    showDatePicker(code) { // code 0:开始 1:结束
      this.code = code
      this.$refs.datePicker.open()
    },
    showActionSheet() {
      this.searchData.sheetVisible = true
    }
  },
  watch: {
  }
}
</script>
<style lang="scss">
  .bq-page-order-search {
    .tab-content-box {
      margin: 11px 0 31px;
    }
    .status-text {
      display: inline-block;
      margin-left: 15px;
      font-size: 14px;
      line-height: 14px;
    }
    .init {
      color: #999;
    }
    .init, .status-text {
      width: calc(100% - 100px);
    }
    .bq-btn-search {
      margin: 0 20px;
      width: calc(100% - 40px);
      color: #fff;
    }
    .bq-card-item__right {
      flex: 0;
    }
  }
</style>
