// State
const state = {
  leftNav: {
    open: false,
    currentForm: null,
    currentAction: null
  }
}

// Getters
var getters = {
  leftNav: state =>  state.leftNav
}

// Mutations
var mutations = {
  ["UPDATE_LEFT_NAV"] (state, updates) {
    state.leftNav = Object.assign(state.leftNav, updates);
  },
}

// Actions
var actions = {
  updateLeftNav: ({ commit, state }, updates) => {
    commit("UPDATE_LEFT_NAV", updates)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
