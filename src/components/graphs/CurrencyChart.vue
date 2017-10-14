<template lang="pug">
.currency-chart#chart(ref="chart_container")
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
  data(){
    return {
      scales: {
        x: {},
        y: {},
        z: {},
      },
      axes:{
        x: {},
        y: {},
        z: {},
      },
      axes_elements: {
        x: {},
        y: {},
        z: {},
      },
      series: {

      },
      d: null
    }
  },
  watch: {
    chartData: {
      handler: function(newData, oldData){
        if(this.chartData.length && this.svg){
          this.formatedData = this.chartData.map(d => {
            return {
              date: moment.unix(d.time),
              close: parseFloat(d.close),
            }
          })
          this.draw(this.formatedData)
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted(){
    this.initChart()
  },
  methods: {
    initChart(){
      this.margin = {top: 20, right: 20, bottom: 50, left: 50}
      this.width = this.$refs.chart_container.clientWidth - this.margin.left - this.margin.right
      this.height = this.$refs.chart_container.clientHeight - this.margin.top - this.margin.bottom

      d3.selectAll('svg').remove()

      this.svg = d3.select('#chart')
        .append("svg:svg")
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append("svg:g")
	      .attr("id","group")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

      // Scales
      // this.generateScales()
      
      // Close Line  -> TODO Dynamically Generate
      // this.closeLine = d3.line()
      //   .x((d) => { return this.scales['x']['bottom'](d.date)})
      //   .y((d) => { return this.scales['y']['left'](d.close)})

    },
    generateScales(){
      // TODO - Dynamically Generate 
      this.scales['x']['bottom'] = d3.scaleTime().range([0, this.width])
      // this.scales['x']['top'] = d3.scaleTime().rangeRound([0, this.width])
      this.scales['y']['left'] = d3.scaleLinear().range([this.height, 0])
      // this.scales['y']['right'] = d3.scaleLinear().rangeRound([this.height, 0])
    },
    draw(data){
	    this.bisectDate = d3.bisector((d) => { return d.date }).left
	    this.formatValue = d3.format(",.2f")
      this.formatCurrency = (d) =>  { return "$" + this.formatValue(d) }


      // Init Scales
      this.scales.x.bottom = d3.scaleTime().range([0, this.width])
      this.scales.y.left = d3.scaleLinear().range([this.height, 0])

      this.series.close = d3.line()
	        .defined((d) => { return d.price != 0 })
	        .x((d) => { return this.scales.x.bottom(d.date); })
	        .y((d) =>  { return this.scales.y.left(d.close); });

      this.focus = this.svg.append("g") 
			    .style("display", "none")	

	    // Scale the range of the data   TODO  - Make dynamic
	    this.scales.x.bottom.domain(d3.extent(data, (d) => { return d.date }))
	    this.scales.y.left.domain(d3.extent(data, (d) => { return d.close }))
	    
	    this.zoom = d3.zoom()
          .scaleExtent([0.75, 15000])
          .translateExtent([[-100000, -100000], [100000, 100000]])
          .on("zoom", this.zoomed.bind(this));	
	    
	    this.axes.x.bottom = d3.axisBottom(this.scales.x.bottom)
		      .ticks((this.width + 2) / (this.height + 2) * 5)
		      .tickSize(-this.height)
		      .tickPadding(10);
		  
	    this.axes.y.left = d3.axisRight(this.scales.y.left)
		      .ticks(5)
		      .tickSize(this.width)
		      .tickPadding(- 20 - this.width);
	    
	    this.svg.append("text")             
	      .attr("transform",
			        "translate(" + (this.width/2) + " ," + (this.height + this.margin.top + 20) + ")")
	      .style("font-size","12px")
	      .style("font-family", "sans-serif")
	      .style("text-anchor", "middle")
	      .text("Date/Time");
	    
	    this.svg.append("text")
		    .attr("transform", "rotate(-90)")
		    .attr("y", 0 - this.margin.left/1.2)
		    .attr("x",0 - (this.height / 2))
		    .attr("dy", "1em")
		    .style("font-size","12px")
		    .style("text-anchor", "middle")
		    .text("Price");

	    this.view = this.svg.append("rect")
		      .attr("class", "view")
		      .attr("x", 0.5)
		      .attr("y", 0.5)
		      .attr("width", this.width - 1)
		      .attr("height", this.height - 1);

	    this.axes_elements.x.bottom = this.svg.append("g")
		      .attr("class", "axis axis--x")
		      .attr("transform", "translate(0," + this.height + ")")
		      .call(this.axes.x.bottom);

	    this.axes_elements.y.left = this.svg.append("g")
		      .attr("class", "axis axis--y")
		      .call(this.axes.y.left);
		  
	    this.svg.append("defs").append("clipPath")
		    .attr("id", "clip")
	      .append("rect")
		    .attr("width", this.width)
		    .attr("height", this.height);
		  
	    this.chartBody = this.svg.append("g")
		      .attr("clip-path", "url(#clip)");
		  
	    this.focus.append("circle")
		    .attr("class", "y")
		    .style("fill", "none")
		    .style("stroke", "steelblue")
		    .attr("r", 4)
		    .attr("clip-path", "url(#clip)");	
		  
	    this.focus.append("text")
		    .attr("dy", ".35em")
  		  .attr("clip-path", "url(#clip)");
		  
	    this.chartBody.append("svg:path")
		    .data([data])
		    .attr("class", "line")
		    .attr("d", this.series.close);
		  
	    this.rect = this.svg.append("rect")
		    .attr("id","rect")
		    .attr("width", this.width)
		    .attr("height", this.height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", () => { this.focus.style("display", null); })
        .on("mouseout", () => { this.focus.style("display", "none"); })
        .on("mousemove", this.mousemove.bind(this));

	    this.svg.append("g")
		    .attr("transform", "translate(0," + this.height + ")")
		    .call(d3.axisBottom(this.scales.x.bottom).ticks(0));
		  
	    this.svg.append("g")
	      .call(d3.axisLeft(this.scales.y.left).ticks(0));
	    
	    d3.select("#rect").call(this.zoom.bind(this));
	    
	    // d3.select("button").on("click", this.resetted.bind(this));
	  },
    
	  mouseDate(scale) {
		  var g = d3.select("#group")._groups[0][0]
		  var x0 = scale.invert(d3.mouse(g)[0])
		  var i = this.bisectDate(this.formatedData, x0, 1)
		  var d0 = this.formatedData[i - 1]
		  var d1 = this.formatedData[i]

      if(!d1){
        return d0
      }
		  var d = x0 - d0.date > d1.date - x0 ? d1 : d0
	    return d;
	  },
	  
	  mousemove() {
		  var t = d3.zoomTransform(this)
		  let xt = t.rescaleX(this.scales.x.bottom)
      let yt = t.rescaleY(this.scales.y.left)

		  let d = this.mouseDate(xt)
		  this.focus.select("circle.y")
			  .attr('cx', () => { return t.applyX(this.scales.x.bottom(d.date))})
			  .attr('cy', () => {	return t.applyY(this.scales.y.left(d.close))})
      
		  this.focus.select("text")
			  .text(this.formatCurrency(d.close))
			  .attr('x', () => { return t.applyX(this.scales.x.bottom(d.date)) + 10 })
			  .attr('y', () => { return t.applyY(this.scales.y.left(d.close))})
	  },

	  zoomed() {
      // Rescale Axes
	    this.axes_elements.x.bottom.call(this.axes.x.bottom.scale(d3.event.transform.rescaleX(this.scales.x.bottom)));
	    this.axes_elements.y.left.call(this.axes.y.left.scale(d3.event.transform.rescaleY(this.scales.y.left)));

      // Rescale Series
	    let t = d3.event.transform
      let xt = t.rescaleX(this.scales.x.bottom)
      let yt = t.rescaleY(this.scales.y.left)
      
	    this.svg.select(".line")
		    .attr("d", this.series.close
              .x((d) => { return xt(d.date)})
							.y((d) => { return yt(d.close)}))

      let d = this.mouseDate(xt)
		  this.focus.select("circle.y")
			  .classed("zoomed", true)
			  .attr("id","one")
			  .attr('cx', () => {return t.applyX(this.scales.x.bottom(d.date))})
			  .attr('cy', () => {return t.applyY(this.scales.y.left(d.close))})
		  this.focus.select("text")
			  .text(this.formatCurrency(d.close))
			  .attr('x', () => { return t.applyX(this.scales.x.bottom(d.date)) + 10 })
			  .attr('y', () => { return t.applyY(this.scales.y.left(d.close))})
	  },
	  
	  resetted() {
	    d3.select("#rect").transition()
		    .duration(750)
		    .call(this.zoom.transform, d3.zoomIdentity)
	  }
  }
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

.view {
  fill: rgba(255, 255, 255, 0.2);
}

.axis path {
  display: none;
}

.axis line {
  stroke-opacity: 0.3;
}

.line {
    fill: none;
    stroke: steelblue;
    stroke-width: 1.5px;
}

button {
  position: absolute;
  top: 20px;
  left: 80px;
}    
    
  // .axis path, .axis line 
  //   fill none
  //   stroke #000
  //   shape-rendering crispEdges
    
  // .grid line 
  //   stroke lightgrey
  //   stroke-opacity 0.7
  //   shape-rendering crispEdges

  // .grid path 
  //   stroke-width 0
      
  //  .close
  //   fill none
  //   stroke steelblue
  //   stroke-width 1.5px
  //   stroke-linejoin round
  //   stroke-linecap round
    
  //   .tick
  //     font-family "SFUX"

</style>
