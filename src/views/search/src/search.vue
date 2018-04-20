<template>
<bq-page class="bq-page-search">
  <bq-header title="选择模板">
    </bq-header>
  <bq-content>
    <bq-card>
      <bq-card-input padding placeholder="请输入退货单号/商品条码/商品名称" v-model="returnData.parameter">
      </bq-card-input>
    </bq-card>
    <bq-tabs v-model="selected" class="tab-top">
      <bq-tab id="1">
        常用模板
      </bq-tab>
      <bq-tab id="2">
        合同模板
      </bq-tab>
    </bq-tabs>
    <bq-tab-content v-model="selected" class="tab-content-box">
    <bq-tab-content-item id="1">
      111
    </bq-tab-content-item>
    <bq-tab-content-item id="2">
      222
    </bq-tab-content-item>
  </bq-tab-content>
  </bq-content>
</bq-page>
</template>
<script>
import TestService from '@/services/test.service'
export default {
  data () {
    return {
      selected: '1',
      orderData: {
        type: 1,
        parameter: ''
      },
      returnData: {
        type: 1,
        parameter: ''
      }
    }
  },
  created() {
    this.TestService = new TestService()
    this.TestService.getHome().then(res => {
      console.log(res)
    })
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    onScroll(e) {
      console.log(e)
    }
  },
  updated () {
  },
  beforeDestroy () {
  },
  watch: {
    'selected'() {
      this.selType = 1
      this.orderData.parameter = ''
    }
  }
}
</script>
<style lang="scss">
.bq-page-search{
  .tab-top{
    position: absolute;
    top: 0;
    height: 45px;
    a{
      line-height: 45px;
    }
    .mint-tab-item{
      padding: 0;
      line-height: 45px;
    }
    .mint-tab-item-label{
      line-height: 45px;
    }
  }
  .tab-content-box {
    margin: 45px 0 31px;
  }
  .status-text {
    display: inline-block;
    margin-left: 15px;
    font-size: 14px;
    line-height: 14px;
  }
  .bq-btn-search {
    margin: 0 20px;
    width: calc(100% - 40px);
  }
  .bq-card-item__right {
    flex: 0;
  }
}
</style>
