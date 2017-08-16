import Vue from 'vue'
import Vuex from 'vuex'

import exchanges from './exchanges'
import currencies from './currencies'
// import coin_market_cap from "./coin_market_cap"

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    gdax: exchanges.GDAX,
    currencies: currencies
    // firebase,
    // modal: components.modal,
    // leftNav: components.leftNav,
    // rightNav: components.rightNav
    // soundcloud,
  }
})

export default store
