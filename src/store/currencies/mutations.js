import { set } from 'vue'
import * as types from './mutation-types'

export default {
  [types.RECIEVE_CURRENCIES] (state, {currencies}) {
    state.currencies = currencies
  },
  [types.RECIEVE_SHAPESHIFT_RATES] (state, {rates}) {
    state.shapeshift_rates = rates
  },

}
