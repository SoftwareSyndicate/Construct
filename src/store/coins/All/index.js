import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
  name: 'All',
  coins: [],
}

export default {
  state,
  getters,
  actions,
  mutations,
}
