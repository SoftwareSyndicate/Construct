import Vue from 'vue'
import Vuex from 'vuex'

import user from './users'
import portfolios from './portfolios'
import currencies from './currencies'
import graphs from './graphs'

import exchanges from './exchanges'
import components from './components'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: user,
    portfolios: portfolios,
    currencies: currencies,
    graphs: graphs,

    // Exchanges
    gdax: exchanges.GDAX,
    
    // Components
    navbar: components.Navbar,
    left_nav: components.LeftNav,
    right_nav: components.RightNav,
    bottom_nav: components.BottomNav,
    create_portfolio_modal: components.CreatePortfolioModal,
  }
})

export default store
