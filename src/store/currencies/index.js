import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
  limit: 10,
  rate: 1000 * 30,
  base_fiat: "USD",
  currencies: [],
  sorted_currencies: [],
  currency: {},
  currency_history: [],
  currency_histories: [],
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
  },
  shapeshift_rates: [],
  filtered_shapeshift_rates: [],
  fiat_exchange_rates: null
}

export default  {
  state,
  getters,
  actions,
  mutations,
}
