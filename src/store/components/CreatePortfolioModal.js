// State
const state = {
  open: false,
}

// Getters
var getters = {
  open: state => state.open,
}

// Mutations
var mutations = {
  ["set_open"] (state, open) {
    state.open = open
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
