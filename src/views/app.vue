<template>
  <bq-page class="bq-root">
    <router-view :scroll-top-value="scrollTopValue" v-on:resetScrollVariable="resetScrollVariable" ></router-view>
    <div v-if="scrollTopValue>12 && selected=='home'"  class="gtop" @click="scrollTop(0)"></div>
    <bq-footer class="bq-app-tabs">
      <bq-tabs v-model="selected" :fixed="true">
        <bq-tab id="home" @click.native="onTabItem('home')">
          <i class="bq-icon-root-home" slot="icon"></i>
          签章
        </bq-tab>
        <bq-tab id="file" @click.native="onTabItem('file')">
          <i class="bq-icon-root-category" slot="icon"></i>
          文件
        </bq-tab>
        <bq-tab id="me" @click.native="onTabItem('me')">
          <i class="bq-icon-root-me" slot="icon"></i>
          我的
        </bq-tab>
      </bq-tabs>
    </bq-footer>
  </bq-page>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'app',
    data() {
      return {
        scrollTopValue: 0,
        refContent: null,
        selected: 'home'
      }
    },
    mounted() {
      let {meta, name} = this.$route
      console.log(meta)
      if (meta && meta.isApp) {
        this.selected = name
      }
    },
    methods: {
      ...mapActions({
        getCartList: 'getCartList'
      }),
      onTabItem(selectItem) {
        this.selected = selectItem
        this.$router.push({name: selectItem})
      },
      getUrlSeleted(path) {
        return path.substr(1).split('/')[0].replace(/\?\S+/, '')
      },
      scrollTop(val) {
        this.refContent.scrollTo(val)
        this.scrollTopValue = val
      },
      resetScrollVariable(val, refContent) {
        this.scrollTopValue = val
        this.refContent = refContent
      }
    },
    watch: {
      '$route' (to) {
        this.selected = to.name
      }
    }
  }
</script>
<style lang="scss">
  @import 'scss/variables';
  @import 'scss/mixin';
  $iconImgUrl: '../assets/img';
  @each $item in home, category, me {
    .bq-icon-root-#{$item} {
      @include baseIcon('/home/#{$item}.png', 22px, 20px);
    }
    .mint-tab-item.is-selected {
      .bq-icon-root-#{$item} {
        @include baseIcon('/home/#{$item}yellow.png', 25px, 25px);
        top: -2px;
      }
    }
  }

  .bq-root {
    .bq-footer.bq-app-tabs {
      z-index: 1999;
      height: 49px;
      border-top:1px solid $light-border-color;
      .mint-tabbar {
        height: 49px;
        .mint-tab-item {
          text-align: center;
          padding-top: 9px;
          padding-bottom: 6px;
          position: relative;
          .badge{
            position: absolute;
            top: 0;
            right: 10px;
          }
          &-icon {
            margin: 0;
            width: 100%;
            height: 25px;
          }
          &-label {
            font-size: 10px;
            color: #666;
          }
        }
      }
      .mint-tabbar > .mint-tab-item.is-selected .mint-tab-item-label {
        position: initial;
        color: $font-color;
        &:after {
          height: 0;
        }
      }
    }
  }
  .gtop{
    position: fixed;
    z-index: 1;
    bottom: 50px;
    right: 15px;
    width: 47px;
    height: 47px;
    // background: url('../assets/img/home/gotop.png') no-repeat;
    // background-size: 100%;
    cursor: pointer;
    background: pink;
  }
</style>
