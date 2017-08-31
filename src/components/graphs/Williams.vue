<template lang="pug">
div.williams-graph
  div.chart-container(ref="chart_container")
    svg.graph(height="100%" width="100%" ref="graph")
    
</template>

<script>
import techan from 'techan'
export default {
  name: 'WilliamsGraph',
  props: {
    data: {
      default: ()=>[]
    }
  },
  methods: {
    draw(data){
      let el = this.$refs.chart_container
      var margin = {top: 20, right: 20, bottom: 40, left: 80},
          width = el.clientWidth - margin.left - margin.right,
          height = el.clientHeight - margin.top - margin.bottom;
      
      var svg = d3.select(this.$refs.graph)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      var x = techan.scale.financetime()
          .range([0, width]);

      var y = d3.scaleLinear()
          .range([height, 0]);

      var williams = techan.plot.williams()
          .xScale(x)
          .yScale(y);

      var xAxis = d3.axisBottom(x);

      var yAxis = d3.axisLeft(y)
            .tickFormat(d3.format(",.3s"));      

      data = data.map(d => {
        return {
          date: new Date(d.time * 1000),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: +d.close,
        }
      })


      var accessor = williams.accessor();

      svg.append("g")
        .attr("class", "williams");

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")");

      svg.append("g")
        .attr("class", "y axis")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("William %R");

      var williamsData = techan.indicator.williams()(data);
      x.domain(williamsData.map(williams.accessor().d));
      y.domain(techan.scale.plot.williams().domain());

      svg.selectAll("g.williams").datum(williamsData).call(williams);
      svg.selectAll("g.x.axis").call(xAxis);
      svg.selectAll("g.y.axis").call(yAxis);      
    }
  },
  mounted(){
    this.unwatch = this.$watch('data', ()=>{
      if(this.data.length > 0){
        this.draw(this.data)
      }
    })
  }
}
  </script>


<style lang="stylus">
  
.williams-graph
  .chart-container
    height 400px

  path 
    fill: none;
    stroke-width: 1;
    
    &.williams.up 
      stroke: #006600;
      stroke-width: 1.5;

</style>
