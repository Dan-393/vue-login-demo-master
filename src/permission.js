// 进入登录的许可证
import router from './router'
import store from './store'
import { Message } from 'element-ui'
// progress bar and style
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// get Token from cookie
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import nProgress from 'nprogress'
// 禁用进度环
NProgress.configure({ showSpinner:false})
// 白名单
const whiteList = ['/login']
// 到哪个组件去，从哪个组件来，
router.beforeEach((to, from, next) => {
  // 进度条开始
  NProgress.start();
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine确定 whether the user has logined in 
  const hasToken =getToken()
  // 默认页面重定向到首页
  if(hasToken){
    if(to.path === '/login'){
      // 登录页面
      next({ path:'/'})//到默认定向路由，重定向到首页
      nProgress.done()
    }else{
      // 获得用户信息,在store数据中已存在的token
      const hasGetUserInfo = store.getters.name
      if(hasGetUserInfo){
        next()//有缓存信息跳转登录
      }else{
        try{
          // 请求数据token
          await store.dispatch('user/getInfo')
          next()
        }catch(error){
          // 信息错误， remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  }else{
    // 没有获得token
    
    // 跳到登录页面
    if(whiteList.indexOf(to.path) !== -1){
      next()
    }else {
    // 没有访问权限的其他页将重定向到登录页。
      next('/login?redirect=${to.path}')
      NProgress.done()
    }
  }
})