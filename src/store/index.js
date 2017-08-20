import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import components from './components'
import exchanges from './exchanges'
import currencies from './currencies'
import user from './users'

const store = new Vuex.Store({
  modules: {
    navbar: components.Navbar,
    left_nav: components.LeftNav,
    gdax: exchanges.GDAX,
    currencies: currencies,
    user: user,
    // modal: components.modal,
    // leftNav: components.leftNav,
  }
})

export default store
