import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Pages from '@/pages'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Hello', component: Hello},
    {path: '/exchanges/:id', name: 'Exchange', component: Pages.ExchangePage}
  ]
})
