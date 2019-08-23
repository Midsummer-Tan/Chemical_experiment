import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://chemistryapi.3d1.top/api'
Vue.prototype.axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
