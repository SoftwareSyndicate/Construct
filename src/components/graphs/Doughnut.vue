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
    title: {
      default: "Default Title"
    }
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
            this.$style.green,
            this.$style.red,
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
          display: false,
          text: this.title
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };
  }
}
  </script>


<style scoped lang="stylus" module>
@import "../../styles/main.styl"  
  
</style>
