// State
const state = {
  modal: {
    open: false,
    header: "",
    component: null
  }
}

// Getters
var getters = {
  modal: state =>  state.modal
}

// Mutations
var mutations = {
  ["UPDATE_MODAL"] (state, modal) {
    state.modal = modal
  },
}

// Actions
var actions = {
  updateModal: ({ commit, state }, modal) => {
    commit("UPDATE_MODAL", modal)
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}
