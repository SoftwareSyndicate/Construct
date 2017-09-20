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
  [ADD_GRAPH_CURRENCY] (state, name) {
    state.graphs.push({
      name: name + "-USD",
      lines: Object.assign({}, state.lineTypes)
    })
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
          if(l.type == line.type){
            l.active = !l.active
          }
        })
      }
    })
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
