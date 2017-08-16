import * as types from './mutation-types'
import Vue from 'vue'

export const fetch_currencies = ({commit, state}) => {
  Vue.http.get('https://api.coinmarketcap.com/v1/ticker/?limit=100').then(response => {
    let currencies = response.body
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
