<template lang="pug">
div.time-series
  p chart
  div.chart-container
    
</template>

<script>
  import * as d3 from "d3"

export default {
  name: 'TimeSeries',
  props: {
    data: {
      default: ()=>{}
    }
  },
  methods: {
    update(){
      // set the dimensions and margins of the graph
      var margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = 360 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

      // parse the date / time
      var parseTime = d3.timeParse("%I:%M %p %a %Y");

      // set the ranges
      var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);

      // define the line
      var valueline = d3.line()
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); });

      // append the svg obgect to the body of the page
      // appends a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select(".chart-container").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      // Get the data
      // d3.csv("data.csv", function(error, data) {

        // format the data
      this.data.forEach(function(d) {
        d.date = new Date(d[0])
        d[0] = new Date(d[0])
        d.close = d[1]
      });

      // Scale the range of the data
      x.domain(d3.extent(this.data, function(d) { return d[0]; }));
      // y.domain([0, d3.max(this.data, function(d) { return d.close; })]);
      y.domain([280, d3.max(this.data, function(d) { return d[1]; })]);

      // Add the valueline path.
      svg.append("path")
        .data([this.data])
        .attr("class", "line")
        .attr("d", valueline);

      // Add the X Axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
        .call(d3.axisLeft(y));
      // })
    },

    chart_it(){
      var margin = {top: 20, right: 20, bottom: 70, left: 40},
          width = 400 - margin.left - margin.right,
          height = 150 - margin.top - margin.bottom;
      // Parse the date / time
      var x = d3.scaleBand().rangeRound([0, width], .05).padding(0.1);
      var y = d3.scaleLinear().range([height, 0]);
      var xAxis = d3.axisBottom()
          .scale(x)
          .tickFormat(d3.timeFormat("%Y-%m-%d"));
      var yAxis = d3.axisLeft()
          .scale(y)
          .ticks(10);
      var svg = d3.select(".chart-container").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      this.data.forEach(function(d) {
        d.date = new Date(d[0])
        d.value = +d[1]
      });
      x.domain(this.data.map(function(d) { return d.date; }));
      y.domain([0, d3.max(this.data, function(d) { return d.value; })]);
      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );
      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value");
      svg.selectAll("bar")
        .data(this.data)
        .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function(d) { return x(d.date); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });
    }
  },
  mounted(){
    this.unwatch = this.$watch('data', ()=>{
      console.log(this.data)
      if(this.data.length > 0){
        // this.update()
        this.chart_it()

      }
    })
  }
}
  </script>


<style scoped lang="stylus">
.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}
  
</style>
