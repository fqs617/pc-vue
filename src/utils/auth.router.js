import { isUndefined } from '@/utils/utils'
/**
 * 处理是否 是授权路由
 * 默认 meta 是 requiresAuth  设为 requiresAuth false 后不做验证处理
 * requireStoresId 判断是否需要store_id  false 后不做验证处理
 * @class AuthRouter
 * @author xierenhong
 */
export default class AuthRouter {
  constructor() {
    this.meta = {
      requiresAuth: true,
      requireStoresId: true
    }
  }

  init(routers) {
    return routers.map(item => {
      let route = item
      if (route.children && route.children.length > 0) {
        route.children = this.init(route.children)
      }
      return this.isAuth(route)
    })
  }

  /**
   * 处理meta 默认处理 为true 有输入则不处理
   * @param {any} item 单个路由
   * @returns 返回处理好的路由
   *
   * @memberOf AuthRouter
   */
  isAuth(item) {
    let { meta, name, path } = item
    if (path === '*' || name === 'app') {
      return item
    }
    if (meta) {
      let { requiresAuth, requireStoresId } = meta
      meta.requiresAuth = !isUndefined(requiresAuth) ? requiresAuth : true
      meta.requireStoresId = !isUndefined(requireStoresId) ? requireStoresId : true
      return item
    } else {
      return { meta: this.meta, ...item }
    }
  }

};
