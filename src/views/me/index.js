const Me = resolve => require(['./src/me.vue'], resolve)
const MyInfoSet = resolve => require(['./src/myinfo.set.vue'], resolve)
export default function (router) {
  router.push({
    path: '/me',
    name: 'me',
    component: Me,
    meta: {
      // requiresAuth: false,
    }
  })
  router.push({
    path: '/my/info/set',
    name: 'myinfoset',
    component: MyInfoSet,
    meta: {
      // requiresAuth: false,
    }
  })
}
