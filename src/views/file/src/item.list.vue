<template>
  <bq-card class="item-wrap" @click.native="goDetail(orderType,orderItem)">
    <bq-card-content padding v-if="orderType=='order' && orderItem.orderCode">
      <p>{{orderItem.orderCode}}<div class="btn">{{orderItem.status_str}}</div></p>
      <p>商品数量：1</p>
      <p>下单时间：222</p>
      <p>订单金额：33</p>
    </bq-card-content>
    <bq-card-content padding  v-if="orderType=='return' && orderItem.returnOrderCode">
      <p>{{orderItem.returnOrderCode}}<div class="btn">{{orderItem.status_str}}</div></p>
      <p>退货数量：{{orderItem.returnNum}}</p>
      <p>退货时间：{{orderItem.returnTime}}</p>
      <p>退货金额：¥{{$bqUtils.moneyFixed(orderItem.returnPrice)}}</p>
    </bq-card-content>
    <bq-card-footer v-if="orderType=='order' && orderItem.status!=1 && orderItem.status!=2 && orderItem.status!=6">
      <bq-button size="small" type="primary" class="bq-btn" v-if="orderItem.status==0" @click.stop="orderCancle(orderItem)">取消订单</bq-button>
    </bq-card-footer>
  </bq-card>
</template>
<script>
export default {
  data () {
    return {
      orderItem: this.orderitem,
      orderType: this.ordertype
    }
  },
  props: {
    orderitem: Object,
    ordertype: String
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import 'scss/variables.scss';
@import 'scss/mixin.scss';
.order-list {
  .item-wrap {
    margin-top: 11px;
    @include font-dpr(14px);
    color: $font-color;
    &:first-child {
      margin-top: 9px;
    }
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
}
</style>
