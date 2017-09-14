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
      default: ()=>{
        return {
          crosshair: true,
          close: true,
          heikinashi: true,
          williams: true,
        }
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
      if(this.config.williams){
        this.drawWilliams(data)
      }
      if(this.config.heikinashi){
        this.drawHeikinashi(data)
      }

      // Draw Axis
      this.svg.selectAll("g.x.axis").call(this.xAxis);
      this.svg.selectAll("g.y.axis").call(this.yAxis);
      this.zoomableInit = this.x.zoomable().clamp(false).copy();
      
    },
    onResize(){
      this.draw(this.graph_data)

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
      this.x.domain(data.map(this.heikinashiAccessor.d));
      this.y.domain(techan.scale.plot.ohlc(heikinashiData, this.heikinashiAccessor).domain());

      this.svg.selectAll("g.heikinashi").datum(heikinashiData).call(this.heikinashi);
    },
    initWilliams(){
      this.svg.append("g")
        .attr("class", "williams");
      
      this.williams = techan.plot.williams()
        .xScale(this.x)
        .yScale(this.y)
      this.williamsAccessor = this.williams.accessor()
      this.williamsIndicator = techan.indicator.williams()
    },
    drawWilliams(data){
      var williamsData = techan.indicator.williams()(data);
      this.x.domain(williamsData.map(this.williams.accessor().d));
      this.y.domain(techan.scale.plot.williams().domain());

      this.svg.selectAll("g.williams").datum(williamsData).call(this.williams);
    },

    initZoom(){
      this.zoom = d3.zoom()
            .on("zoom", this.zoomed)
      this.zoomableInit = null

      this.svg.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("x", 0)
        .attr("y", this.y(1))
        .attr("width", this.width)
        .attr("height", this.y(0) - this.y(1));

      this.svg.append("rect")
        .attr("class", "pane")
        .attr("width", this.width)
        .attr("height", this.height)
        .call(this.zoom);      
    },
    zoomed(){
      this.rescaledY = d3.event.transform.rescaleY(this.y);
      this.yAxis.scale(this.rescaledY);



      if(this.config.close){
        this.close.yScale(this.rescaledY)
      }
      if(this.config.williams){
        this.williams.yScale(this.rescaledY)
      }
      if(this.config.heikinashi){
        this.heikinashi.yScale(this.rescaledY)
      }
      

      // Emulates D3 behaviour, required for financetime due to secondary zoomable scale
      this.x.zoomable().domain(d3.event.transform.rescaleX(this.zoomableInit).domain());
      
      this.draw(this.graph_data);
    },
    initGraph(){
      this.el = this.$refs.chart_container
      this.margin = {top: 20, right: 40, bottom: 20, left: 40}
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
      this.initWilliams()
      
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
        .attr("dy", ".75em")
        .style("text-anchor", "end")
      
      this.svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + this.width + ",0)")
        .call(this.yRightAxis);

      // Zoom
      // this.initZoom()
    }
  },
  watch: {
    graph_data: {
      handler: function(newData, oldData) {
        if(this.graph_data.length > 0 && this.x){
          this.draw(this.graph_data)
        }
      },
      immediate: true,
    }
  },
  mounted(){
    this.initGraph()
    window.addEventListener('resize', this.onResize)
    
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.onResize)
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
