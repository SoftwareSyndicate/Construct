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
    graph_data: {
      default: ()=>[]
    },
  },
  methods: {
    draw(data){
      
      // format the data
      data.forEach(function(d) {
        d.date = new Date(d.time)
        d.close = +d.close
      });

      // define the line
      this.valueline = d3.line()
          .x((d) => { return this.x(d.date); })
          .y((d) => { return this.y(d.close); });

      this.area = d3.area()
          .x((d) => { return this.x(d.date); })
          .y0(this.height)
          .y1((d) => { return this.y(d.close); });
      

      // Scale the range of the data
      this.x.domain(d3.extent(data, function(d) { return d.date; }));
      this.y.domain([d3.min(data, function(d) { return d.close; }), d3.max(data, function(d) { return d.close; })]);

      if(!this.hasDrawn){
        this.hasDrawn = true;
        // Add the valueline path.
        this.svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("d", this.valueline);

        this.svg.append("path")
          .data([data])
          .attr("class", "area")
          .attr("d", this.area);
      } else {
        this.svg = d3.select(this.$refs.graph).transition()
        this.svg.select(".line") 
          .duration(500)
          .attr("d", this.valueline(data));
        this.svg.select(".area") 
          .duration(500)
          .attr("d", this.area(data));
      }
    },
  },
  
  watch: {
    graph_data: {
      handler: function(newVal, oldVal){
        if(this.graph_data.length > 0){
          this.draw(this.graph_data)            
        }
      },
    }
  },
  
  mounted(){
    // Init Dom
    this.el = this.$refs.chart_container
    this.margin = {top: 0, right: 0, bottom: 0, left: 0}
    this.width = this.el.clientWidth
    this.height = this.el.clientHeight

    // set the ranges
    this.x = d3.scaleTime().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);
    
    this.svg = d3.select(this.$refs.graph)
      .append("g")
      .attr("transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")");

    if(this.graph_data.length > 0){
      this.draw(this.graph_data)            
    }

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
  svg
    height 100% !important       
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
