import * as types from './mutation-types'
import Vue from 'vue'
import APIs from '../apis'

// CURRENCY LIST
export const fetch_all_currencies = ({commit, state}) => {
  return APIs.CoinMarketCap.fetch_currencies(state.limit).then(results=> {
    commit(types.UPDATE_CURRENCIES, results)
    return results
  })
}

export const watch_all_currencies = ({commit, state}) => {
  return APIs.CoinMarketCap.watch_currencies(state.limit,  state.rate, (results) => {
    commit(types.UPDATE_CURRENCIES, results)
    return results
  })
}

// Fetch CURRENCY HISTORIES
export const fetch_currency_histories = ({commit, state}, currencies) => {
  currencies.forEach(currency => {  
    return APIs.CryptoCompare.fetch_currency_history_by_minute(currency.symbol).then(results=> {
      Vue.set(currency, 'history', results.Data)
      commit(types.UPDATE_CURRENCY, currency)
      return results
    })
  })
}

// Watch CURRENCY HISTORIES
export const watch_currency_histories =  ({commit, state}, currencies) => {
  let watchers = []
  currencies.forEach(currency => {
    watchers.push(APIs.CryptoCompare.watch_currency_history_by_minute(currency.symbol,  state.rate, (results) => {
      Vue.set(currency, 'history', results.Data)
      commit(types.UPDATE_CURRENCY, currency)      
      return results
    }))
  })
  return watchers
}

// Currency (fiat) exchange rates
export const fetch_fiat_exchange_rates = ({commit, state}, base_fiat) => {
  if(!base_fiat){
    base_fiat = state.base_fiat
  }
  return APIs.Fixer.fetch_fiat_exchange_rates(base_fiat).then(results => {
    commit(types.UPDATE_FIAT_EXCHANGE_RATES, results.rates)
    return results.rates
  })
}

// export const fetch_shapeshift_market_info = ({commit, state}) => {
//   return APIs.ShapeShift.fetch_shapeshift_market_info().then(rates => {
//     commit(types.RECIEVE_SHAPESHIFT_RATES, {rates})
//   })
// }
