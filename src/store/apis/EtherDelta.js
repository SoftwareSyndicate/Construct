// https://github.com/etherdelta/etherdelta.github.io/blob/master/docs/API.md

import Vue from 'vue'
const base_url = "https://api.etherdelta.com"

export default {
  fetch_all_tickers: () => {
    return new Promise((resolve, reject) => {
      Vue.http.get(base_url + "/returnTicker").then(response => {
        resolve(response.body)
      }, error => {
        reject(error)
      })
    })
  },
  fetch_recent_trades: (address, page=0) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(base_url + "/trades/" + address + "/" + page).then(response => {
        resolve(response.body)
      }, error => {
        reject(error)
      })
    })    
  },
  fetch_orders: (address, page=0) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(base_url + "/orders/" + address + "/" + page).then(response => {
        resolve(response.body)
      }, error => {
        reject(error)
      })
    })    
  },
  // TODO
  submit_order: () => {
    return new Promise((resolve, reject) => {
      // TODO https://github.com/etherdelta/etherdelta.github.io/blob/master/docs/API.md#post-httpsapietherdeltacommessage
      Vue.http.post(base_url + "/message").then(response => {
        resolve(response.body)
      }, error => {
        reject(error)
      })
    })    
  }
  
}
