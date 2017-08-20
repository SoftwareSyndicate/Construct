<template lang="pug">
div.calendar-graph
  div.chart-container(ref="chart_container")
    svg.graph(height="100%" width="100%" ref="svg")
    
</template>

<script>
  import * as d3 from "d3"

export default {
  name: 'CalendarGraph',
  props: {
    data: {
      default: ()=>{}
    }
  },
  methods: {
    draw(){
      let data = this.data
      let el = this.$refs.chart_container

      
    }
  },
  mounted(){
    this.unwatch = this.$watch('data', ()=>{
      if(this.data.length > 0){
        this.draw()
      }
    })
  }
}
  </script>


<style lang="stylus">
@import "../../styles/main.styl"
  
.line-graph
  .chart-container
    height 200px
  .line 
    fill none
    stroke darken($blue, 30%)
    stroke-width: 2px

  .grid line 
    stroke: lightgrey;
    stroke-opacity: 0.7;
    shape-rendering: crispEdges;

  .grid path 
    stroke-width: 0;
    
</style>
