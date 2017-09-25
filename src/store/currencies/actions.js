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

// CURRENCY HISTORIES
export const fetch_currency_histories = ({commit, state}, currencies) => {
  currencies.forEach(currency => {  
    return APIs.CryptoCompare.fetch_currency_history_by_minute(currency.symbol).then(results=> {
      Vue.set(currency, 'history', results.Data)
      commit(types.UPDATE_CURRENCY_HISTORY, currency)
      return results
    })
  })
}

export const watch_currency_histories =  ({commit, state}, currencies) => {
  let watchers = []
  currencies.forEach(currency => {
    watchers.push(APIs.CryptoCompare.watch_currency_history_by_minute(currency.symbol,  state.rate, (results) => {
      Vue.set(currency, 'history', results.Data)
      commit(types.UPDATE_CURRENCY_HISTORY, currency)      
      return results
    }))
  })
  return watchers
}

export const fetch_currencies = ({commit, state}) => {
  Vue.http.get('https://api.coinmarketcap.com/v1/ticker/?limit=' + state.limit).then(response => {
    let currencies = response.body
    commit(types.RECIEVE_CURRENCIES, currencies)

    let promises = []
    currencies.forEach(currency => {
      promises.push(Vue.http.get("https://min-api.cryptocompare.com/data/histominute?fsym=" + currency.symbol + "&tsym=USD&limit=1440&aggregate=60&e=CCCAGG").then(response => {
        currency.history = response.body.Data
      }, error => {

      }))
    })

    Promise.all(promises).then(results => {
      commit(types.RECIEVE_CURRENCIES, {currencies})      
    })

  }, error => {

  });

  // TODO Unhack
  setInterval(()=> {
    Vue.http.get('https://api.coinmarketcap.com/v1/ticker/?limit=' + state.limit).then(response => {
      let currencies = response.body
      commit(types.RECIEVE_CURRENCIES, {currencies})

      let promises = []
      currencies.forEach(currency => {
        promises.push(Vue.http.get("https://min-api.cryptocompare.com/data/histominute?fsym=" + currency.symbol + "&tsym=USD&limit=1440&aggregate=60&e=CCCAGG").then(response => {
          currency.history = response.body.Data
        }, error => {

        }))
      })

      Promise.all(promises).then(results => {
        commit(types.RECIEVE_CURRENCIES, {currencies})      
      })
    }, error => {

    });
    
  }, 60000)
}

// TODO THROW INTO API
export const fetch_currency_history = ({commit, state}, symbol) => {
  return Vue.http.get("https://min-api.cryptocompare.com/data/histominute?fsym=" + symbol + "&tsym=USD&limit=1440&aggregate=60&e=CCCAGG").then(response => {
    commit(types.RECIEVE_CURRENCY_HISTORY, response.body.Data)    
    return response.body.Data
  })
  
  setInterval(()=> {
    return Vue.http.get("https://min-api.cryptocompare.com/data/histominute?fsym=" + symbol + "&tsym=USD&limit=1440&aggregate=60&e=CCCAGG").then(response => {
      commit(types.RECIEVE_CURRENCY_HISTORY, response.body.Data)    
      return response.body.Data
    })
  }, 60000)
}


export const fetch_currency_calendar = ({commit, state}, currency) => {
  log(currency)
  Vue.http.get("https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&e=CCCAGG&allData=true").then(response => {
    let data = response.body
    commit(types.RECIEVE_CURRENCY_HISTORY, data)
  }, error => {

  });
}


export const fetch_shapeshift_market_info = ({commit, state}) => {
  return APIs.ShapeShift.fetch_shapeshift_market_info().then(rates => {
    commit(types.RECIEVE_SHAPESHIFT_RATES, {rates})
  })
}


export const load_currencies = ({ commit, state }) => {
  let currencies = localStorage.getItem("currencies");
  if(currencies){
    commit("LOAD_CURRENCIES", JSON.parse(currencies))
  }
}

export const save_currencies = ({ commit, state }) => {
  let currencies = JSON.stringify(state)
  localStorage.setItem("currencies", currencies)
}
