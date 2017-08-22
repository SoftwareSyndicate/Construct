<template lang="pug">
div.doughnut-chart
  div.chart-container(ref="chart_container")
    svg.graph(height="100%" width="100%" ref="graph")
  
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'DoughnutChart',
  props: {
    title: {
      default: "Default Title"
    },
    data: {
      default: ()=>[]
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

  }
}
  </script>


<style scoped lang="stylus">

  
</style>
