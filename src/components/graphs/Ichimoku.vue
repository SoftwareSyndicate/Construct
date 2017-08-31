<template lang="pug">
div.ichimoku-graph
  div.chart-container(ref="chart_container")
    svg.graph(height="100%" width="100%" ref="graph")
    
</template>

<script>
import techan from 'techan'
export default {
  name: 'IchimokuGraph',
  props: {
    data: {
      default: ()=>[]
    }
  },
  methods: {
    draw(data){
      let el = this.$refs.chart_container
      var margin = {top: 0, right: 20, bottom: 0, left: 80},
          width = el.clientWidth - margin.left - margin.right,
          height = el.clientHeight - margin.top - margin.bottom;

      var x = techan.scale.financetime()
          .range([0, width]);

      var y = d3.scaleLinear()
          .range([height, 0]);

      var candlestick = techan.plot.candlestick()
          .xScale(x)
          .yScale(y);

      var ichimoku = techan.plot.ichimoku()
          .xScale(x)
          .yScale(y);

      var xAxis = d3.axisBottom(x);

      var yAxis = d3.axisLeft(y)
          .tickFormat(d3.format(",.3s"));
      
      var svg = d3.select(this.$refs.graph)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

      svg.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("x", 0)
        .attr("y", y(1))
        .attr("width", width)
        .attr("height", y(0) - y(1));

      var ichimokuIndicator = techan.indicator.ichimoku();
      // Don't show where indicators don't have data
      var indicatorPreRoll = ichimokuIndicator.kijunSen()+ichimokuIndicator.senkouSpanB();

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

      svg.append("g")
        .attr("class", "ichimoku")
        .attr("clip-path", "url(#clip)");

      svg.append("g")
        .attr("class", "candlestick")
        .attr("clip-path", "url(#clip)");

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
        .text("Ichimoku");      

      var accessor = candlestick.accessor();
      var ichimokuData = ichimokuIndicator(data);
      x.domain(data.map(ichimokuIndicator.accessor().d));
      // Calculate the y domain for visible data points (ensure to include Kijun Sen additional data offset)
      y.domain(techan.scale.plot.ichimoku(ichimokuData.slice(indicatorPreRoll-ichimokuIndicator.kijunSen())).domain());

      // Logic to ensure that at least +KijunSen displacement is applied to display cloud plotted ahead of ohlc
      x.zoomable().clamp(false).domain([indicatorPreRoll, data.length+ichimokuIndicator.kijunSen()]);

      svg.selectAll("g.candlestick").datum(data).call(candlestick);
      svg.selectAll("g.ichimoku").datum(ichimokuData).call(ichimoku);
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
  
.ichimoku-graph
  .chart-container
    height 300px

  path.candle.body 
    stroke-width 0

  path.candle.up 
    fill #00AA00
    stroke #00AA00

  path.candle.down 
    fill: #FF0000;
    stroke: #FF0000;

  .ichimoku path 
    fill: none;
    stroke-width: 0.8;
    
  .ichimoku path 
    stroke: #000000;

  .ichimoku path.chikouspan 
    stroke: #BF5FFF;

  .ichimoku path.tenkansen 
    stroke: #0033FF;

  .ichimoku path.kijunsen 
    stroke: #FBB117;

  .ichimoku path.kumo 
    opacity: 0.1;

  .ichimoku path.kumo.up 
    fill: #00AA00;
    
  .ichimoku path.kumo.down 
    fill: #FF0000;

  .ichimoku path.senkouspana 
    stroke: #006600;

  .ichimoku path.senkouspanb 
    stroke: #FF0000;

</style>
