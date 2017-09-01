<template lang="pug">
div.multi-graph
  div.chart-container(ref="chart_container")
    svg.graph(height="100%" width="100%" ref="graph")
    
</template>

<script>
import techan from 'techan'
export default {
  name: 'Multi',
  props: {
    graph_data: {
      default: ()=>[],
    },
    config: {
      default: {
        crosshair: true,
        close: true,
        heikinashi: false,
      }
    }
  },
  methods: {
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

      // Draw Plots
      if(this.config.close){
        this.drawClose(data)
      }
      if(this.config.heikinashi){
        this.drawHeikinashi(data)
      }

      // Draw Axis
      this.svg.selectAll("g.x.axis").call(this.xAxis);
      this.svg.selectAll("g.y.axis").call(this.yAxis);      
      
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
    initClose(){
      this.svg.append("g")
        .attr("class", "close");      
      
      this.close = techan.plot.close()
        .xScale(this.x)
        .yScale(this.y);
      this.closeAccessor = this.close.accessor();      
    },
    drawClose(data){
      this.x.domain(data.map(this.close.accessor().d));
      this.y.domain(techan.scale.plot.ohlc(data, this.close.accessor()).domain());
      this.svg.selectAll("g.close").datum(data).call(this.close);      
    },
    initHeikinashi(){
      this.svg.append("g")
        .attr("class", "heikinashi");
      
      this.heikinashi = techan.plot.heikinashi()
        .xScale(this.x)
        .yScale(this.y)
      this.heikinashiAccessor = this.heikinashi.accessor();    
      this.heikinashiIndicator = techan.indicator.heikinashi();
    },
    drawHeikinashi(data){
      let heikinashiData = this.heikinashiIndicator(data);
      this.x.domain(data.map(this.heikinashi.accessor().d));
      this.y.domain(techan.scale.plot.ohlc(heikinashiData, this.heikinashi.accessor()).domain());

      this.svg.selectAll("g.heikinashi").datum(heikinashiData).call(this.heikinashi);
    }
  },
  watch: {
    graph_data: {
      handler: function(newData, oldData) {
        log(newData)
        log(this.graph_data)
        if(this.graph_data.length > 0){
          this.draw(this.graph_data)
        }
      }
    }
  },
  mounted(){
    this.el = this.$refs.chart_container
    this.margin = {top: 0, right: 20, bottom: 40, left: 40}
    this.width = this.el.clientWidth - this.margin.left - this.margin.right
    this.height = this.el.clientHeight - this.margin.top - this.margin.bottom
    this.svg = d3.select(this.$refs.graph)
        .append("g")
        .attr("transform",
              "translate(" + this.margin.left + "," + this.margin.top + ")")

    this.x = techan.scale.financetime()
      .range([0, this.width])
    this.y = d3.scaleLinear()
      .range([this.height, 0])

    this.xAxis = d3.axisBottom(this.x)
    this.xTopAxis = d3.axisTop(this.x)
    this.yAxis = d3.axisLeft(this.y)
    this.yRightAxis = d3.axisRight(this.y);


    // Init plots
    this.initClose()
    this.initHeikinashi()

    // Axis
    this.svg.append("g")
      .attr("class", "x axis")
      .call(this.xTopAxis)
    
    this.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
    
    this.svg.append("g")
      .attr("class", "y axis")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
    
    this.svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + this.width + ",0)")
      .call(this.yRightAxis);
    
  }
}
</script>


<style lang="stylus">
  
.multi-graph
  display flex
  flex-basis 100%
  
  .chart-container
    display flex
    flex-basis 100%
    height 400px

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
        stroke-width 1

    .crosshair 
      cursor crosshair

    .crosshair path.wire 
      stroke: #DDDDDD;
      stroke-dasharray: 1, 1;
        
    .crosshair .axisannotation path 
      fill: #DDDDDD;
        
</style>
