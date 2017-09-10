// Orders
export const currencies = (state) => state.currencies
export const currency_history = (state) => state.currency_history

export const sorted_currencies = (state, commit, rootState) => {
  // Order By
  let orderBy = state.filters.order_by
  let sorted = state.currencies.sort((a, b) => {
    if(orderBy != "name"){
      return parseInt(b[orderBy]) - parseInt(a[orderBy])
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
  if(state.filters.price_range.low){
    let low = state.filters.price_range.low
    let high = state.filters.price_range.high
    sorted = sorted.filter(c => {
      if(parseFloat(c.price_usd) > low && parseFloat(c.price_usd) < high){
        return true
      } else {
        return false
      }
    })
  }
  
  // Market Cap Range
  if(state.filters.market_cap_range.low){
    let low = state.filters.market_cap_range.low
    let high = state.filters.market_cap_range.high
    sorted = sorted.filter(c => {
      if(parseFloat(c.market_cap_usd) > low && parseFloat(c.market_cap_usd) < high){
        return true
      } else {
        return false
      }
    })
  }

  // 1Hr %
  if(state.filters.percent_change_1hr_range.low){
    let low = state.filters.percent_change_1hr_range.low
    let high = state.filters.percent_change_1hr_range.high

    sorted = sorted.filter(c => {
      if(parseFloat(c.percent_change_1h) > low && parseFloat(c.percent_change_1h) < high){
        return true
      } else {
        return false
      }
    })
  }
  
  // 24Hr %
  if(state.filters.percent_change_24hr_range.low){
    let low = state.filters.percent_change_24hr_range.low
    let high = state.filters.percent_change_24hr_range.high

    sorted = sorted.filter(c => {
      if(parseFloat(c.percent_change_24h) > low && parseFloat(c.percent_change_24h) < high){
        return true
      } else {
        return false
      }
    })
  }
  
  // 7 Day %
  if(state.filters.percent_change_7day_range.low){
    let low = state.filters.percent_change_7day_range.low
    let high = state.filters.percent_change_7day_range.high

    sorted = sorted.filter(c => {
      if(parseFloat(c.percent_change_7d) > low && parseFloat(c.percent_change_7d) < high){
        return true
      } else {
        return false
      }
    })
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

