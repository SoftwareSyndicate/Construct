<template lang="pug">
div.calendar-graph
  div.chart-container(ref="chart_container")
    svg.graph(height="100%" width="100%" ref="graph")
    
</template>

<script>
import techan from 'techan'
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
      // Draw
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

        this.accessor = this.candlestick.accessor()
        this.indicatorPreRoll = 33
        
        this.x.domain(techan.scale.plot.time(data).domain());
        this.y.domain(techan.scale.plot.ohlc(data.slice(this.indicatorPreRoll)).domain());
        this.yPercent.domain(techan.scale.plot.percent(this.y, this.accessor(data[this.indicatorPreRoll])).domain());
        this.yVolume.domain(techan.scale.plot.volume(data).domain());

        this.trendlineData = [
            { start: { date: new Date(2014, 2, 11), value: 72.50 }, end: { date: new Date(2014, 5, 9), value: 63.34 } },
            { start: { date: new Date(2013, 10, 21), value: 43 }, end: { date: new Date(2014, 2, 17), value: 70.50 } }
        ];

        this.supstanceData = [
            { start: new Date(2014, 2, 11), end: new Date(2014, 5, 9), value: 63.64 },
            { start: new Date(2013, 10, 21), end: new Date(2014, 2, 17), value: 55.50 }
        ];


        this.macdData = techan.indicator.macd()(data);
        this.macdScale.domain(techan.scale.plot.macd(this.macdData).domain());
        this.rsiData = techan.indicator.rsi()(data);
        this.rsiScale.domain(techan.scale.plot.rsi(this.rsiData).domain());

        this.svg.select("g.candlestick").datum(data).call(this.candlestick);
        this.svg.select("g.close.annotation").datum([data[data.length-1]]).call(this.closeAnnotation);
        this.svg.select("g.volume").datum(data).call(this.volume);
        this.svg.select("g.sma.ma-0").datum(techan.indicator.sma().period(10)(data)).call(this.sma0);
        this.svg.select("g.sma.ma-1").datum(techan.indicator.sma().period(20)(data)).call(this.sma1);
        this.svg.select("g.ema.ma-2").datum(techan.indicator.ema().period(50)(data)).call(this.ema2);
        this.svg.select("g.macd .indicator-plot").datum(this.macdData).call(this.macd);
        this.svg.select("g.rsi .indicator-plot").datum(this.rsiData).call(this.rsi);

        this.svg.select("g.crosshair.ohlc").call(this.ohlcCrosshair).call(this.zoom);
        this.svg.select("g.crosshair.macd").call(this.macdCrosshair).call(this.zoom);
        this.svg.select("g.crosshair.rsi").call(this.rsiCrosshair).call(this.zoom);
        this.svg.select("g.trendlines").datum(this.trendlineData).call(this.trendline).call(this.trendline.drag);
        this.svg.select("g.supstances").datum(this.supstanceData).call(this.supstance).call(this.supstance.drag);

        // Stash for zooming
        this.zoomableInit = this.x.zoomable().domain([this.indicatorPreRoll, data.length]).copy(); // Zoom in a little to hide indicator preroll
        this.yInit = this.y.copy();
        this.yPercentInit = this.yPercent.copy();

        this.svg.select("g.x.axis").call(this.xAxis);
        this.svg.select("g.ohlc .axis").call(this.yAxis);
        this.svg.select("g.volume.axis").call(this.volumeAxis);
        this.svg.select("g.percent.axis").call(this.percentAxis);
        this.svg.select("g.macd .axis.right").call(this.macdAxis);
        this.svg.select("g.rsi .axis.right").call(this.rsiAxis);
        this.svg.select("g.macd .axis.left").call(this.macdAxisLeft);
        this.svg.select("g.rsi .axis.left").call(this.rsiAxisLeft);

        // We know the data does not change, a simple refresh that does not perform data joins will suffice.
        this.svg.select("g.candlestick").call(this.candlestick.refresh);
        this.svg.select("g.close.annotation").call(this.closeAnnotation.refresh);
        this.svg.select("g.volume").call(this.volume.refresh);
        this.svg.select("g .sma.ma-0").call(this.sma0.refresh);
        this.svg.select("g .sma.ma-1").call(this.sma1.refresh);
        this.svg.select("g .ema.ma-2").call(this.ema2.refresh);
        this.svg.select("g.macd .indicator-plot").call(this.macd.refresh);
        this.svg.select("g.rsi .indicator-plot").call(this.rsi.refresh);
        this.svg.select("g.crosshair.ohlc").call(this.ohlcCrosshair.refresh);
        this.svg.select("g.crosshair.macd").call(this.macdCrosshair.refresh);
        this.svg.select("g.crosshair.rsi").call(this.rsiCrosshair.refresh);
        this.svg.select("g.trendlines").call(this.trendline.refresh);
        this.svg.select("g.supstances").call(this.supstance.refresh);
        
      },

      // Zoom
      zoomed(){
        this.x.zoomable().domain(d3.event.transform.rescaleX(this.zoomableInit).domain());
        this.y.domain(d3.event.transform.rescaleY(this.yInit).domain());
        this.yPercent.domain(d3.event.transform.rescaleY(this.yPercentInit).domain());

        this.draw(this.graph_data);
      },

      // Init
      initGraph(){

        
        this.el = this.$refs.chart_container
        this.dim = {
          width: 960, height: 500,
          margin: { top: 20, right: 50, bottom: 30, left: 50 },
          ohlc: { height: 305 },
          indicator: { height: 65, padding: 5 }
        }
        this.dim.plot = {
          width: this.dim.width - this.dim.margin.left - this.dim.margin.right,
          height: this.dim.height - this.dim.margin.top - this.dim.margin.bottom
        }
        this.dim.indicator.top = this.dim.ohlc.height + this.dim.indicator.padding;
        this.dim.indicator.bottom = this.dim.indicator.top + this.dim.indicator.height + this.dim.indicator.padding

        this.indicatorTop = d3.scaleLinear()
          .range([this.dim.indicator.top, this.dim.indicator.bottom]);

        this.parseDate = d3.timeParse("%d-%b-%y");

        this.zoom = d3.zoom().on("zoom", this.zoomed);

        this.x = techan.scale.financetime()
            .range([0, this.dim.plot.width]);

        this.y = d3.scaleLinear()
            .range([this.dim.ohlc.height, 0]);

        this.yPercent = this.y.copy(); 

        this.yInit = null
        this.yPercentInit = null
        this.zoomableInit = null

        this.yVolume = d3.scaleLinear()
            .range([this.y(0), this.y(0.2)]);

        this.candlestick = techan.plot.candlestick()
            .xScale(this.x)
          .yScale(this.y);
        
        this.sma0 = techan.plot.sma()
            .xScale(this.x)
            .yScale(this.y);

        this.sma1 = techan.plot.sma()
            .xScale(this.x)
            .yScale(this.y);

        this.ema2 = techan.plot.ema()
            .xScale(this.x)
            .yScale(this.y);

        this.volume = techan.plot.volume()
            .accessor(this.candlestick.accessor())   
            .xScale(this.x)
            .yScale(this.yVolume);

        this.trendline = techan.plot.trendline()
            .xScale(this.x)
            .yScale(this.y);

        this.supstance = techan.plot.supstance()
            .xScale(this.x)
            .yScale(this.y);

        this.xAxis = d3.axisBottom(this.x);

        this.timeAnnotation = techan.plot.axisannotation()
            .axis(this.xAxis)
            .orient('bottom')
            .format(d3.timeFormat('%Y-%m-%d'))
            .width(65)
            .translate([0, this.dim.plot.height]);

        this.yAxis = d3.axisRight(this.y);

        this.ohlcAnnotation = techan.plot.axisannotation()
            .axis(this.yAxis)
            .orient('right')
            .format(d3.format(',.2f'))
            .translate([this.x(1), 0]);

        this.closeAnnotation = techan.plot.axisannotation()
            .axis(this.yAxis)
            .orient('right')
            .accessor(this.candlestick.accessor())
            .format(d3.format(',.2f'))
            .translate([this.x(1), 0]);

        this.percentAxis = d3.axisLeft(this.yPercent)
            .tickFormat(d3.format('+.1%'));

        this.percentAnnotation = techan.plot.axisannotation()
            .axis(this.percentAxis)
            .orient('left');

        this.volumeAxis = d3.axisRight(this.yVolume)
            .ticks(3)
            .tickFormat(d3.format(",.3s"));

        this.volumeAnnotation = techan.plot.axisannotation()
            .axis(this.volumeAxis)
            .orient("right")
            .width(35);

        this.macdScale = d3.scaleLinear()
            .range([this.indicatorTop(0) + this.dim.indicator.height, this.indicatorTop(0)]);

        this.rsiScale = this.macdScale.copy()
            .range([this.indicatorTop(1) + this.dim.indicator.height, this.indicatorTop(1)]);

        this.macd = techan.plot.macd()
            .xScale(this.x)
            .yScale(this.macdScale);

        this.macdAxis = d3.axisRight(this.macdScale)
            .ticks(3);

        this.macdAnnotation = techan.plot.axisannotation()
            .axis(this.macdAxis)
            .orient("right")
            .format(d3.format(',.2f'))
            .translate([this.x(1), 0]);

        this.macdAxisLeft = d3.axisLeft(this.macdScale)
            .ticks(3);

        this.macdAnnotationLeft = techan.plot.axisannotation()
            .axis(this.macdAxisLeft)
            .orient("left")
            .format(d3.format(',.2f'));

        this.rsi = techan.plot.rsi()
            .xScale(this.x)
            .yScale(this.rsiScale);

        this.rsiAxis = d3.axisRight(this.rsiScale)
            .ticks(3);

        this.rsiAnnotation = techan.plot.axisannotation()
            .axis(this.rsiAxis)
            .orient("right")
            .format(d3.format(',.2f'))
            .translate([this.x(1), 0]);

        this.rsiAxisLeft = d3.axisLeft(this.rsiScale)
            .ticks(3);

        this.rsiAnnotationLeft = techan.plot.axisannotation()
            .axis(this.rsiAxisLeft)
            .orient("left")
            .format(d3.format(',.2f'));

        this.ohlcCrosshair = techan.plot.crosshair()
            .xScale(this.timeAnnotation.axis().scale())
            .yScale(this.ohlcAnnotation.axis().scale())
            .xAnnotation(this.timeAnnotation)
            .yAnnotation([this.ohlcAnnotation, this.percentAnnotation, this.volumeAnnotation])
            .verticalWireRange([0, this.dim.plot.height]);

        this.macdCrosshair = techan.plot.crosshair()
            .xScale(this.timeAnnotation.axis().scale())
            .yScale(this.macdAnnotation.axis().scale())
            .xAnnotation(this.timeAnnotation)
            .yAnnotation([this.macdAnnotation, this.macdAnnotationLeft])
            .verticalWireRange([0, this.dim.plot.height]);

        this.rsiCrosshair = techan.plot.crosshair()
            .xScale(this.timeAnnotation.axis().scale())
            .yScale(this.rsiAnnotation.axis().scale())
            .xAnnotation(this.timeAnnotation)
            .yAnnotation([this.rsiAnnotation, this.rsiAnnotationLeft])
            .verticalWireRange([0, this.dim.plot.height]);

        this.svg = d3.select(this.$refs.graph)
            .attr("width", this.dim.width)
            .attr("height", this.dim.height);
        
        this.defs = this.svg.append("defs");

        this.defs.append("clipPath")
          .attr("id", "ohlcClip")
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", this.dim.plot.width)
          .attr("height", this.dim.ohlc.height);

        this.defs.selectAll("indicatorClip").data([0, 1])
          .enter()
          .append("clipPath")
          .attr("id", (d, i) => { return "indicatorClip-" + i; })
          .append("rect")
          .attr("x", 0)
          .attr("y", (d, i) =>  { return this.indicatorTop(i); })
          .attr("width", this.dim.plot.width)
          .attr("height", this.dim.indicator.height);

        this.svg = this.svg.append("g")
          .attr("transform", "translate(" + this.dim.margin.left + "," + this.dim.margin.top + ")");

        this.svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + this.dim.plot.height + ")");

        this.ohlcSelection = this.svg.append("g")
            .attr("class", "ohlc")
            .attr("transform", "translate(0,0)");

        this.ohlcSelection.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + this.x(1) + ",0)")
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -12)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Price ($)");

        this.ohlcSelection.append("g")
          .attr("class", "close annotation up");

        this.ohlcSelection.append("g")
          .attr("class", "volume")
          .attr("clip-path", "url(#ohlcClip)");

        this.ohlcSelection.append("g")
          .attr("class", "candlestick")
          .attr("clip-path", "url(#ohlcClip)");

        this.ohlcSelection.append("g")
          .attr("class", "indicator sma ma-0")
          .attr("clip-path", "url(#ohlcClip)");

        this.ohlcSelection.append("g")
          .attr("class", "indicator sma ma-1")
          .attr("clip-path", "url(#ohlcClip)");

        this.ohlcSelection.append("g")
          .attr("class", "indicator ema ma-2")
          .attr("clip-path", "url(#ohlcClip)");

        this.ohlcSelection.append("g")
          .attr("class", "percent axis");

        this.ohlcSelection.append("g")
          .attr("class", "volume axis");

        this.indicatorSelection = this.svg.selectAll("svg > g.indicator").data(["macd", "rsi"]).enter()
            .append("g")
            .attr("class", (d) => { return d + " indicator"; });

        this.indicatorSelection.append("g")
          .attr("class", "axis right")
          .attr("transform", "translate(" + this.x(1) + ",0)");

        this.indicatorSelection.append("g")
          .attr("class", "axis left")
          .attr("transform", "translate(" + this.x(0) + ",0)");

        this.indicatorSelection.append("g")
          .attr("class", "indicator-plot")
          .attr("clip-path", (d, i) => { return "url(#indicatorClip-" + i + ")"; });

        // Add trendlines and other interactions last to be above zoom pane
        this.svg.append('g')
          .attr("class", "crosshair ohlc");

        this.svg.append('g')
          .attr("class", "crosshair macd");

        this.svg.append('g')
          .attr("class", "crosshair rsi");

        this.svg.append("g")
          .attr("class", "trendlines analysis")
          .attr("clip-path", "url(#ohlcClip)");
        this.svg.append("g")
          .attr("class", "supstances analysis")
          .attr("clip-path", "url(#ohlcClip)");
      
    }
  },
  watch: {
    graph_data: {
      handler: function(newData, oldData) {
        if(this.graph_data.length > 0 && this.init){
          this.draw(this.graph_data)
        }
      },
      immediate: true,
    }
  },
  mounted(){
    this.initGraph()
    this.init = true
  },
  beforeDestroy(){

  }
}
</script>


<style lang="stylus">
@import "../../styles/graphs.styl"

.calendar-graph
  display flex
  flex-basis 100%
  
  .chart-container
    display flex
    flex-basis 100%
    height 100%

        
</style>
