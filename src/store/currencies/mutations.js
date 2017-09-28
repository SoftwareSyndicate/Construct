import Vue from 'vue'
import * as types from './mutation-types'

export default {
  [types.UPDATE_CURRENCIES] (state, currencies) {
    currencies.forEach(c => {
      let found = false
      for(let i = 0; i < state.currencies.length; i++){
        if(state.currencies[i].id == c.id){
          Vue.set(state.currencies, i, Object.assign(state.currencies[i], c))
          found = true
        }
      }
      if(!found){
        state.currencies.push(c)
      }
    })
    state.currencies = Object.assign(state.currencies, currencies)
  },
  [types.UPDATE_CURRENCY] (state, currency) {
    for(let i = 0; i < state.currencies.length; i++){
      if(state.currencies[i].id == currency.id){
        Vue.set(state.currencies, i, Object.assign(state.currencies[i], currency))
      }
    }
  },
  [types.UPDATE_FILTERS] (state, filters) {
    state.filters = Object.assign(state.filters, filters)
  },
  [types.RESET_FILTERS] (state) {
    state.filters = {
      time_interval: 60 * 60 * 1000,
      time_interval_name: "1h",
      order_by: "market_cap_usd",
      reverse: false,
      name: "",
      price_range: {
        high: null,
        low: null,
      },
      market_cap_range: {
        high: null,
        low: null,
      },
      percent_change_1hr_range: {
        high: null,
        low: null,
      },
      percent_change_24hr_range: {
        high: null,
        low: null,
      },
      percent_change_7day_range: {
        high: null,
        low: null,
      },
    }
  },  
  [types.RECIEVE_CURRENCY_HISTORY] (state, currency_history) {
    state.currency_history = currency_history
  },
  [types.RECIEVE_SHAPESHIFT_RATES] (state, {rates}) {
    state.shapeshift_rates = rates
  },
  [types.RECIEVE_SHAPESHIFT_RATES] (state, {rates}) {
    state.shapeshift_rates = rates
  },
  [types.LOAD_CURRENCIES] (state, oldState) {
    state.currencies = oldState.currencies
    state.sorted_currencies = oldState.sorted_currencies
    state.currency = oldState.currency
    state.shapeshift_rates = oldState.shapeshift_rates
    state.filtered_shapeshift_rates = oldState.filtered_shapeshift_rates
  },

}
