const state = {
  name: 'GDAX',
  collecting: true,
  orders: [],
  supported_markets: [
    {
      name: "LTC-USD",
    },
    {
      name: "ETH-USD",
    },
    {
      name: "BTC-USD",
    }
  ],
  config: {
    api_key: "AIzaSyDSdshXu8tQGDlcUD3IGwKO7pH8mYn7KYI",
    api_secret: "AIzaSyDSdshXu8tQGDlcUD3IGwKO7pH8mYn7KYI",
    web_socket_uri: "wss://ws-feed.gdax.com",
  }  
}

var getters = {
  // first_name: state =>  state.first_name,
}

// Mutations
var mutations = {
  // ["SET_FIRST_NAME"] (state, first_name) {
  //   state.first_name = first_name
  // },
}

// Actions
var actions = {
  collect_orders: ({commit, state}, markets) => {

    let sock = new WebSocket(config.web_socket_uri)

    sock.onopen = function (event) {
      console.log(event)
      let sub  = {
        type: "subscribe",
        product_ids: market_list
      }

      sock.send(JSON.stringify(sub));
    };

    sock.onmessage = function (event) {
      cb(event)
    }
    
    let on_event = function(event){
      let order = JSON.parse(event.data)
      commit(types.PUSH_ORDER, {order})
    }    
    api.collect_orders(on_event, ["LTC-USD"])
  },
}


export default {
  state,
  getters,
  actions,
  mutations,
}
