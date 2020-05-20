import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// 引入样式配置
import 'normalize.css/normalize.css'

// 引入ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/icons'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
