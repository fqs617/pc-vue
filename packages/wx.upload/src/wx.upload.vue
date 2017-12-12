<template>
  <section class="bq-wx-upload">
    <ul>
      <template v-for="item in imgs">
        <li class="bq-wx-upload_active">
          <i @click="onDel(item.localId)" class="del">
          </i>
          <img :src="item.localId" >
        </li>
      </template>
      <li v-if="isAdd" @click="onUpload">
        <i class="icon-add"></i>
      </li>
    </ul>
  </section>
</template>
<script>
  import WxConfig from '@/config/wx.config'
  export default {
    name: 'bq-wx-upload',
    data() {
      return {
        imgs: [],
        isAdd: true
      }
    },
    created() {
      this.wxConfig = new WxConfig()
    },
    methods: {
      onDel(localId) {
        let index = this.imgs.findIndex(value => value.localId === localId)
        this.imgs.splice(index, 1)
        if (this.imgs.length < 3) {
          this.isAdd = true
        }
      },
      async onUpload() {
        if (!this.$device.isWechat) {
          this.$messagebox.alert('请在微信下打开！')
          return
        }
        let res = await this.wxConfig.chooseImage()
        let {localIds} = res
        let [localId] = localIds
        let uploadRes = await this.wxConfig.uploadImage(localId)
        if (uploadRes.serverId) {
          this.imgs.push({...uploadRes, localId: localId})
        }
        if (this.imgs.length >= 3) {
          this.isAdd = false
        }
        this.$emit('on-success', this.imgs.map(item => item.serverId).toString())
      }
    }
  }
</script>
<style lang="scss" >
  @import '../../../scss/variables.scss';
  @import '../../../scss/mixin.scss';
  $iconImgUrl: '../../../src/assets/img';
  .bq-wx-upload {
    margin-top: 20px;
    padding: 0 15px;
    width: 100%;
    height: 60px;
    ul {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      li {
        width: 60px;
        height: 60px;
        line-height: 60px;
        margin-right: 20px;
        z-index: 2;
        border:0.5px dashed rgba(151,151,151,0.5);
        border-radius: 8px;
        text-align: center;
        i.icon-add {
          @include baseIcon('/components/upload/add.png', 32px, 32px);
        }
        &.bq-wx-upload_active {
          border:0.5px solid rgba(151,151,151,0.5);
          position: relative;
          i.del {
            position: absolute;
            right: -28px;
            top: -28px;
            z-index: 3;
            @include baseIcon('/components/upload/group.png', 20px, 20px);
          }
          img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 8px;
            width: 55px;
            height: 55px;
          }
        }
      }
    }
  }
</style>
