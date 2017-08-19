import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
  currencies: [],
  sorted_currencies: [],
  currency: {},
  currency_history: {},
  shapeshift_rates: [],
  filtered_shapeshift_rates: [],
}

export default  {
  state,
  getters,
  actions,
  mutations,
}
