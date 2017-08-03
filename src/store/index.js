import Vue from 'vue'
import Vuex from 'vuex'

import exchanges from './exchanges'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    gdax: exchanges.GDAX
    // firebase,
    // modal: components.modal,
    // leftNav: components.leftNav,
    // rightNav: components.rightNav
    // soundcloud,
  }
})

export default store
