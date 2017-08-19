import * as types from './mutation-types'
import Vue from 'vue'
import APIs from '../apis'

export const fetch_currencies = ({commit, state}) => {
  Vue.http.get('https://api.coinmarketcap.com/v1/ticker/?limit=100').then(response => {
    let currencies = response.body
    // console.log(currencies[6])
    commit(types.RECIEVE_CURRENCIES, {currencies})
  }, error => {

  });

  // TODO Unhack
  setInterval(()=> {
    Vue.http.get('https://api.coinmarketcap.com/v1/ticker/?limit=100').then(response => {
      let currencies = response.body
      commit(types.RECIEVE_CURRENCIES, {currencies})
    }, error => {

    });
  }, 5000)
}

export const fetch_currency_history = ({commit, state}, currency) => {
  log(currency.symbol)
  Vue.http.get("http://www.coincap.io/history/1day/" + currency.symbol).then(response => {
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
