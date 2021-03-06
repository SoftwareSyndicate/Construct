import Vue from 'vue'
import Router from 'vue-router'
import Pages from '@/pages'
import store from '../store'

Vue.use(Router)

const router = new Router({
  base: '/',
  routes: [
    {path: '*', redirect: '/currencies'},
    {path: '/currencies', name: 'currencies', component: Pages.CurrenciesPage},
    {path: '/currencies/:symbol', name: 'currency', component: Pages.CurrencyPage},
    {path: '/exchanges/:id', name: 'exchange', component: Pages.ExchangePage},
    // {path: '/users', name: 'users', component: Pages.UsersPagePortfoliosPage},
    {path: '/profile', name: 'profile', component: Pages.ProfilePage},
    {path: '/portfolios', name: 'portfolios', component: Pages.PortfoliosPage},
    {path: '/portfolios/:id', name: 'portfolio', component: Pages.PortfolioPage},
    {path: '/news', name: 'news', component: Pages.CoinSheetPage},
  ],
})


router.beforeEach((to, from, next) => {
  store.state.users.transition = "slide-right"
  if(from.name == "currencies"){
    store.state.users.transition = "slide-left"
  } 
  if(from.name == "profile"){
    store.state.users.transition = "slide-right"
  }
  
  next()
})


export default router
