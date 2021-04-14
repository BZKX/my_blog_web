import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {index: 0},
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/formBuilder',
    name: 'formBuilder',
    meta: {index: 1},
    component: () => import(/* webpackChunkName: "home" */ '../views/toolsPage/formBuilder.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {index: 2},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
