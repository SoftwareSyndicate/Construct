<template lang="pug">
div#currency-filter
  div.row
    span Name
    div.input-field
      input(:value="filters.name" @input="updateSearch")

  div.row
    span Order By
    div.input-field
      select#order-by-select(:value="filters.order_by" ref="orderBySelect") 
        option(v-for="type in order_by_types" :value="type.value") {{type.name}}
  div.row
    span Reverse
    div.switch
      label
        input(type="checkbox" @change="updateReverse" :value="filters.reverse" id="reverse-switch" ref="reverseSwitch")
        span.lever
  div.row.range
    span Price
    div(ref="priceRange")
  div.row.range.market-cap
    span Mkt Cap
    div(ref="marketCapRange")
  div.row.range
    span 1hr % Change
    div(ref="percentChange1hrRange")
  div.row.range
    span 24hr % Change
    div(ref="percentChange24hrRange")
  div.row.range
    span 7day % Change
    div(ref="percentChange7dayRange")

  div.row.reset(@click="resetFilters()")
    div.button(@click="resetFilters()") Reset
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider.js'
import noUiSliderCSS from 'materialize-css/extras/noUiSlider/nouislider.css'

export default {
  name: 'CurrencyFilter',
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
  methods: {
    ...mapMutations({
      openNav: 'RIGHT_NAV_OPEN',
      closeNav: 'RIGHT_NAV_CLOSE',
      updateFilters: "UPDATE_FILTERS",
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
    resetFilters(){
      this.updateFilters({
        time_interval: 60 * 60 * 1000,
        time_interval_name: "1h",
        order_by: "market_cap_usd",
        reverse: false,
        name: "",
        price_range: {
          high: null,
          low: null,
        },
        market_cap_range: {
          high: null,
          low: null,
        },
        percent_change_1hr_range: {
          high: null,
          low: null,
        },
        percent_change_24hr_range: {
          high: null,
          low: null,
        },
        percent_change_7day_range: {
          high: null,
          low: null,
        }
      })

      $(this.$refs.orderBySelect).material_select()
      this.price_range.reset()
      this.market_cap_range.reset()
      this.percent_change_1hr_range.reset()
      this.percent_change_24hr_range.reset()
      this.percent_change_7day_range.reset()      
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
  .header
    display flex
    align-items center
    justify-content center
    font-family 'Cinzel', serif
    font-size 42px
    height 100px
    margin-bottom 20px
    border-bottom 1px solid rgba(0, 0, 0, .1)
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
      margin-bottom 1.5em

    
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
     margin-top 2em
     .button
       flex-basis 100%
       

</style>
