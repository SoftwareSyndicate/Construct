import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
  currencies: [],
  sorted_currencies: [],
  currency: {},
}

export default  {
  state,
  getters,
  actions,
  mutations,
}
