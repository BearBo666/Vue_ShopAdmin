import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入字体图标
import './assets/css/global.css'
//导入全局样式表
import './assets/fonts/iconfont.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://shopcms.wuster.vip/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
