import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import components from './components'
import exchanges from './exchanges'
import currencies from './currencies'

const store = new Vuex.Store({
  modules: {
    gdax: exchanges.GDAX,
    currencies: currencies,
    navbar: components.Navbar,
    // modal: components.modal,
    // leftNav: components.leftNav,
  }
})

export default store
