<template>
<bq-page class="bq-page-search">
  <bq-header title="电子合同" :isLeftIcon="true">
    <router-link to="/search/file" slot="right" class="bq-order-headright">
      🔍
    </router-link>
  </bq-header>
  <!-- <bq-header title="电子合同">
      <bq-button slot="right" @click="setInfo">
        🔍
      </bq-button>
    </bq-header> -->
  <bq-content>
    <bq-tabs v-model="selected" class="tab-top">
      <bq-tab id="1">
        代他人签署
      </bq-tab>
      <bq-tab id="2">
        已完成签署
      </bq-tab>
      <bq-tab id="3">
        草稿箱
      </bq-tab>
      <bq-tab id="4">
        已拒签
      </bq-tab>
    </bq-tabs>
    <bq-tab-content v-model="selected" class="tab-content-box">
    <bq-tab-content-item id="1">
      <bq-card>
        <bq-card-input padding placeholder="请输入订货单号/商品条码/商品名称" v-model="orderData.parameter">
        </bq-card-input>
      </bq-card>
    </bq-tab-content-item>
    <bq-tab-content-item id="2">
      <bq-card>
        <bq-card-input padding placeholder="请输入退货单号/商品条码/商品名称" v-model="returnData.parameter">
        </bq-card-input>
      </bq-card>
    </bq-tab-content-item>
    <bq-tab-content-item id="3">
      <bq-card>
        <bq-card-input padding placeholder="请输入退货单号/商品条码/商品名称" v-model="returnData.parameter">
        </bq-card-input>
      </bq-card>
    </bq-tab-content-item>
    <bq-tab-content-item id="4">
      <bq-card>
        <bq-card-input padding placeholder="请输入退货单号/商品条码/商品名称" v-model="returnData.parameter">
        </bq-card-input>
      </bq-card>
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
@import 'scss/variables.scss';
@import 'scss/mixin.scss';
.bq-page-search{
  .mint-header-button {
    .bq-order-headright {
      color: $font-color;
      @include font-dpr(14px);
    }
  }
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
}
</style>
