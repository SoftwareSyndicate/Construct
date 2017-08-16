// Orders
export const currencies = (state) => state.currencies

export const sorted_currencies = (state) => {
  return state.currencies.sort(function(a, b){
    return a.rank - b.rank
  })
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

