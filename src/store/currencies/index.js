import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
  limit: CONFIG.limit,
  rate: 1000 * 30,
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
    auto_update: true,
    name: "",
    price_range_min: 0,
    price_range_max: 10000,
    market_cap_range_min: 0,
    market_cap_range_max: 1000000000000,
    percent_change_1hr_range_min: -100,
    percent_change_1hr_range_max: 100,
    percent_change_24hr_range_min: -100,
    percent_change_24hr_range_max: 100,
    percent_change_7day_range_min: -100,
    percent_change_7day_range_max: 100,
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
