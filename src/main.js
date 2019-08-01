import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import 'font-awesome/css/font-awesome.min.css'
import ElectronicScale from './index'
Vue.use(ElectronicScale)
// import Progress from './index'
// import NeedleProgress from './index'


// Vue.use(Progress)
// Vue.use(NeedleProgress)

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
