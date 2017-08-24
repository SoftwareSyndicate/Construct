<template lang="pug">
div.list-item-line
  div.chart-container(ref="chart_container")
    svg.graph(height="100%" width="100%" ref="graph")
    
</template>

<script>
import * as d3 from "d3"

export default {
  name: 'ListItemLine',
  props: {
    data: {
      default: ()=>[]
    },
  },
  methods: {
    draw(data){
      let el = this.$refs.chart_container
      var margin = {top: 0, right: 0, bottom: 0, left: 0},
          width = el.clientWidth - margin.left - margin.right,
          height = el.clientHeight - margin.top - margin.bottom;

      // format the data
      data.forEach(function(d) {
        d.date = new Date(d.time)
        d.close = +d.close
      });

      // set the ranges
      var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);

      // define the line
      var valueline = d3.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.close); });

      var area = d3.area()
          .x(function(d) { return x(d.date); })
          .y0(height)
          .y1(function(d) { return y(d.close); });
      
      var svg = d3.select(this.$refs.graph)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain([d3.min(data, function(d) { return d.close; }), d3.max(data, function(d) { return d.close; })]);

      // Add the valueline path.
      svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

      svg.append("path")
       .data([data])
       .attr("class", "area")
       .attr("d", area);
      
    },

    update(){
      
    }
  },
  watch: {
    data: {
      handler: function(oldVal, newVal){
        if(newVal){
          setTimeout(()=> {
            this.draw(newVal)            
            this.updating = false
          }, 30)
        }
      },
      deep: true,
      immediate: true,
    }
  },
  
  mounted(){
    
  }
}
  </script>


<style lang="stylus">
@import "../../styles/main.styl"
  
.list-item-line
  flex-basis 100%
  display flex
  align-items center
  height 100%    
  .chart-container
    flex-basis 100%
    display flex
    align-items center
    height 100%        
  .line 
    fill none
    stroke steelblue
    stroke-opacity .1
    stroke-width: 2px

  .area 
    fill lightsteelblue
    fill-opacity .1

  .grid line 
    stroke: lightgrey;
    stroke-opacity: 0.7;
    shape-rendering: crispEdges;

  .grid path 
    stroke-width: 0;
    
</style>
