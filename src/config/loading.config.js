import NProgress from 'nprogress'
import { NoAfterRouteIsLoading } from '@/config/global.config'
import Vue from 'vue'

// NProgress.configure({showSpinner: false}) 转圈

/**
 * @export
 * @param {any} router 路由
 * @param {any} store vuex store
 */
export default function LoadingConfig(router, store) {
  router.beforeEach(async(to, from, next) => {
    let { name, matched, fullPath, path } = to

    if (matched.some(record => record.meta.requiresAuth)) {
      // 用户登录处理 判断当前登录状态 如果未登录 直接去登录页面
      let isLoggedIn = false
      if (isLoggedIn) {
        next({
          path: '/login',
          query: { redirect: fullPath }
        })
        return
      }
    }
    let arrNameAndroid = ['userReturn', 'feedback', 'mart']
    // 处理 安卓设备 调用微信js-sdk permission denied 的情况
    if (Vue.device.isAndroid && arrNameAndroid.indexOf(name) !== -1 && from.name !== null) {
      // 使用 window 跳转
      window.location.href = fullPath
      return
    }
    NProgress.start()
    // 调用微信签名
    // store.dispatch('initWx', `http://m.bqmart.cn${fullPath}`)
    // loading 处理
    if (!store.state.loading.isLastLoading[name]) {
      store.commit('UPDATE_LOADING', { isLoading: true })
    }
    if (/^http/.test(path)) {
      let url = path.split('http')[1]
      window.location.href = `http${url}`
    } else {
      next()
    }
  })

  router.afterEach((to) => {
    let { name } = to
    if (NoAfterRouteIsLoading.indexOf(name) === -1) {
      setTimeout(() => {
        store.commit('UPDATE_LOADING', { isLoading: false })
        NProgress.done()
      }, 2000)
    }
  })
}
