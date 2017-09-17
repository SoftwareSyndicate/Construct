import { set } from 'vue'
import * as types from './mutation-types'

export default {
  [types.RECIEVE_CURRENCIES] (state, {currencies}) {
    state.currencies = currencies
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
  [types.UPDATE_GRAPHS] (state, graphs) {
    state.graphs = Object.assign(state.graphs, graphs)
  },
  [types.REMOVE_ALL_GRAPHS] (state) {
    state.graphs = []
  },
  [types.ADD_GRAPH] (state, name) {
    state.graphs.push({
      name: name + "-USD",
      lines: [
        {
          type: 'price',
          color: 'blue',
          active: true,
        },
        {
          type: 'candlestick',
          color: 'blue',
          active: false,
        },
        {
          type: 'williams',
          color: 'blue',
          active: false,
        },
      ]
    })
  },
  [types.UPDATE_GRAPH_CURRENCY] (state, currency) {
    state.graphs.forEach(c => {
      if(c.name == currency.name){
        c = currency
      }
    })
  },
  [types.TOGGLE_GRAPH_LINE] (state, {currency, line}) {
    state.graphs.forEach(c => {
      if(c.name == currency.name){
        c.lines.forEach(l => {
          if(l.type == line.type){
            l.active = !l.active
          }
        })
      }
    })
  },
  [types.ADD_GRAPH_CURRENCY] (state, currency) {
    state.graphs.push(currency)
  },
  [types.REMOVE_GRAPH_CURRENCY] (state, currency) {
    state.graphs = state.graphs.filter(c => c.name != currency.name)
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
