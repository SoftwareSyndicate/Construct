import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import components from './components'
import exchanges from './exchanges'
import currencies from './currencies'
import user from './users'
import portfolios from './portfolios'

const store = new Vuex.Store({
  modules: {
    gdax: exchanges.GDAX,
    currencies: currencies,
    user: user,
    portfolios: portfolios,
    
    // Components
    navbar: components.Navbar,
    left_nav: components.LeftNav,
    // right_nav: components.RightNav,
    create_portfolio_modal: components.CreatePortfolioModal,
  }
})

export default store
