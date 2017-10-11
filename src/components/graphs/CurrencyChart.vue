<template lang="pug">
.currency-chart#chart(ref="chart_container")
  svg(height="100%" width="100%" ref="svg")
</template>

<script>
import * as d3 from 'd3'
// import * as sel from 'd3-selection'
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
      }
    }
  },
  watch: {
    chartData: {
      handler: function(newData, oldData){
        if(this.chartData.length){
          this.$nextTick(()=>{
          // this.draw(this.chartData)
            this.fuckMe(this.chartData)
          })
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted(){
    this.$nextTick(()=>{
      // this.initChart()
    })
  },
  methods: {
    fuckMe(data){

      var svg = d3.select(this.$refs.svg)
      var margin = {top: 20, right: 20, bottom: 50, left: 50}
      var width = this.$refs.svg.clientWidth - margin.left - margin.right
      var height = this.$refs.svg.clientHeight - margin.top - margin.bottom

      d3.selectAll('svg').remove()
      // var g = svg.append("g")
      //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	    //     .attr("id","group")

      // var margin = {top: 20, right: 20, bottom: 50, left: 50},
      //     width = 1000 - margin.left - margin.right,
      //     height = 500 - margin.top - margin.bottom;


      svg = d3.select('#chart')
        .append("svg:svg")
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append("svg:g")
	      .attr("id","group")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      

      var parseTime = d3.timeParse("%d/%m/%Y %H:%M")
	    var bisectDate = d3.bisector(function(d) { return d.dt; }).left
	    var formatValue = d3.format(",.2f")
      var formatCurrency = function(d) { return "£" + formatValue(d); }
	    
      var x = d3.scaleTime()
		      .range([0, width]);

      var y = d3.scaleLinear()
		      .range([height, 0]);

      var priceSeries = d3.line()
	        .defined(function(d) { return d.price != 0; })
	        .x(function(d) { return x(d.dt); })
	        .y(function(d) { return y(d.price); });

      var focus = svg.append("g") 
			    .style("display", "none")	

	    // format the data
	    data.forEach(function(d,i) {
        // date: moment.unix(d.time),
        //   close: parseFloat(d.close),
		    d.dt = moment.unix(d.time)
		    d.price = +d.close;
	    });


	    // Scale the range of the data
	    console.log("Date range: ", d3.extent(data, function(d) { return d.dt; }));
	    console.log("Price range: ", d3.extent(data, function(d) { return +d.price; }));	
	    x.domain(d3.extent(data, function(d) { return d.dt; }));
	    y.domain(d3.extent(data, function(d) { return d.price; }));
	    
	    var zoom = d3.zoom()
          .scaleExtent([0.75, 15000])
          .translateExtent([[-100000, -100000], [100000, 100000]])
          .on("zoom", zoomed);	
	    
	    var xAxis = d3.axisBottom(x)
		      .ticks((width + 2) / (height + 2) * 5)
		      .tickSize(-height)
		      .tickPadding(10);
		  
	    var yAxis = d3.axisRight(y)
		      .ticks(5)
		      .tickSize(width)
		      .tickPadding(- 20 - width);
	    
	    svg.append("text")             
	      .attr("transform",
			        "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
	      .style("font-size","12px")
	      .style("font-family", "sans-serif")
	      .style("text-anchor", "middle")
	      .text("Date/Time");
	    
	    svg.append("text")
		    .attr("transform", "rotate(-90)")
		    .attr("y", 0 - margin.left/1.2)
		    .attr("x",0 - (height / 2))
		    .attr("dy", "1em")
		    .style("font-size","12px")
		    .style("text-anchor", "middle")
		    .text("Price");

	    var view = svg.append("rect")
		      .attr("class", "view")
		      .attr("x", 0.5)
		      .attr("y", 0.5)
		      .attr("width", width - 1)
		      .attr("height", height - 1);

	    var gX = svg.append("g")
		      .attr("class", "axis axis--x")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis);

	    var gY = svg.append("g")
		      .attr("class", "axis axis--y")
		      .call(yAxis);
		  
	    svg.append("defs").append("clipPath")
		    .attr("id", "clip")
	      .append("rect")
		    .attr("width", width)
		    .attr("height", height);
		  
	    var chartBody = svg.append("g")
		      .attr("clip-path", "url(#clip)");
		  
	    focus.append("circle")
		    .attr("class", "y")
		    .style("fill", "none")
		    .style("stroke", "steelblue")
		    .attr("r", 4)
		    .attr("clip-path", "url(#clip)");	
		  
	    focus.append("text")
		    .attr("dy", ".35em")
  		  .attr("clip-path", "url(#clip)");
		  
	    chartBody.append("svg:path")
		    .data([data])
		    .attr("class", "line")
		    .attr("d", priceSeries);
		  
	    svg.append("rect")
		    .attr("id","rect")
		    .attr("width", width)
		    .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);
		  
	    svg.append("g")
		    .attr("transform", "translate(0," + height + ")")
		    .call(d3.axisBottom(x).ticks(0));
		  
	    svg.append("g")
	      .call(d3.axisLeft(y).ticks(0));
	    
	    d3.select("#rect").call(zoom);
	    
	    d3.select("button").on("click", resetted);
	    
	    function mouseDate(scale) {
		    var g = d3.select("#group")._groups[0][0]
		    var x0 = scale.invert(d3.mouse(g)[0])
		    var i = bisectDate(data, x0, 1)
		    var d0 = data[i - 1]
		    var d1 = data[i]

        if(!d1){
          return d0
        }
		    var d = x0 - d0.date > d1.date - x0 ? d1 : d0
	      return d;
	    }
	    
	    function mousemove() {
		    var transform = d3.zoomTransform(this);
		    var xt = transform.rescaleX(x), yt = transform.rescaleY(y);
		    var d = mouseDate(xt);
		    focus.select("circle.y")
			    .attr('cx', function() {
						return transform.applyX(x(d.dt));
					})
			    .attr('cy', function() {
						return transform.applyY(y(d.price));
					});
		    focus.select("text")
			    .text(formatCurrency(d.price))
			    .attr('x', function() {
						return transform.applyX(x(d.dt))+10;
			    })
			    .attr('y', function() {
						return transform.applyY(y(d.price));
			    });

	    }
	    
	    function zoomed() {
	      
	      gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
	      gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
	      var t = d3.event.transform, xt = t.rescaleX(x), yt = t.rescaleY(y)
	      svg.select(".line")
		      .attr("d",priceSeries.x(function(d) { return xt(d.dt);})
							  .y(function(d) { return yt(d.price);}));
		    // var d = mouseDate(x);
		    // focus.select("circle.y")
			  //   .classed("zoomed", true)
			  //   .attr("id","one")
			  //   .attr('cx', function() {return t.applyX(x(d.dt)); })
			  //   .attr('cy', function() {return t.applyY(y(d.price)); });				
		    // focus.select("text")
			  //   .text(formatCurrency(d.price))
			  //   .attr('x', function() { return t.applyX(x(d.dt))+10;})
			  //   .attr('y',function() {return t.applyY(y(d.price)); });
	    }
	    
	    function resetted() {
	      d3.select("#rect").transition()
		      .duration(750)
		      .call(zoom.transform, d3.zoomIdentity);
	    }
    },
    initChart(){
      // Init svg 
      this.svg = d3.select(this.$refs.svg)
      this.margin = {top: 30, right: 30, bottom: 30, left: 50}
      this.width = this.$refs.svg.clientWidth - this.margin.left - this.margin.right
      this.height = this.$refs.svg.clientHeight - this.margin.top - this.margin.bottom
      
      this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")

      // Scales
      this.generateScales()
      
      // Close Line  -> TODO Dynamically Generate
      this.closeLine = d3.line()
        .x((d) => { return this.scales['x']['bottom'](d.date)})
        .y((d) => { return this.scales['y']['left'](d.close)})

    },
    generateScales(){
      // TODO - Dynamically Generate 
      this.scales['x']['bottom'] = d3.scaleTime().range([0, this.width])
      // this.scales['x']['top'] = d3.scaleTime().rangeRound([0, this.width])
      this.scales['y']['left'] = d3.scaleLinear().range([this.height, 0])
      // this.scales['y']['right'] = d3.scaleLinear().rangeRound([this.height, 0])
    },
    draw(data){
      data = data.map(d => {
        return {
          date: moment.unix(d.time),
          close: parseFloat(d.close),
        }
      })

      // Set scales domains to min and max of data set
      this.scales['x']['bottom'].domain(d3.extent(data, (d) => { return d.date }))
      this.scales['y']['left'].domain(d3.extent(data, (d) => { return d.close }))

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
      
      // x bottom axis
      this.axes['x']['bottom'] = d3.axisBottom(this.scales['x']['bottom'])
        // .ticks((this.width + 2) / (this.height + 2) * 5)
		    // .tickSize(-this.height)
		    // .tickPadding(10);
      
      this.axes_elements['x']['bottom'] = this.g.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .attr("class", "axis axis--x")
        .call(this.axes['x']['bottom'])

      // y left axis
      this.axes['y']['left'] = d3.axisRight(this.scales['y']['left'])
        // .ticks(5)
		    // .tickSize(this.width)
		    // .tickPadding(- 20 - this.width);
      
      this.axes_elements['y']['left'] = this.g.append("g")
        .call(this.axes['y']['left'])
        .append("text")
        .attr("fill", "#000")
        // .attr("transform", "rotate(-90)")
        // .attr("y", 6)
        // .attr("dy", "0.71em")
        // .attr("text-anchor", "end")
        // .text(this.baseCurrency)

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

      this.svg.append("rect")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
		    .attr("id","rect")
		    .attr("width", this.width)
		    .attr("height", this.height)
        .style("fill", "none")
        .style("pointer-events", "all")

      // Zoom
      this.zoom = d3.zoom()
        .scaleExtent([0.75, 15000])
        .translateExtent([[-100000, -100000], [100000, 100000]])
        .on("zoom", this.onZoom.bind(this));

      d3.select("#rect").call(this.zoom);

      // close line
      this.g.append("path")
        .datum(data)
        .attr("d", this.closeLine)
        .attr("class", "close line")
      
    },
    onZoom(){
      this.axes_elements['x']['bottom'].call(this.axes['x']['bottom'].scale(d3.event.transform.rescaleX(this.scales['x']['bottom'])))

	    this.axes_elements['y']['left'].call(this.axes['y']['left'].scale(d3.event.transform.rescaleY(this.scales['y']['left'])))
	    let t = d3.event.transform
      let xt = t.rescaleX(this.scales['x']['bottom'])
      let yt = t.rescaleY(this.scales['y']['left'])
	    this.svg.select(".line")
		    .attr("d", this.closeLine.x(function(d) { return xt(d.date)})
							.y(function(d) { return yt(d.close)}))
    },
    make_x_gridlines(){		
      return d3.axisBottom(this.scales['x']['bottom'])
        .ticks(10)
    },
    make_y_gridlines(){		
      return d3.axisLeft(this.scales['y']['left'])
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
