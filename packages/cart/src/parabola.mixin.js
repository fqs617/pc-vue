import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isAddCarting: state => state.cart.isAddCarting
    })
  },
  beforeDestroy() {
    this.setAddCarting(true)
  },
  methods: {
    ...mapMutations({
      setCartCount: 'GET_CART_COUNT',
      // 设置是否添加购物车的状态 用于控制 购物车还未添加完成时 阻止重复添加
      setAddCarting: 'SET_CART_ADDING'
    }),
    parabolaComplete(count) {
      this.setCartCount(count)
      this.setAddCarting(true)
    }
  }
}
