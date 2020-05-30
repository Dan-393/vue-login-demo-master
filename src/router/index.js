import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
  const routes = [
  {
    path:'/',
    redirect: '/login'
  },
  {
    path:'/login',
    component: ()=>import('@/views/login/index.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
