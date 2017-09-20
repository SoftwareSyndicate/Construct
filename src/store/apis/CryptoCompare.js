import Vue from 'vue'
const base_url = "https://min-api.cryptocompare.com/"

export default {
  fetch_currency_history_by_minute: (symbol) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(base_url + "data/histominute?" + symbol).then(response => {
        resolve(response.body)
      }, error => {
        reject(error)
      })
    })
  },
  watch_currency_history_by_minute: (symbol, rate, cb) => {
    return setInterval(()=>{
      this.fetch_currency_history_by_minute(symbol).then(results => {
        cb(results)
      }).catch(error => {
        cb(error)
      })
    }, rate)
  }
}
