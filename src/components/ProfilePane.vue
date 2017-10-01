<template lang="pug">
div#profile-pane
  div.row
    span Name
    div.input-field
      input(:value="filters.name" @input="updateSearch")

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProfilePane',
  data () {
    return {
      order_by_types: [
        {
          name: "Market Cap",
          value: "market_cap_usd",
        },
        {
          name: "24hr Volume",
          value: "24hr_volume_usd",
        },
        {
          name: "Name",
          value: "name",
        },
        {
          name: "Price",
          value: "price_usd",
        },
        {
          name: "1hr % Change",
          value: "percent_change_1h",
        },
        {
          name: "24hr % Change",
          value: "percent_change_24h",
        },
        {
          name: "7day % Change",
          value: "percent_change_7d",
        }
      ]
    }
  },
  watch: {
    filters: {
      handler: function(newData, oldData) {
        this.initFilters()
      },
    },
  },
  methods: {
    ...mapMutations({
      openNav: 'RIGHT_NAV_OPEN',
      closeNav: 'RIGHT_NAV_CLOSE',
      updateFilters: "UPDATE_FILTERS",
      resetFilters: "RESET_FILTERS",
    }),
    updateOrderBy(e){
      setTimeout(()=> {
        this.updateFilters({order_by: e.currentTarget.value})
      }, 200)
    },
    updateReverse(e){
      setTimeout(()=> {
        this.updateFilters({reverse: this.$refs.reverseSwitch.checked})
      }, 300)
    },
    updateSearch(e){
      this.updateFilters({name: e.target.value})
    },
    updatePriceRange(e){
      let low = this.price_range.get()[0]
      let high = this.price_range.get()[1]
      this.updateFilters({price_range: {low: low, high: high}})
    },
    updateMarketCapRange(e){
      let low = this.market_cap_range.get()[0]
      let high = this.market_cap_range.get()[1]
      this.updateFilters({market_cap_range: {low: low, high: high}})
    },
    updatePercentChange1hrRange(e){
      let low = this.percent_change_1hr_range.get()[0]
      let high = this.percent_change_1hr_range.get()[1]
      this.updateFilters({percent_change_1hr_range: {low: low, high: high}})
    },
    updatePercentChange24hrRange(e){
      let low = this.percent_change_24hr_range.get()[0]
      let high = this.percent_change_24hr_range.get()[1]
      this.updateFilters({percent_change_24hr_range: {low: low, high: high}})
    },
    updatePercentChange7dayRange(e){
      let low = this.percent_change_7day_range.get()[0]
      let high = this.percent_change_7day_range.get()[1]
      this.updateFilters({percent_change_7day_range: {low: low, high: high}})
    },
    initFilters(){
      this.$nextTick(()=>{
        $(this.$refs.orderBySelect).material_select()
        this.price_range.reset()
        this.market_cap_range.reset()
        this.percent_change_1hr_range.reset()
        this.percent_change_24hr_range.reset()
        this.percent_change_7day_range.reset()      
      })
    },
    reset(){
      this.resetFilters()
      this.initFilters()
    }
  },
  computed: {
    ...mapState({
      "filters": state => state.currencies.filters,
    }),
  },

  mounted(){
    $(this.$refs.orderBySelect).material_select()
    $(this.$refs.orderBySelect).on('change', this.updateOrderBy)

    // Price Range
    this.price_range = noUiSlider.create(this.$refs.priceRange, {
      start: [0, 5000],
      connect: true,
      // step: 1,
      orientation: 'horizontal',
      range: {
        'min': 0,
        '30%': [  1, 5 ],
        '80%': [  500, 500 ],
        'max': 5000
      },
      pips: {
		    mode: 'range',
		    density: 3
	    },
      format: wNumb({
        decimals: 0
      })
    });
    
    this.price_range.on('change', this.updatePriceRange)

    // Market Cap Range
    this.market_cap_range = noUiSlider.create(this.$refs.marketCapRange, {
      start: [0, 100000000000],
      connect: true,
      // step: 1,
      orientation: 'horizontal',
      range: {
        'min': 0,
        'max': 100000000000
      },
      pips: {
		    mode: 'range',
		    density: 3
	    },
      format: wNumb({
        decimals: 0
      })
    });
    
    this.market_cap_range.on('change', this.updateMarketCapRange)

    // Percent Change 1hr Range
    this.percent_change_1hr_range = noUiSlider.create(this.$refs.percentChange1hrRange, {
      start: [-100, 100],
      connect: true,
      orientation: 'horizontal',
      range: {
        'min': -100,
        'max': 100
      },
      pips: {
		    mode: 'range',
		    density: 3
	    },
      format: wNumb({
        decimals: 0
      })
    });
    
    this.percent_change_1hr_range.on('change', this.updatePercentChange1hrRange)
    
    // Percent Change 24hr Range
    this.percent_change_24hr_range = noUiSlider.create(this.$refs.percentChange24hrRange, {
      start: [-100, 100],
      connect: true,
      orientation: 'horizontal',
      range: {
        'min': -100,
        'max': 100
      },
      pips: {
		    mode: 'range',
		    density: 3
	    },
      format: wNumb({
        decimals: 0
      })
    });
    
    this.percent_change_24hr_range.on('change', this.updatePercentChange24hrRange)

    // Percent Change 7day Range
    this.percent_change_7day_range = noUiSlider.create(this.$refs.percentChange7dayRange, {
      start: [-100, 100],
      connect: true,
      orientation: 'horizontal',
      range: {
        'min': -100,
        'max': 100
      },
      pips: {
		    mode: 'range',
		    density: 3
	    },
      format: wNumb({
        decimals: 0
      })
    });
    
    this.percent_change_7day_range.on('change', this.updatePercentChange7dayRange)
    
  },
  beforeDestroy(){
    $('select').material_select('destroy');
  }
}
</script>


<style lang="stylus">
@import "../styles/main.styl"
  
#currency-filter
  height 100%
  position relative
  .header
    display flex
    align-items center
    justify-content center
    font-family 'Cinzel', serif
    font-size 42px
    height 100px
    margin-bottom 20px
    position relative
    i
      color white
      margin-right .2em
    span
      line-height 1
  .row
    padding 0 2em
    justify-content space-between
    height 40px
    margin-bottom .5em

    span
      font-size 1.2em
      flex-basis 50%
    &.range
      margin-bottom 2.5em
      flex-wrap wrap

      .noUi-target
        flex-basis 100%
      @media screen and (min-width: 600px)  
        flex-wrap no-wrap
        margin-bottom 3.5em
    ul
      li
        span
          color $purple !important
          
    .noUi-target
      width 50% !important
    .noUi-value
      top 20px
    .noUi-pips
      height 0px

  .market-cap
    .noUi-value
      left 80% !important
      
  .input-field
    flex-grow 1
    input
      font-size 1.2em

   input:focus
     padding-left .5em !important

   .reset
     width 100%
     position absolute
     bottom 0px
     .button
       flex-basis 100%
       

</style>
