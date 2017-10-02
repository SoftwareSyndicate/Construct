// State
const state = {
  first_name: "Tyler",
  last_name: "Durden",
  base_fiat: "USD",
  email: "fight@club.com",
  transition: null,
}

// Getters
var getters = {
  first_name: state =>  state.first_name,
  last_name: state =>  state.last_name,
}

// Mutations
var mutations = {
  ["UPDATE_FIRST_NAME"] (state, first_name) {
    state.first_name = first_name
  },
  ["UPDATE_LAST_NAME"] (state, last_name) {
    state.last_name = last_name
  },
  ["UPDATE_EMAIL"] (state, email) {
    state.email = email
  },
  ["UPDATE_BASE_FIAT"] (state, base_fiat) {
    state.base_fiat = base_fiat
  },
  ["LOAD_USER"] (state, oldState) {
    state.first_name = oldState.first_name
    state.last_name = oldState.last_name
    state.email = oldState.email
    state.base_fiat = oldState.base_fiat
  },
}

// Actions
var actions = {
  load_user: ({ commit, state }) => {
    let user = localStorage.getItem("user");
    if(user){
      commit("LOAD_USER", JSON.parse(user))
    }
  },
  save_user: ({ commit, state }) => {
    let user = JSON.stringify(state)
    localStorage.setItem("user", user)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
