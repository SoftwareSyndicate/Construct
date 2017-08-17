// Orders
export const currencies = (state) => state.currencies

export const sorted_currencies = (state, commit, rootState) => {
  let sorted = state.currencies.sort(function(a, b){
    return a.rank - b.rank
  })

  if(rootState.navbar.search.length > 0){
    sorted = sorted.filter(c => c.id.includes(rootState.navbar.search))
  }
  return sorted
}

export const currency = (state, commit, rootState) => {
  let id = rootState.route.params.id
  if(id && state.currencies.length > 0){
    return state.currencies.filter(c => c.id == id)[0]
  } else {
    return {}
  }
}

// export const matched_orders = (state) => {
//   return state.orders.filter(order => order.type == "match")
// }

