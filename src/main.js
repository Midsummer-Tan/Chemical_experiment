import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.min.css'
import ElectronicScale from './index'
Vue.use(ElectronicScale)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
