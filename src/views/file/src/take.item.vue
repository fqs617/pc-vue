<template>
  <div class="order-list">
    <div class="order-list-content"
         v-infinite-scroll="netGetList"
         infinite-scroll-disabled="hasNext"
         infinite-scroll-distance="50"
         infinite-scroll-check-load="true">
      <list-item v-for="item in listinfo"
                      :key="item.orderId || item.returnOrderId"
                      :orderitem="item"
                      :ordertype="listInfo.orderType"
                      >
      </list-item>
      <p v-if="hasNext && list.length!=0" class="noiteminfo">
        没有更多数据了...
      </p>
      <div class="bq-f-loading" v-show="isReq">
        <bq-triple-bounce></bq-triple-bounce>
      </div>
    </div>
    <bq-prompt v-if="list.length==0 && !isReq" title="暂无数据" ></bq-prompt>
  </div>
</template>
<script>
import ListItem from './item.list.vue'
export default {
  data () {
    return {
      pageSize: 10,
      page: 1,
      list: [],
      hasNext: false,
      itemNumber: 0,
      listInfo: this.listinfo,
      isReq: false  // 是否处于加载状态
    }
  },
  props: {
    listinfo: Object,
    type: ''
  },
  mounted () {
    // this.OrderService = new OrderService()
    this.initGetList()
    console.log(this.type)
  },
  methods: {
    // 获取列表数据
    async getList () {
      this.isReq = true
      let params = {}
      params.page = this.page
      params.pageSize = this.pageSize
      let res = null
      if (this.listinfo.orderType === 'order') {
        res = await this.OrderService.getOrderList(params)
      } else {
        res = await this.OrderService.getReturnList(params)
      }
      res.list.forEach(item => {
        this.itemNumber++
        item.index = this.itemNumber
        this.list.push(item)
      })
      if (res.next === 0) {
        this.hasNext = true
      } else {
        this.hasNext = false
      }
      this.isReq = false
    },
    // 重新获取数据
    initGetList () {
      this.getList()
    },
    // 获取下一页数据
    netGetList () {
      if (!this.isReq) {
        this.page++
        this.getList()
      }
    }
  },
  watch: {
    // 监听搜索条件对象
    listInfo: {
      handler: function () {
        this.hasNext = true
        this.list = []
        this.itemNumber = 0
        this.page = 1
        // this.getList()
      },
      deep: true
    },
    type(val) {
      console.log(val)
    }
  },
  components: {
    ListItem
  }
}
</script>
<style lang="scss">
@import 'scss/mixin.scss';
.noiteminfo {
  text-align: center;
  padding: 50px;
  @include font-dpr(16px);
}
</style>
