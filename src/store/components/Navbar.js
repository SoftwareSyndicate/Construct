// State
const state = {
  brand: "Contruct",
  searching: false,
  search: "",
}

// Getters
var getters = {
  brand: state => state.brand,
  searching: state =>  state.searching,
  search: state =>  state.search,
}

// Mutations
var mutations = {
  ["SET_BRAND"] (state, brand) {
    state.brand = brand
  },
  ["SET_SEARCHING"] (state, searching) {
    state.searching = searching
  },
  ["SET_SEARCH"] (state, search) {
    state.search = search
  },
}

// Actions
var actions = {
  set_brand: ({ commit, state }, brand) => {
    commit("SET_BRAND", brand)
  },
  set_search: ({ commit, state }, search) => {
    commit("SET_SEARCH", search)
  },
  set_searching: ({ commit, state }, searching) => {
    commit("SET_SEARCHING", searching)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
