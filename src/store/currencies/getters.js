// Orders
export const currencies = (state) => state.currencies

export const sorted_currencies = (state) => {
  return state.currencies.sort(function(a, b){
    return a.rank - b.rank
  })
}

// export const buy_orders = (state) => {
//   return state.orders.filter(order => order.side == "buy")
// }

// export const matched_orders = (state) => {
//   return state.orders.filter(order => order.type == "match")
// }

