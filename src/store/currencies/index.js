import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
  currencies: [],
  sorted_currencies: [],
  currency: {},
  currency_history: [],
  filters: {
    time_interval: 60 * 60 * 1000,
    time_interval_name: "1h",
    order_by: "market_cap_usd",
    reverse: false,
    name: "",
    price_range: {
      high: null,
      low: null,
    },
  },
  shapeshift_rates: [],
  filtered_shapeshift_rates: [],
}

export default  {
  state,
  getters,
  actions,
  mutations,
}
