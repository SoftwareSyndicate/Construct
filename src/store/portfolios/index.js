// State
const state = {
  portfolios: [
    {
      name: "Main",
      currencies: [
        {
          symbol: "ETH",
          volume: 30.5
        },
        {
          symbol: "LTC",
          volume: 3.5
        },
        {
          symbol: "OMG",
          volume: 333
        },
      ],
      value_history: [
        {
          date: new Date(),
          value: 11115.11
        },
        {
          date: new Date(),
          value: 31115.11
        }
      ]
    }
  ],
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
  add_portfolio: ({ commit, state }, portfolio) => {
    commit("add_portfolio", portfolio)
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
