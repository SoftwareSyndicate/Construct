// State
const state = {
  first_name: "",
  last_name: "",
  portfolios: [],
  portfolio: null
}

// Getters
var getters = {
  first_name: state =>  state.first_name,
  last_name: state =>  state.last_name,
  portfolios: state =>  state.portfolios,
  portfolio:  state =>  state.portfolio
}

// Mutations
var mutations = {
  ["SET_PORTFOLIO"] (state, portfolio) {
    state.portfolio = portfolio
  },
  ["SET_PORTFOLIOS"] (state, portfolios) {
    state.portfolios = portfolios
  },
  ["SET_FIRST_NAME"] (state, first_name) {
    state.first_name = first_name
  },
  ["SET_LAST_NAME"] (state, last_name) {
    state.last_name = last_name
  },
  ["LOAD_USER"] (state, oldState) {
    state.first_name = oldState.first_name
    state.last_name = oldState.last_name
    state.portfolios = oldState.portfolios
    state.portfolio = oldState.portfolio
  },
}

// Actions
var actions = {
  load_user: ({ commit, state }) => {
    let user = localStorage.getItem("user");
    if(user){
      commit("LOAD_USER", JSON.parse(user))
    }
  },
  save_user: ({ commit, state }) => {
    let user = JSON.stringify(state)
    localStorage.setItem("user", user)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
