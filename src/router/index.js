import Vue from 'vue'
import Router from 'vue-router'
import device from '@/components/device'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'device',
      component: device
    }
  ]
})
