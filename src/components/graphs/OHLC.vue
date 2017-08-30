<template lang="pug">
div.ohlc-graph
  div.chart-container(ref="chart_container")
    svg.graph(height="100%" width="100%" ref="graph")
    
</template>

<script>


export default {
  name: 'OHLCGraph',
  props: {
    data: {
      default: ()=>[]
    }
  },
  methods: {
    draw(data){
      let el = this.$refs.chart_container
      var margin = {top: 0, right: 20, bottom: 30, left: 80},
          width = el.clientWidth - margin.left - margin.right,
          height = el.clientHeight - margin.top - margin.bottom;


      var x = techan.scale.financetime()
          .range([0, width]);

      var y = d3.scaleLinear()
          .range([height, 0]);

      var ohlc = techan.plot.ohlc()
          .xScale(x)
          .yScale(y);

      var xAxis = d3.axisBottom(x);

      var yAxis = d3.axisLeft(y);

      var svg = d3.select(this.$refs.graph)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
      data = data.map(d => {
        return {
          date: new Date(d.time * 1000),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: +d.close,
        }
      })

      log(data)

      var accessor = ohlc.accessor();
      
      x.domain(data.map(accessor.d));
      y.domain(techan.scale.plot.ohlc(data, accessor).domain());

      svg.append("g")
        .attr("class", "ohlc");

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
        .text("Price ($)");

      x.domain(data.map(ohlc.accessor().d));
      y.domain(techan.scale.plot.ohlc(data, ohlc.accessor()).domain());

      svg.selectAll("g.ohlc").datum(data).call(ohlc);
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
  
.ohlc-graph
  .chart-container
    height 200px

  path.ohlc 
    stroke #000000
    stroke-width 1
    
    &.up
      stroke #00AA00

    &.down
      stroke #FF0000

</style>
