<template lang="pug">
div.calendar-graph
  div.chart-container(ref="chart_container")
    svg.graph(height="100%" width="100%" ref="graph")
    
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    graph_data: {
      default: ()=>[],
    },
    config: {
      default: ()=>{
        return {

        }
      }
    }
  },
  methods: {
    draw(data){
      log("drawing")
      data = data.map(d => {
        return {
          date: new Date(d.time * 1000),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: +d.close,
        }
      })


    },
    onResize(){
      this.draw(this.graph_data)
    },
    initGraph(){
      this.el = this.$refs.chart_container
      this.margin = {top: 20, right: 40, bottom: 20, left: 40}
      this.width = this.el.clientWidth - this.margin.left - this.margin.right
      this.height = this.el.clientHeight - this.margin.top - this.margin.bottom
      this.cellSize = 17
      this.svg = d3.select(this.$refs.graph)
        .append("g")
        .attr("transform",
              "translate(" + this.margin.left + "," + this.margin.top + ")")
    }
  },
  watch: {
    graph_data: {
      handler: function(newData, oldData) {
        if(this.graph_data.length > 0){
          this.draw(this.graph_data)
        }
      },
      immediate: true,
    }
  },
  mounted(){
    this.initGraph()
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.onResize)
  }
}
</script>


<style lang="stylus">
  
.calendar-graph
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

  .day {
    fill: #fff;
    stroke: #ccc;
  }

  .month {
    fill: none;
    stroke: #000;
    stroke-width: 2px;
  }

  .RdYlGn .q0-11{fill:rgb(165,0,38)}
  .RdYlGn .q1-11{fill:rgb(215,48,39)}
  .RdYlGn .q2-11{fill:rgb(244,109,67)}
  .RdYlGn .q3-11{fill:rgb(253,174,97)}
  .RdYlGn .q4-11{fill:rgb(254,224,139)}
  .RdYlGn .q5-11{fill:rgb(255,255,191)}
  .RdYlGn .q6-11{fill:rgb(217,239,139)}
  .RdYlGn .q7-11{fill:rgb(166,217,106)}
  .RdYlGn .q8-11{fill:rgb(102,189,99)}
  .RdYlGn .q9-11{fill:rgb(26,152,80)}
  .RdYlGn .q10-11{fill:rgb(0,104,55)}

        
</style>
