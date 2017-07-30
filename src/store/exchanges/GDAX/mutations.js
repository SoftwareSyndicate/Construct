import { set } from 'vue'
import * as types from './mutation-types'

export default {
  [types.PUSH_ORDER] (state, {order}) {
    state.orders.push(order)
  },
  [types.START_COLLECTION] (state) {
    state.collecting = true
  },
  [types.STOP_COLLECTION] (state) {
    state.collecting = false
  },
  
}
