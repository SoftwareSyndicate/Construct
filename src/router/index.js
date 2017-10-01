import Vue from 'vue'
import Router from 'vue-router'
import Pages from '@/pages'
import store from '../store'

Vue.use(Router)

const router = new Router({
  // base: '/Construct/',
  routes: [
    {path: '*', redirect: '/currencies'},
    {path: '/currencies', name: 'currencies', component: Pages.CurrenciesPage},
    {path: '/currencies/:id', name: 'currency', component: Pages.CurrencyPage},
    {path: '/exchanges/:id', name: 'exchange', component: Pages.ExchangePage},
    // {path: '/users', name: 'users', component: Pages.UsersPagePortfoliosPage},
    {path: '/profile', name: 'profile', component: Pages.ProfilePage},
    {path: '/portfolios', name: 'portfolios', component: Pages.PortfoliosPage},
    {path: '/portfolios/:id', name: 'portfolio', component: Pages.PortfolioPage},
    {path: '/news', name: 'news', component: Pages.CoinSheetPage},
  ],
})


router.beforeEach((to, from, next) => {
  let currentUser = store.state.user.currentUser
  if(from.name == "currencies"){
    store.state.user.transition = "slide-left"
  } 
  if(from.name == "profile"){
    store.state.user.transition = "slide-right"
  }

  next()
})


export default router
