import * as api from './api'
import * as types from './mutation-types'


export const collect_orders = ({commit, state}, markets) => {
  let on_event = function(event){
    let order = JSON.parse(event.data)
    commit(types.PUSH_ORDER, {order})
  }    
  api.collect_orders(on_event, ["LTC-USD"])
}
