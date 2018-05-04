<template>
  <div class="order-list">
    <div class="order-list-content"
         v-infinite-scroll="netGetList"
         infinite-scroll-disabled="hasNext"
         infinite-scroll-distance="100"
         infinite-scroll-check-load="true">
      <list-item v-for="item in listinfo"
                      :key="item.orderId"
                      :orderitem="item"
                      :ordertype="type"
                      >
      </list-item>
      <p v-if="hasNext && listinfo.length!=0" class="noiteminfo">
        没有更多数据了...
      </p>
      <div class="bq-f-loading" v-show="isReq">
        <bq-triple-bounce></bq-triple-bounce>
      </div>
    </div>
    <bq-prompt v-if="listinfo.length==0 && !isReq" title="暂无数据" ></bq-prompt>
  </div>
</template>
<script>
import ListItem from './item.list.vue'
import FileService from '@/services/file.services'
export default {
  data () {
    return {
      hasNext: false,
      listinfo: [],
      isReq: false, // 是否处于加载状态
      params: {
        page: 1,
        pageSize: 20,
        type: ''
      }
    }
  },
  props: {
    type: '',
    isSeach: ''
  },
  mounted () {
    this.FileService = new FileService()
    this.initGetList()
  },
  methods: {
    // 获取列表数据
    async getList () {
      this.isReq = true
      this.params.type = this.type
      if (this.isSeach) {
        this.params.type = 1
      }
      let res = await this.FileService.getList(this.params)
      this.listinfo = this.listinfo.concat(res.list)
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
      console.log(this.isReq)
      if (!this.isReq) {
        this.params.page++
        this.getList()
      }
    }
  },
  watch: {
    // 监听搜索条件对象
    listInfo: {
      handler: function () {
        this.hasNext = true
        this.listinfo = []
        this.params.page = 1
        this.getList()
      },
      deep: true
    },
    type(val) {
      console.log(val)
      this.getList()
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
