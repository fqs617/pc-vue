<template>
<bq-page class="buyer-set">
  <bq-header title="实名认证"></bq-header>
  <bq-content>
    <div class="tip">请输入你的个人信息，通过后不能更改</div>
    <bq-card>
      <bq-card-input padding no-margin v-model="param.storeName" :maxlength="30">
        真实姓名：
        <bq-button slot="button">
            <i>{{param.storeName.length}}/20</i>
        </bq-button>
      </bq-card-input>
      <bq-card-input padding no-margin v-model="param.storeName" :maxlength="30">
        身份证号：
        <bq-button slot="button" class="button">
          <i class="idcard"></i>
        </bq-button>
      </bq-card-input>
      <bq-card-input padding type="password" v-model="param.iphone" placeholder="请输入密码" :disable-clear="true" >
        手机号：
        <bq-button slot="button">
          <i>{{param.iphone.length}}/11</i>
        </bq-button>
      </bq-card-input>
      <bq-card-input padding type="text" v-model="param.registercode" :maxlength="4" placeholder="请输入验证码">
        验证码：
        <bq-button slot="button" class="bq-code" @click.native="onSendCode()" :disabled="code.isSendCode">
          <!-- 获取验证码 -->
          <span v-if="!code.isSendCode">{{ code.isGet ? '重新获取' : '获取验证码' }}</span>
          <span :style="{ color: code.isSendCode ? '#999999' : '#505050' }" v-else>已发送({{ code.s }}s)</span>
        </bq-button>
      </bq-card-input>
    </bq-card>
    <div class="btn">
      <bq-button type="primary"size="large" @click="postInfo">提交</bq-button>
    </div>
  </bq-content>
</bq-page>
</template>
<script>
// import MyService from '@/services/my.service'
export default {
  data() {
    return {
      param: {
        storeName: '',
        storePhone: '',
        owerName: '',
        address: '',
        registercode: '',
        iphone: ''
      },
      code: {
        isSendCode: false,
        s: 60,
        // 在此获取时 文本 变为重新获取
        isGet: false
      }
    }
  },
  mounted() {
    // this.MyService = new MyService()
    // this.getBuyerInfo()
  },
  methods: {
    getBuyerInfo() {
      this.MyService.getBuyerInfo(this.param).then(res => {
        this.param = res
      })
    },
    // 获取验证码
    async onSendCode() {
      if (!this.validation() || this.code.isSendCode) {
        return
      }
      this.code.isSendCode = true
      this.time = setInterval(() => {
        if (this.code.s === 0) {
          this.code.isSendCode = false
          this.code.s = 60
          this.code.isGet = true
          this.time && clearInterval(this.time)
          return
        }
        this.code.s = this.code.s - 1
      }, 1000)
      // await this.HomeService.sendCode({
      //   phone: this.login.authIphone,
      //   type: 1
      // })
    },
    validation() {
      if (!this.$bqUtils.isPhoneNumber(this.param.iphone)) {
        this.$toast('请输入有效的手机号')
        return false
      }
      return true
    },
    postInfo() {
      if (!this.param.storeName || !this.param.storePhone || !this.param.owerName || !this.param.address) {
        this.$messagebox.alert('请将信息填写完整')
        return
      }
      if (this.param.storeName.length <= 0) {
        this.$messagebox.alert('请输入店铺名称')
        return
      }
      if (!this.$bqUtils.vRegister(this.param.storeName)) {
        this.$messagebox.alert('店铺名称只允许输入汉字，数字和英文字母')
        return
      }
      if (this.param.owerName.length > 10) {
        this.$messagebox.alert('商户姓名不能超过10个字')
        return
      }
      delete this.param.storeId
      this.MyService.getBuyerInfo(this.param).then(() => {
        this.$messagebox.alert('修改成功')
        this.$router.replace('/me/buyer')
      })
    }
  }
}
</script>
<style lang="scss">
@import 'scss/mixin';
@import 'scss/variables.scss';
.buyer-set {
    .bq-card:after {
        border-top: none;
        border-left: none;
        border-right: none;
    }
    input {
        @include font-dpr(14px);
        color: #505050;
    }
    .phone {
        @include font-dpr(14px);
        color: #505050;
        i {
            opacity: 0.4;
        }
    }
    .bq-input-wrapper .bq-input .text-input {
        margin: -2px 0 0;
    }
    .btn {
        padding: 31px 15px 0;
        .bq-button {
          .mint-button-text {
            @include font-dpr(14px);
            color: #fff;
          }
        }
    }
    .tip {
      padding: 5px 0 5px 10px;
    }
    .bq-code{
      cursor: pointer;
      .mint-button-text{
        @include font-dpr(14px);
        padding-left: 10px;
        text-align: center;
        color: #333;
      }
      display: inline-block;
      border-left: 1px solid #D8D8D8;
      background-color: #fff;
    }
    .button {
      .mint-button {
          display:inline-block;
          height: 41px;
          position: absolute;
          width: 75%;
          right: 10px;
          top: 0px;
          background: #fff;
        }
      .idcard{
        position: absolute;
        display: inline-block;
        width: 20px;
        height: 20px;
        right: 11px;
        top: 11px;
        background: url(../../../assets/img/home/scanblack.png) no-repeat;
        background-size: 20px;
      }
    }
}
</style>
