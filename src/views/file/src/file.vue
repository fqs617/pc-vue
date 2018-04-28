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
        待他人签署
      </bq-tab>
      <bq-tab id="2">
        已完成签署
      </bq-tab>
      <bq-tab id="3">
        草稿箱
      </bq-tab>
      <bq-tab id="4">
        已撤销
      </bq-tab>
      <bq-tab id="5">
        已拒签
      </bq-tab>
      <bq-tab id="6">
        已解约
      </bq-tab>
    </bq-tabs>
    <bq-tab-content v-model="selected" class="tab-content-box">
      <take-item :listinfo="listinfo" :type="selected"></take-item>
    </bq-tab-content>
  </bq-content>
</bq-page>
</template>
<script>
import FileService from '@/services/file.services'
import takeItem from '@/views/file/src/take.item.vue'
export default {
  data () {
    return {
      selected: '1',
      listinfo: {},
      status: {
        loading: false,
        noMoreGoods: false
      },
      params: {
        page: 1,
        pageSize: 20,
        type: 5
      },
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
    this.FileService = new FileService()
    this.getInfo()

  },
  mounted () {
  },
  computed: {
  },
  methods: {
    onScroll(e) {
      console.log(e)
    },
    getInfo () {
      if (this.status.loading) {
        return
      }
      this.status.loading = true
      this.params.type = this.selected
      this.FileService.getList(this.params).then(res => {
        this.listinfo = res.banners
      })
    }
  },
  updated () {
  },
  beforeDestroy () {
  },
  components: {
    takeItem
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
