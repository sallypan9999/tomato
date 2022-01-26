import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '番茄鐘',
      keepAlive: true
    }
  },
  {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName: "list" */ '../views/List.vue'),
    meta: {
      title: '番茄鐘 | 事項'
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue'),
    meta: {
      title: '番茄鐘 | 404'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

// 瀏覽分頁時顯示分頁title
router.afterEach((to) => {
  document.title = to.meta.title
})

export default router
