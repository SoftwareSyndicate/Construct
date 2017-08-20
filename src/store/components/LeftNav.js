// State
const state = {
  left_nav: {
    open: false
  }
}

// Getters
var getters = {
  left_nav: state =>  state.left_nav,
}

// Mutations
var mutations = {
  ["LEFT_NAV_SET"] (state, left_nav) {
    state.left_nav = left_nav
  },
}

// Actions
var actions = {
  set_left_nav: ({ commit, state }, left_nav) => {
    commit("LEFT_NAV_SET", left_nav)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
