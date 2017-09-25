// Mutation Types
const ADD_GRAPH = 'ADD_GRAPH'
const UPDATE_GRAPHS = 'UPDATE_GRAPHS'
const REMOVE_ALL_GRAPHS = 'REMOVE_ALL_GRAPHS'
const ADD_GRAPH_CURRENCY = 'ADD_GRAPH_CURRENCY'
const UPDATE_GRAPH_CURRENCY = 'UPDATEm_GRAPH_CURRENCY'
const REMOVE_GRAPH_CURRENCY = 'REMOVE_GRAPH_CURRENCY'
const TOGGLE_GRAPH_LINE = 'TOGGLE_GRAPH_LINE'

// State
const state = {
  graphs: [],
  line_types: [
    {
      name: "Close",
      active: true,
      color: null,
      axis: null
    },
    {
      name: "Candlestick",
      active: false,
      color: null,
      axis: null
    },
    {
      name: "Williams",
      active: true,
      color: null,
      axis: null
    },
  ]
}

// Getters
var getters = {
  graphs: state =>  state.graphs,
  line_types: state =>  state.line_types,
}

// Mutations
var mutations = {
  [UPDATE_GRAPHS] (state, graphs) {
    state.graphs = Object.assign(state.graphs, graphs)
  },
  [REMOVE_ALL_GRAPHS] (state) {
    state.graphs = []
  },
  [ADD_GRAPH_CURRENCY] (state, currency) {
    let currency_copy = Object.assign({}, currency)
    currency_copy.lines = state.line_types.slice()
    state.graphs.push(currency_copy)
  },
  [REMOVE_GRAPH_CURRENCY] (state, name) {
    state.graphs = state.graphs.filter(c => c.name != name)
  },
  [UPDATE_GRAPH_CURRENCY] (state, currency) {
    state.graphs.forEach(c => {
      if(c.name == currency.name){
        c = currency
      }
    })
  },
  [TOGGLE_GRAPH_LINE] (state, {currency, line}) {
    state.graphs.forEach(c => {
      if(c.name == currency.name){
        c.lines.forEach(l => {
          if(l.name == line.name){
            l.active = !l.active
          }
        })
      }
    })
  },
}

// Actions
var actions = {
  // CURRENCY HISTORIES
  fetch_graph_histories: ({commit, state}, currencies) => {
    currencies.forEach(currency => {  
      return APIs.CryptoCompare.fetch_currency_history_by_minute(currency.symbol).then(results=> {
        currency.history = results.Data
        commit(types.UPDATE_GRAPH_CURRENCY, currency)
        return results
      })
    })
  },

  watch_graph_histories: ({commit, state}, currencies) => {
    let watchers = []
    currencies.forEach(currency => {
      watchers.push(APIs.CryptoCompare.watch_currency_history_by_minute(currency.symbol,  state.rate, (results) => {
        currency.history = results.Data
        commit(types.UPDATE_GRAPH_CURRENCY, currency)
        return results
      }))
    })
    return watchers
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
