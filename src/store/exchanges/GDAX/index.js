import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
  name: 'GDAX',
  collecting: true,
  orders: [],
  supported_markets: [
    {
      name: "LTC-USD",
    },
    {
      name: "ETH-USD",
    },
    {
      name: "BTC-USD",
    }
  ],
}

export default {
  state,
  getters,
  actions,
  mutations,
}
