import { mapMutations } from 'vuex'
export default {
  beforeDestroy() {
    this.timer && clearTimeout(this.timer)
  },
  methods: {
    ...mapMutations({
      updateLoading: 'UPDATE_LOADING'
    }),
    // 隐藏 loading
    hideLoading(top = 44) {
      this.updateLoading({isLoading: false, isLoadingTop: top})
    }
  }
}
