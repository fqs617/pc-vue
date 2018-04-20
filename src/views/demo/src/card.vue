<template>
  <bq-page class="demo-card">
    <bq-header title="card"></bq-header>
    <bq-content>
      <bq-card class="no-border">
        <bq-card-header title="表单"></bq-card-header>
        <bq-card-input v-model="value"  padding fixed placeholder="请选择" :maxlength="2">
          开始时间
          <bq-button slot="button">
            button
          </bq-button>
        </bq-card-input>
        <bq-card-input padding fixed placeholder="请选择" :readonly="true" >
          结束时间
        </bq-card-input>
        <bq-card-input padding fixed placeholder="全部" >
          订单状态
        </bq-card-input>
      </bq-card>
      <br>
      <bq-card>
        <bq-card-header title="表单2"></bq-card-header>
        <bq-card-input padding  placeholder="请输入账号" :disable-clear="true"  >
        </bq-card-input>
        <bq-card-input padding no-margin placeholder="请输入密码" :disable-clear="true" >
        </bq-card-input>
        <bq-card-input padding fixed placeholder="全部" >
          订单状态
        </bq-card-input>
      </bq-card>
      {{ value }}
      <br>
      <bq-card>
        <bq-card-header title="表单 stacked"></bq-card-header>
        <bq-card-input padding no-margin stacked placeholder="请输入银行卡开户人姓名" >
          户名：
        </bq-card-input>
        <bq-card-input padding no-margin stacked placeholder="请输入开户银行所在支行名称"   >
          开户行：
        </bq-card-input>
        <bq-card-input padding no-margin stacked placeholder="请输入银行卡号" >
          银行卡号：
        </bq-card-input>
      </bq-card>
      <br>
      <bq-card>
        <bq-card-item padding :icon="true">
          <i class="bq-icon-right"></i>店铺名称：三里屯旗舰
          <img v-lazy="'https://imgsa.baidu.com/news/q%3D100/sign=e69c1c6c5b3d269728d30c5d65fab24f/11385343fbf2b211d563a4e8c08065380dd78ec2.jpg'" >
        </bq-card-item>
        <bq-card-item padding href="/tabs" >
          商户电话：13816824511
          <div slot="right">
            <!-- <bq-switch></bq-switch> -->
          </div>
        </bq-card-item>
        <bq-card-item padding >
          商户姓名：安强
        </bq-card-item>
        <bq-card-item padding >
          店铺地址：北京三里屯
        </bq-card-item>
      </bq-card>
      <br>
      <bq-card>
        <bq-card-header title="商品明细"></bq-card-header>
        <bq-card-item padding :icon="true">
          哈哈
        </bq-card-item>
      </bq-card>
      <bq-card margin margin-top>
        <bq-card-header title="margin"></bq-card-header>
        <bq-card-item padding :icon="true">
          哈哈 margin
        </bq-card-item>
      </bq-card>
      <bq-card margin-top>
        <bq-card-header title="备注信息"></bq-card-header>
        <bq-card-input @click.native="onInput" padding type="textarea" v-model="textareaVal">
        </bq-card-input>
      </bq-card>
      <bq-card margin-top class="footer">
        <bq-card-content padding >
          footer <br>
          footer <br>
          footer <br>
        </bq-card-content>
        <bq-card-footer>
          <bq-button size="small" type="primary" @click="$router.push('/button')">取消订单</bq-button>
          <bq-button size="small" type="primary">去支付</bq-button>
        </bq-card-footer>
      </bq-card>
    </bq-content>
  </bq-page>
</template>
<style lang="scss">
  .demo-card {
    .bq-content .scroller {
      padding-top: 10px;
    }
  }
</style>
<script>
export default {
  data() {
    return {
      value: '',
      textareaVal: '备注备注备注备注备注备注备注备注'
    }
  },
  methods: {
    onInput() {
      this.$messagebox.alert('on input init')
    }
  }
}
</script>
<style lang="scss">
  .footer {
    .bq-card-footer {
      justify-content: flex-start;
    }
  }
  img{
    width: 70px;
    height: 60px;
  }
  .demo-card {
    .no-border {
      &:after {
        border-top: 0;
      }
    }
  }
</style>
