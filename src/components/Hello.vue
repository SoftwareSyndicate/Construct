<template lang="pug">
div.hello
  div(style="width:100%;")
    canvas#canvas

  
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {

    }
  },
  mounted(){
    console.log("mounted")
    let exampleSocket = new WebSocket("wss://ws-feed.gdax.com")

    exampleSocket.onopen = function (event) {
      console.log(event)
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
				y: order.size * order.price,
			}

      if(order.size  && order.type == "match"){
        console.log(order)
        
        if(order.side == 'buy'){
			    config.data.datasets[0].data.push(point);
        }

        if(order.side == 'sell'){
			    config.data.datasets[1].data.push(point);
        }

			  window.myLine.update();
      }
    }

    
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
		var config = {
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
					  backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
					  borderColor: window.chartColors.green,
					  fill: false,
					  data: [],
				  },

          {
            steppedLine: true,
					  label: "Sell Orders",
					  backgroundColor: "rgba(255, 51, 51, .7)",
					  borderColor: "rgba(255, 51, 51, .7)",
					  fill: false,
					  data: [],
				  }
        ]
			},

			options: {
        title:{
          text: "Chart.js Time Scale"
        },
        legend: {
          display: false
        },
				scales: {
					xAxes: [{
						type: "time",
						time: {
							format: timeFormat,
							// round: 'day'
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
		window.onload = function() {
			var ctx = document.getElementById("canvas").getContext("2d");
			window.myLine = new Chart(ctx, config);
		};
		// document.getElementById('randomizeData').addEventListener('click', function() {
		// 	config.data.datasets.forEach(function(dataset) {
		// 		dataset.data.forEach(function(dataObj, j) {
		// 			if (typeof dataObj === 'object') {
		// 				dataObj.y = randomScalingFactor();
		// 			} else {
		// 				dataset.data[j] = randomScalingFactor();
		// 			}
		// 		});
		// 	});
		// 	window.myLine.update();
		// });
		var colorNames = Object.keys(window.chartColors);
    
		// document.getElementById('addDataset').addEventListener('click', function() {
		// 	var colorName = colorNames[config.data.datasets.length % colorNames.length];
		// 	var newColor = window.chartColors[colorName]
		// 	var newDataset = {
		// 		label: 'Dataset ' + config.data.datasets.length,
		// 		borderColor: newColor,
		// 		backgroundColor: color(newColor).alpha(0.5).rgbString(),
		// 		data: [],
		// 	};
		// 	for (var index = 0; index < config.data.labels.length; ++index) {
		// 		newDataset.data.push(randomScalingFactor());
		// 	}
		// 	config.data.datasets.push(newDataset);
		// 	window.myLine.update();
		// });
		// document.getElementById('addData').addEventListener('click', function() {
		// 	if (config.data.datasets.length > 0) {
		// 		config.data.labels.push(newDate(config.data.labels.length));
		// 		for (var index = 0; index < config.data.datasets.length; ++index) {
		// 			if (typeof config.data.datasets[index].data[0] === "object") {
		// 				config.data.datasets[index].data.push({
		// 					x: newDate(config.data.datasets[index].data.length),
		// 					y: randomScalingFactor(),
		// 				});
		// 			} else {
		// 				config.data.datasets[index].data.push(randomScalingFactor());
		// 			}
		// 		}
		// 		window.myLine.update();
		// 	}
		// });
		// document.getElementById('removeDataset').addEventListener('click', function() {
		// 	config.data.datasets.splice(0, 1);
		// 	window.myLine.update();
		// });
		// document.getElementById('removeData').addEventListener('click', function() {
		// 	config.data.labels.splice(-1, 1); // remove the label first
		// 	config.data.datasets.forEach(function(dataset, datasetIndex) {
		// 		dataset.data.pop();
		// 	});
		// 	window.myLine.update();
		// });

  }
}
</script>


<style scoped lang="stylus">
 
  
</style>
