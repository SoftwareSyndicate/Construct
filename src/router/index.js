import Vue from 'vue'
import Router from 'vue-router'
import Pages from '@/pages'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Home', component: Pages.HomePage},
    {path: '/exchanges/:id', name: 'Exchange', component: Pages.ExchangePage}
  ]
})
