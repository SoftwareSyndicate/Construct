// State
const state = {
  open: false,
  title: "Filter"
}

// Getters
var getters = {
  
}

// Mutations
var mutations = {
  ["RIGHT_NAV_OPEN"] (state) {
    state.open = true
  },
  ["RIGHT_NAV_CLOSE"] (state) {
    state.open = false
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
