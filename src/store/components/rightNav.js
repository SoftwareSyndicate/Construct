// State
const state = {
  rightNav: {
    open: false,
    currentForm: null,
    currentAction: null
  }
}

// Getters
var getters = {
  rightNav: state =>  state.rightNav
}

// Mutations
var mutations = {
  ["UPDATE_RIGHT_NAV"] (state, updates) {
    state.rightNav = Object.assign(state.rightNav, updates);
  },
}

// Actions
var actions = {
  updateRightNav: ({ commit, state }, updates) => {
    commit("UPDATE_RIGHT_NAV", updates)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
