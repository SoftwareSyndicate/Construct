<template lang="pug">
div.line-graph
  div.chart-container(ref="chart_container")
    svg.graph(height="100%" width="100%" ref="graph")
    
</template>

<script>
  import * as d3 from "d3"

export default {
  name: 'LineGraph',
  props: {
    data: {
      default: ()=>{}
    }
  },
  methods: {
    draw(){
      let data = this.data
      let el = this.$refs.chart_container
      var margin = {top: 0, right: 20, bottom: 30, left: 80},
          width = el.clientWidth - margin.left - margin.right,
          height = el.clientHeight - margin.top - margin.bottom;

      // set the ranges
      var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);

      // define the line
      var valueline = d3.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.close); });

      // append the svg obgect to the body of the page
      // appends a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select(this.$refs.graph)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      // format the data
      data.forEach(function(d) {
        d.date = new Date(d[0])
        d.close = +d[1]
      });

      function make_x_gridlines() {		
        return d3.axisBottom(x)
          .ticks(10)
      }

      // gridlines in y axis function
      function make_y_gridlines() {		
        return d3.axisLeft(y)
          .ticks(10)
      }

      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain([d3.min(data, function(d) { return d.close; }), d3.max(data, function(d) { return d.close; })]);


      // add the X gridlines
      svg.append("g")			
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_gridlines()
              .tickSize(-height)
              .tickFormat("")
             )

      // add the Y gridlines
      svg.append("g")			
        .attr("class", "grid")
        .call(make_y_gridlines()
              .tickSize(-width)
              .tickFormat("")
             )
      
      // Add the valueline path.
      svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

      // Add the X Axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
        .call(d3.axisLeft(y));
    }
  },
  mounted(){
    this.unwatch = this.$watch('data', ()=>{
      console.log(this.data)
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
