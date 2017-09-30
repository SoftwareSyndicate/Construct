import Vue from 'vue'
import Router from 'vue-router'
import Pages from '@/pages'

Vue.use(Router)

export default new Router({
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
  ]
})
