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
  ["set_brand"] (state, brand) {
    state.brand = brand
  },
  ["set_searching"] (state, searching) {
    state.searching = searching
  },
  ["set_search"] (state, search) {
    state.search = search
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
