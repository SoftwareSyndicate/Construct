<template lang="pug">
.currency-chart(ref="chart_container")
  svg(height="100%" width="100%" ref="svg")
</template>

<script>
import * as d3 from 'd3'
import moment from 'moment'

import { mapGetters, mapActions }  from 'vuex'
export default {
  name: 'MultiLineChart',
  props: {
    chartData: {
      default: ()=>[]
    },
    baseCurrency: {
      default: "USD"
    }
  },
  watch: {
    chartData: {
      handler: function(newData, oldData){
        log(this.chartData)
        if(this.chartData.length && this.svg){
          this.draw(this.chartData)
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.initChart()
    })
  },
  methods: {
    initChart(){
      // Init svg 
      this.svg = d3.select(this.$refs.svg)
      this.margin = {top: 30, right: 30, bottom: 30, left: 50}
      this.width = this.$refs.svg.clientWidth - this.margin.left - this.margin.right
      this.height = this.$refs.svg.clientHeight - this.margin.top - this.margin.bottom
      
      this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

      // Axes
      this.x0 = d3.scaleTime().rangeRound([0, this.width])
      this.x1 = d3.scaleTime().rangeRound([0, this.width])
      this.y0 = d3.scaleLinear().rangeRound([this.height, 0])
      this.y1 = d3.scaleLinear().rangeRound([this.height, 0])
      // this.z = d3.scaleOrdinal(d3.schemeCategory10)

      this.closeLine = d3.line()
        // .curve(d3.curveBasis)
        .x((d) => { return this.x0(d.date)})
        .y((d) => { return this.y0(d.close)})

      // this.conversionsLine = d3.line()
      //   // .curve(d3.curveBasis)
      //   .x((d) => { return this.x0(d.date)})
      //   .y((d) => { return this.y1(d.conversions)})
      
    },
    draw(data){
      data = data.map(d => {
        return {
          date: moment.unix(d.time),
          close: parseFloat(d.close),
        }
      })

      log(data)

      this.x0.domain(d3.extent(data, (d) => { return d.date }))
      this.y0.domain(d3.extent(data, (d) => { return d.close }))
      // this.y1.domain(d3.extent(formatedData, (d) => { return d. }))

      // x gridlines
      this.g.append("g")			
        .attr("class", "grid")
        .attr("transform", "translate(0," + this.height + ")")
        .call(this.make_x_gridlines()
              .tickSize(-this.height)
              .tickFormat("")
             )

      // y gridlines
      this.g.append("g")			
        .attr("class", "grid")
        .call(this.make_y_gridlines()
              .tickSize(-this.width)
              .tickFormat("")
             )
      
      // x axis
      this.g.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .attr("class", "axis axis--x")
        .call(d3.axisBottom(this.x0))

      // y0 axis
      this.g.append("g")
        .call(d3.axisLeft(this.y0))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text(this.baseCurrency)

      // // y1 axis
      // this.g.append("g")
      //   .attr("transform", "translate( " + this.width + ", 0 )")            
      //   .call(d3.axisRight(this.y1))
      //   .append("text")
      //   .attr("fill", "#000")
      //   .attr("transform", "rotate(-90)")
      //   .attr("y", -10)
      //   .attr("dy", "0.71em")
      //   .attr("text-anchor", "end")
      //   .text("Conversions")
      
      // close line
      this.g.append("path")
        .datum(data)
        .attr("d", this.closeLine)
        .attr("class", "close")
      
      // // conversions line
      // this.g.append("path")
      //   .datum(formatedData)
      //   .attr("d", this.conversionsLine)
      //   .attr("class", "conversions")
    },
    make_x_gridlines(){		
      return d3.axisBottom(this.x0)
        .ticks(10)
    },
    make_y_gridlines(){		
      return d3.axisLeft(this.y0)
        .ticks(10)
    }
  },
}
</script>

<style lang="stylus">

.currency-chart
  flex-basis 100%
  height 100%
  cursor crosshair
  
  svg
    height 100%
    width 100%
    
  .axis path, .axis line 
    fill none
    stroke #000
    shape-rendering crispEdges
    
  .grid line 
    stroke lightgrey
    stroke-opacity 0.7
    shape-rendering crispEdges

  .grid path 
    stroke-width 0
      
   .close
    fill none
    stroke steelblue
    stroke-width 1.5px
    stroke-linejoin round
    stroke-linecap round
    
    .tick
      font-family "SFUX"

</style>
