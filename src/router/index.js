import Vue from 'vue'
import Router from 'vue-router'
import Pages from '@/pages'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/Construct/',
  routes: [
    {path: '/', name: 'home', component: Pages.HomePage},
    {path: '/currencies/:id', name: 'currency', component: Pages.CurrencyPage},
    {path: '/exchanges/:id', name: 'exchange', component: Pages.ExchangePage}
  ]
})
