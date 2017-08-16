// State
const state = {
  brand: "Contruct",
  searching: false,
  search: "",
}

// Getters
var getters = {
  brand: (state, commit, rootState) => {
    let id = rootState.route.params.id
    if(id && rootState.currencies.currencies.length > 0){
      return rootState.currencies.currencies.filter(c => c.id == id)[0].id
    } else {
      return "Construct"
    }
  },
  searching: state =>  state.searching,
  search: state =>  state.search,
}

// Mutations
var mutations = {
  ["SET_BRAND"] (state, brand) {
    state.brand = brand
  },
}

// Actions
var actions = {
  set_brand: ({ commit, state }, brand) => {
    commit("SET_BRAND", brand)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
