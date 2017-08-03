const config = {
  api_key: "AIzaSyDSdshXu8tQGDlcUD3IGwKO7pH8mYn7KYI",
  api_secret: "AIzaSyDSdshXu8tQGDlcUD3IGwKO7pH8mYn7KYI",
  web_socket_uri: "wss://ws-feed.gdax.com",
}

export function collect_orders(cb, market_list=["LTC-USD"]){
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
}

