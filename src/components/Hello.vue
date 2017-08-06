<template lang="pug">
div.hello
  div(style="width:100%;")
    canvas#canvas

  
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'hello',
  data () {
    return {
      config: {}
    }
  },
  methods: {
    ...mapActions({
      collect_orders: "collect_orders"
    }),
  },

  computed: {
    ...mapGetters({
      orders: 'orders'
    }),
  },
  // watch: {
  //   matched_orders: function (val, oldVal) {
  //     if(this.matched_orders.length > 0){
  //       log('hi')
  //       let order = [...this.matched_orders].pop()
  //       var timeFormat = 'HH:mm:ss';
  //       let point =  {
	// 			  x: moment(order.time).format(timeFormat),
	// 			  y: order.price,
	// 		  }

  //       if(order.side == 'buy'){
	// 		    this.config.data.datasets[0].data.push(point);
  //       }

  //       if(order.side == 'sell'){
	// 		    this.config.data.datasets[1].data.push(point);
  //       }
	// 		  window.myLine.update();
  //     }
  //   },
  // },

  mounted(){

    // console.log(this.$style)
    let exampleSocket = new WebSocket("wss://ws-feed.gdax.com")

    exampleSocket.onopen = function (event) {
      let sub  = {
        type: "subscribe",
        product_ids: [
          "LTC-USD"
        ]
      }
      exampleSocket.send(JSON.stringify(sub));
    };

    exampleSocket.onmessage = function (event) {
      // log(event)
      let order = JSON.parse(event.data)
      let point =  {
				x: moment(order.time).format(timeFormat),
				y: order.price,
			}

      if(order.size  && order.type == "match"){
        if(order.side == 'buy'){
			    this.config.data.datasets[0].data.push(point);
        }

        if(order.side == 'sell'){
			    this.config.data.datasets[1].data.push(point);
        }

			  window.myLine.update();
      }
    }.bind(this)

    
    var timeFormat = 'HH:mm:ss';
		function newDate(days) {
			return moment().add(days, 'd').toDate();
		}
		function newDateString(days) {
			return moment().add(days, 'd').format(timeFormat);
		}
		function newTimestamp(days) {
			return moment().add(days, 'd').unix();
		}
		var color = Chart.helpers.color;
		this.config = {
			type: 'line',
			data: {
				labels: [ // Date Objects
					// newDate(0),
					// newDate(1),
					// newDate(2),
					// newDate(3),
					// newDate(4),
					// newDate(5),
					// newDate(6)
				],
				datasets: [
          {
            steppedLine: true,
					  label: "Buy Orders",
					  backgroundColor: this.$style.green,
					  borderColor: this.$style.green,
					  fill: false,
					  data: [],
				  },

          {
            steppedLine: true,
					  label: "Sell Orders",
					  backgroundColor: this.$style.red,
					  borderColor: this.$style.red,
					  fill: false,
					  data: [],
				  }
        ]
			},

			options: {
        legend: {
          display: false
        },
				scales: {
					xAxes: [{
						type: "time",
						time: {
							format: timeFormat,
							tooltipFormat: 'll HH:mm:ss'
						},
						scaleLabel: {
							display: false,
							labelString: 'Date'
						}
					}, ],
					yAxes: [{
						scaleLabel: {
							display: false,
							labelString: 'value'
						}
					}]
				},
			}
		};
    
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myLine = new Chart(ctx, this.config);

  }
}
</script>


<style lang="stylus" module>
@import "../styles/main.styl"
  
</style>
