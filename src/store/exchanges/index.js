import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
  name: 'GDAX',
  markets: [
    {
      name: "LTC-USD",
      orders: [],
    },
    {
      name: "ETH-USD",
      orders: [],
    },
    {
      name: "BTC-USD",
      orders: [],
    }
  ],
}

export default {
  state,
  getters,
  actions,
  mutations,
}
