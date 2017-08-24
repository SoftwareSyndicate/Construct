import * as types from './mutation-types'
import Vue from 'vue'
import APIs from '../apis'

export const fetch_currencies = ({commit, state}) => {
  let limit = 50
  Vue.http.get('https://api.coinmarketcap.com/v1/ticker/?limit=' + limit).then(response => {
    let currencies = response.body
    commit(types.RECIEVE_CURRENCIES, {currencies})

    currencies.forEach(currency => {
      Vue.http.get("https://min-api.cryptocompare.com/data/histominute?fsym=" + currency.symbol + "&tsym=USD&limit=60&aggregate=3&e=CCCAGG").then(response => {
        currency.history = response.body.Data
        // commit(types.RECIEVE_CURRENCY_HISTORY, response.body.Data)

        commit(types.RECIEVE_CURRENCIES, {currencies})
      }, error => {

      });      
    })

  }, error => {

  });

  // TODO Unhack
  setInterval(()=> {
    Vue.http.get('https://api.coinmarketcap.com/v1/ticker/?limit=' + limit).then(response => {
      let currencies = response.body
      commit(types.RECIEVE_CURRENCIES, {currencies})

      currencies.forEach(currency => {
        Vue.http.get("https://min-api.cryptocompare.com/data/histominute?fsym=" + currency.symbol + "&tsym=USD&limit=60&aggregate=3&e=CCCAGG").then(response => {
          currency.history = response.body.Data
          // commit(types.RECIEVE_CURRENCY_HISTORY, response.body.Data)

          commit(types.RECIEVE_CURRENCIES, {currencies})
        }, error => {

        });      
      })

    }, error => {

    });
    
  }, 10000)
}

export const fetch_currency_history = ({commit, state}, currency) => {
  Vue.http.get("https://www.coincap.io/history/1day/" + currency).then(response => {
    let data = response.body
    commit(types.RECIEVE_CURRENCY_HISTORY, data)
  }, error => {

  });
}

// TODO THROW INTO API
// export const fetch_currency_history = ({commit, state}, symbol) => {
//   log(symbol)
//   return Vue.http.get("https://min-api.cryptocompare.com/data/histominute?fsym=" + symbol + "&tsym=USD&limit=600&aggregate=3&e=CCCAGG").then(response => {
//     return response.body.Data
//     // commit(types.RECIEVE_CURRENCY_HISTORY, response.body.Data)
//   }, error => {

//   });
// }


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
