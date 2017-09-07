// State
const state = {
  open: false
}

// Getters
var getters = {

}

// Mutations
var mutations = {
  ["LEFT_NAV_OPEN"] (state) {
    state.open = true
  },
  ["LEFT_NAV_CLOSE"] (state) {
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
