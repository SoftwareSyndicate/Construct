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
  graphs: [
    {
      name: "ETH-USD",
      lines: [
        {
          type: 'price',
          color: 'blue'
        }
      ]
    },
    {
      name: "LTC-USD",
      lines: [
        {
          type: 'price',
          color: 'green'
        }
      ]
    }
  ],
  line_types: ['price', 'candlestick', 'williams']
}

export default  {
  state,
  getters,
  actions,
  mutations,
}
