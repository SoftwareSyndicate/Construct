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
    if(id){
      return id
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
  
}

export default {
  state,
  getters,
  mutations,
  actions
}
