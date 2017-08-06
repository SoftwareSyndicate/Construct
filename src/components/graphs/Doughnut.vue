<template lang="pug">
div.doughnut-chart
  div.chart-container
    canvas(ref="canvas")

  
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'DoughnutChart',
  props: {
    
  },
  data () {
    return {
      config: {}
    }
  },
  methods: {
    update(){

    }
  },

  computed: {
    
  },

  mounted(){
    console.log("mounted")
    this.ctx = this.$refs.canvas.getContext("2d")


    var config = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [
            5,
            3
          ],
          backgroundColor: [
            window.chartColors.red,
            window.chartColors.orange,
            window.chartColors.yellow,
            window.chartColors.green,
            window.chartColors.blue,
          ],
          label: 'Dataset 1'
        }],
        labels: [
          "Red",
          "Orange",
          "Yellow",
          "Green",
          "Blue"
        ]
      },
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Doughnut Chart'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };

    // this.collect_orders(["LTC-USD"])

		// var ctx = document.getElementById("canvas").getContext("2d");
		// window.myLine = new Chart(ctx, this.config);

  }
}
  </script>


<style scoped lang="stylus">
  
  
</style>
