// State
const state = {
  portfolios: [],
  portfolio: null
}

// Getters
var getters = {
  portfolio: state => state.portfolio,
  portfolios: state => state.portfolios,
}

// Mutations
var mutations = {
  ["add_portfolio"] (state, portfolio) {
    state.portfolios.push(portfolio)
  },
  ["update_portfolio"] (state, portfolio) {
    state.portfolio = portfolio
  },
  ["set_portfolio"] (state, portfolio) {
    state.portfolio = portfolio
  },
  ["set_portfolios"] (state, portfolios) {
    state.portfolios = portfolios
  },
}

// Actions
var actions = {
  
}

export default {
  state,
  getters,
  mutations,
  actions
}
