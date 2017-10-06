// Orders
export const currencies = (state) => state.currencies
export const currency_history = (state) => state.currency_history
export const auto_update = (state) => state.filters.auto_update

export const sorted_currencies = (state, commit, rootState) => {
  // Order By
  let orderBy = state.filters.order_by
  let sorted = state.currencies.sort((a, b) => {
    if(orderBy != "name"){
      return parseFloat(b[orderBy]) - parseFloat(a[orderBy])
    } else {
      if(a[orderBy] < b[orderBy]) return -1
      if(a[orderBy] > b[orderBy]) return 1
      return 0;      
    }
  })

  // Reverse
  if(state.filters.reverse){
    sorted = sorted.reverse()
  }

  // Name
  if(state.filters.name.length > 0){
    sorted = sorted.filter(c => c.id.includes(state.filters.name.toLowerCase()))
  }
  
  // Price Range
  sorted = sorted.filter(c => {
    if(parseFloat(c.price_usd) > state.filters.price_range_min && parseFloat(c.price_usd) < state.filters.price_range_max){
      return true
    } else {
      return false
    }
  })

  
  // Market Cap Range
  sorted = sorted.filter(c => {
    if(parseFloat(c.market_cap_usd) > state.filters.market_cap_range_min && parseFloat(c.market_cap_usd) < state.filters.market_cap_range_max){
      return true
    } else {
      return false
    }
  })


  // 1Hr %
  sorted = sorted.filter(c => {
    if(parseFloat(c.percent_change_1h) > state.filters.percent_change_1hr_range_min && parseFloat(c.percent_change_1h) < state.filters.percent_change_1hr_range_max){
      return true
    } else {
      return false
    }
  })

  
  // 24Hr %
  sorted = sorted.filter(c => {
    if(parseFloat(c.percent_change_24h) > state.filters.percent_change_24hr_range_min && parseFloat(c.percent_change_24h) < state.filters.percent_change_24hr_range_max){
      return true
    } else {
      return false
    }
  })

  
  // 7 Day %
  sorted = sorted.filter(c => {
    if(parseFloat(c.percent_change_7d) > state.filters.percent_change_7day_range_min && parseFloat(c.percent_change_7d) < state.filters.percent_change_7day_range_max){
      return true
    } else {
      return false
    }
  })
  
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

