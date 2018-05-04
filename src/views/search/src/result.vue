<template>
  <bq-page class="bq-page-order-search-result">
  <bq-header title="合同查询结果"></bq-header>
  <bq-content>
    <take-item :listinfo="listinfo" :isSeach="isSeach"></take-item>
  </bq-content>
  </bq-page>
</template>
<script>
import takeItem from '@/views/file/src/take.item.vue'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      listinfo: {},
      typeData: {},
      isOrder: true,
      isSeach: 1
    }
  },
  computed: {
    ...mapGetters({
      params: 'getSearchParams'
    }),
    title() {
      let typeString = this.isOrder === 'true' ? '订' : '退货'
      return `${typeString}单查询结果`
    }
  },
  beforeMount() {
    this.isOrder = this.$route.params.isOrder
    let searchObj = this.params
    console.log(searchObj)
    this.listinfo = {searchObj, orderType: this.isOrder === 'true' ? 'order' : 'return'}
  },
  components: {
    takeItem
  }
}
</script>
<style lang="scss">
  @import 'scss/variables.scss';
  .bq-page-order-search-result {
    .item-wrap[margin-top] {
      margin-top: 11px;
      position: relative;
      font-size: 14px;
      line-height: 21px;
    }
    .btn {
      color: $danger;
      position: absolute;
      top: 9.5px;
      right: 20px;
    }
    .bq-btn {
      width: 100px;
      margin-left: 20px;
      &:first-child {
        margin-left: 0;
      }
    }
    .no-data-msg {
      margin: 50px auto;
      text-align: center;
    }
  }
</style>
