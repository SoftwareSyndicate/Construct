import { set } from 'vue'
import * as types from './mutation-types'

export default {
  [types.RECIEVE_CURRENCIES] (state, {currencies}) {
    state.currencies = currencies
  },
  [types.UPDATE_FILTERS] (state, filters) {
    state.filters = Object.assign(state.filters, filters)
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
