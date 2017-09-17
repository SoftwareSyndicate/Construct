<template lang="pug">
div.multi-graph
  div.chart-container(ref="chart_container")
    svg.graph(height="100%" width="100%" ref="graph")
    
</template>

<script>
import techan from 'techan'
import { mapState } from 'vuex'

export default {
  name: 'Multi',
  props: {
    graph_data: {
      default: ()=>[],
    },
  },
  mounted(){
    this.initGraph()
    // window.addEventListener('resize', this.onResize)
  },
  methods: {
    initGraph(){
      this.el = this.$refs.chart_container
      this.margin = {top: 20, right: 40, bottom: 20, left: 40}
      this.width = this.el.clientWidth - this.margin.left - this.margin.right
      this.height = this.el.clientHeight - this.margin.top - this.margin.bottom
      this.svg = d3.select(this.$refs.graph)
        .append("g")
        .attr("transform",
              "translate(" + this.margin.left + "," + this.margin.top + ")")

      // Axis
      this.x = techan.scale.financetime()
        .range([0, this.width])
        .outerPadding(0)
      
      this.y = d3.scaleLinear()
        .range([this.height, 0])

      this.xAxis = d3.axisBottom(this.x)
      this.xTopAxis = d3.axisTop(this.x)
      this.yAxis = d3.axisLeft(this.y)
      this.yRightAxis = d3.axisRight(this.y);

      this.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this.height + ")")
      
      this.svg.append("g")
        .attr("class", "x axis")
        .call(this.xTopAxis)

      this.svg.append("g")
        .attr("class", "y axis")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".75em")
        .style("text-anchor", "end")
      
      this.svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + this.width + ",0)")
        .call(this.yRightAxis);
      
      // this.initLines()
    },
    initLines(){
      d3.selectAll("g.line").remove();      
      this.graphs.forEach(currency => {
        currency.lines.forEach(line => {
          switch (line.type){
          case "price":
            this.initClose(currency)
            break
          case "candlestick":
            this.initHeikinashi(currency)
            break
          case "williams":
            this.initWilliams(currency)
            break
          }
        })
      })
    },
    
    // INIT Lines
    initClose(currency){
      this.svg.append("g").attr("class", currency.name + " line close")
      
      this.close = techan.plot.close()
        .xScale(this.x)
        .yScale(this.y);
      this.closeAccessor = this.close.accessor();      
    },
    initHeikinashi(currency){
      this.svg.append("g").attr("class", currency.name + " line heikinashi")      
      this.heikinashi = techan.plot.heikinashi()
        .xScale(this.x)
        .yScale(this.y)
      this.heikinashiAccessor = this.heikinashi.accessor();   
      this.heikinashiIndicator = techan.indicator.heikinashi()
    },
    initWilliams(currency){
      this.svg.append("g")
        .attr("class", currency.name + " line williams");
      
      this.williams = techan.plot.williams()
        .xScale(this.x)
        .yScale(this.y)
      this.williamsAccessor = this.williams.accessor()
      this.williamsIndicator = techan.indicator.williams()
    },
    initCrosshair(){
      this.crosshair = techan.plot.crosshair()
        .xScale(this.x)
        .yScale(this.y)
        .xAnnotation([this.timeAnnotation, this.timeTopAnnotation])
        .yAnnotation([this.ohlcAnnotation, this.ohlcRightAnnotation])
        .on("enter", enter)
        .on("out", out)
        .on("move", move);
    },
    // DRAW
    draw(data){
      data = data.map(d => {
        return {
          date: new Date(d.time * 1000),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: +d.close,
        }
      })

      this.graphs.forEach(currency => {
        currency.lines.forEach(line => {
          switch (line.type){
          case "price":
            if(line.active){ this.drawClose(data, line) }
            break
          case "candlestick":
            if(line.active){ this.drawHeikinashi(data, line) }
            break
          case "williams":
            if(line.active){ this.drawWilliams(data, line) }
            break
          }
        })
      })
      
      // Draw Axis
      this.svg.selectAll("g.x.axis").call(this.xAxis);
      this.svg.selectAll("g.y.axis").call(this.yAxis);
      
      // this.zoomableInit = this.x.zoomable().clamp(false).copy();
      
    },
    drawClose(data, currency){
      this.x.domain(data.map(this.close.accessor().d))
      this.y.domain(techan.scale.plot.ohlc(data, this.close.accessor()).domain())
      this.svg.selectAll("g.close").datum(data).call(this.close)
    },
    drawHeikinashi(data, currency){
      let heikinashiData = this.heikinashiIndicator(data);
      this.x.domain(data.map(this.heikinashiAccessor.d));
      this.y.domain(techan.scale.plot.ohlc(heikinashiData, this.heikinashiAccessor).domain());
      this.svg.selectAll("g.heikinashi").datum(heikinashiData).call(this.heikinashi);
    },
    drawWilliams(data, currency){
      var williamsData = techan.indicator.williams()(data)
      this.x.domain(williamsData.map(this.williams.accessor().d))
      this.y.domain(techan.scale.plot.williams().domain())
      this.svg.selectAll("g.williams").datum(williamsData).call(this.williams)
    },
  },
  computed:{
    ...mapState({
      'graphs': state => state.currencies.graphs,
    }),
  },
  watch: {
    graph_data: {
      handler: function(newData, oldData) {
        if(this.graph_data.length > 0 && this.x){
          this.initLines()
          this.draw(this.graph_data)
        }
      },
      immediate: true,
    },
    graphs: {
      handler: function(newData, oldData) {
        this.initLines()
        this.draw(this.graph_data)
      },
      immediate: false,
      deep: true
    }
  },
  onResize(){
    this.draw(this.graph_data)
  },
  beforeDestroy(){
    // window.removeEventListener('resize', this.onResize)
  }
}
</script>


<style lang="stylus">
@import "../../styles/graphs.styl"  

.multi-graph
  display flex
  flex-basis 100%
  
  .chart-container
    display flex
    flex-basis 100%
    height 100%

    .heikinashi    
      path.candle
        stroke: #000000;

      path.candle.body 
        stroke-width 0

      path.candle.up 
        fill #00AA00
        stroke #00AA00

      path.candle.down 
        fill #FF0000
        stroke #FF0000


    .close
      path.line 
        fill none
        stroke steelblue
        stroke-width 2

    .crosshair 
      cursor crosshair

    .crosshair path.wire 
      stroke: #DDDDDD;
      stroke-dasharray: 1, 1;
        
    .crosshair .axisannotation path 
      fill: #DDDDDD;

    .williams path 
      fill: none;
      stroke-width: 2;

    .williams.up 
      stroke: orange
      stroke-width: 2;
        
  rect.pane 
    cursor move
    fill none
    pointer-events all
        
</style>
