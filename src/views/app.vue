<template>
  <div class="bq-app">
    <router-view></router-view>
    <bq-tabbar class="bq-footer" fixed v-model="selected" value="cart">
      <bq-tab-item id="home" @click.native="onTabItem('home')">
        <i class="bq-icon-home" slot="icon"></i> 首页
      </bq-tab-item>
      <bq-tab-item id="mart" @click.native="onTabItem('mart')">
        <i class="bq-icon-mart" slot="icon"></i> 闪送超市
      </bq-tab-item>
      <bq-tab-item id="cart" @click.native="onTabItem('cart')">
        <!-- 购物车抛物线结束点 bq-parabola-end -->
        <i class="bq-icon-cart bq-parabola-end" slot="icon">
        </i> 购物车
      </bq-tab-item>
      <bq-tab-item id="my" @click.native="onTabItem('my')">
        <i class="bq-icon-my" slot="icon"></i> 我的
      </bq-tab-item>
    </bq-tabbar>
  </div>
</template>
<script>
  import {Tabbar, TabItem} from 'mint-ui'
  import {mapActions} from 'vuex'
  export default {
    name: 'app',
    data() {
      return {
        selected: 'cart'
      }
    },
    mounted() {
      let {meta, name} = this.$route
      if (meta && meta.isApp) {
        this.selected = name
      }
    },
    methods: {
      ...mapActions({
        getCartList: 'getCartList'
      }),
      onTabItem(selectItem) {
        if (selectItem === 'cart') {
          this.$store.commit('GET_CART_STATUS', true)
          this.getCartList()
        }
        this.selected = selectItem
        this.$router.push({name: selectItem})
      },
      getUrlSeleted(path) {
        return path.substr(1).split('/')[0].replace(/\?\S+/, '')
      }
    },
    watch: {
      '$route' (to) {
        this.selected = to.name
      }
    },
    components: {
      bqTabbar: Tabbar,
      bqTabItem: TabItem
    }
  }
</script>
<style lang="scss">
  @import 'scss/variables';
  @import 'scss/mixin';
  $tabbar-bg: #ffffff;
  $tabbar-border: #aaaaaa;
  $tabbar-color: #666666;
  .bq-app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .mint {
      &-tabbar {
        height: 48px;
        //margin: 0 5px;
        background: $tabbar-bg;
        border: 0 solid $tabbar-border;
        box-shadow: 0 2px 6px 0 rgba(126, 121, 94, 0.60);
        //border-radius: 4px 4px 0 0;
        >.mint-tab-item {
          &.is-selected {
            background-color: $tabbar-bg;
            color: $tabbar-color;
          }
        }
        &.is-fixed {
          z-index: 8000;
        }
      }
      &-tab-item {
        color: $tabbar-color;
        padding: 8px 0;
        &:hover {
          text-decoration: none;
        }
        &-icon {
          height: 18px!important;
          .cart-num {
            position: absolute;
            display: block;
            right: -15px;
            top: -18px;
          }
        }
        &-label {
          font-family: $font-family-base;
          @include font-dpr(12px);
          color: $tabbar-color;
          letter-spacing: 0;
          line-height: 10px;
        }
      }
    }
  }
</style>
