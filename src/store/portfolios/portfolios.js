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
  ["portfolios_load_state"] (state, previousState) {
    state.portfolios = previousState.portfolios
    state.portfolio = previousState.portfolio
  },
}

// Actions
var actions = {
  poltfolios_load_state: ({ commit, state }) => {
    let portfolios = localStorage.getItem("portfolios");
    if(portfolios){
      commit("portfolios_load_state", JSON.parse(portfolios))
    }
  },
  portfolios_save_state: ({ commit, state }) => {
    let portfolios = JSON.stringify(state)
    localStorage.setItem("portfolios", portfolios)
  }  
}

export default {
  state,
  getters,
  mutations,
  actions
}
