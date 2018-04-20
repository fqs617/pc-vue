import Demo from './src/demo.vue'
const NativeDemo = resolve => require(['./src/native.vue'], resolve)
const CardDemo = resolve => require(['./src/card.vue'], resolve)
export default function(router) {
  router.push({
    path: '/demo',
    name: 'demo',
    component: Demo,
    meta: {
      requiresAuth: false,
      requireStoresId: false
    }
  })

  router.push({
    path: '/native',
    component: NativeDemo,
    meta: {
      requiresAuth: false,
      requireStoresId: false
    }
  })
  router.push({
    path: '/card',
    component: CardDemo
  })
}
