// Orders
export const currencies = (state) => state.currencies
export const currency_history = (state) => state.currency_history

export const sorted_currencies = (state, commit, rootState) => {
  // Order By
  let sorted = state.currencies.sort(function(a, b){
    return b[state.filters.order_by] - a[state.filters.order_by]
  })

  if(rootState.navbar.search.length > 0){
    sorted = sorted.filter(c => c.id.includes(rootState.navbar.search.toLowerCase()))
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

export const shapeshift_rates = (state) => state.shapeshift_rates

export const filtered_shapeshift_rates = (state, commit, rootState) => {
  let id = rootState.route.params.id
  if(id && state.currencies.length > 0){
    let currency = state.currencies.filter(c => c.id == id)[0]
    return state.shapeshift_rates.filter(rate => rate.pair.split("_")[0].includes(currency.symbol))
  } else {
    return []
  }
  
  let sorted = state.currencies.sort(function(a, b){
    return a.rank - b.rank
  })

  if(rootState.navbar.search.length > 0){
    sorted = sorted.filter(c => c.id.includes(rootState.navbar.search.toLowerCase()))
  }
  return sorted
}

