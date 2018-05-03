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
        <bq-tabs v-model="selected" class="tab-top" v-if="typeUser === '1'">
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
        <bq-tabs v-model="selected" class="tab-top" v-if="typeUser === '2'">
          <bq-tab id="1">
            待自己签署
          </bq-tab>
          <bq-tab id="2">
            已完成签署
          </bq-tab>
          <bq-tab id="3">
            已拒签
          </bq-tab>
        </bq-tabs>
  <bq-content>
    <bq-tab-content v-model="selected" class="tab-content-box">
      <take-item :type="selected"></take-item>
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
      typeUser: null
    }
  },
  created() {
    this.FileService = new FileService()
    this.typeUser = this.$cookie.get('typeUser')
    console.log(this.typeUser)
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
  components: {
    takeItem
  },
  watch: {
  }
}
</script>
<style lang="scss">
@import 'scss/variables.scss';
@import 'scss/mixin.scss';
.bq-page-search{
  position: relative;
  .mint-header-button {
    .bq-order-headright {
      color: $font-color;
      @include font-dpr(14px);
    }
  }
  .tab-top{
    position: fixed;
    top: 44px;
    height: 45px;
    z-index: 100;
    background: #fff;
    overflow-x: scroll!important;
    display: -webkit-box;
    -webkit-overflow-scrolling:touch;
    a{
      line-height: 45px;
    }
    .mint-tab-item{
      width: 90px;
      padding: 0;
      line-height: 45px;
      text-align: center;
    }
    .mint-tab-item:nth-child(3){
      width: 65px;
    }
    .mint-tab-item:nth-child(4){
      width: 60px;
    }
    .mint-tab-item:nth-child(5){
      width: 60px;
    }
    .mint-tab-item:nth-child(6){
      width: 70px;
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
