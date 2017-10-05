<template lang="pug">
div#currency-filter
  div.row.name
    span Name
    input(:value="filters.name" @input="updateSearch" placeholder="Name or Symbol")

  div.row.order-by
    span Order By
    select#order-by-select(:value="filters.order_by" ref="orderBySelect" v-model="filters.order_by") 
      option(v-for="type in order_by_types" :value="type.value") {{type.name}}
  div.row.reverse
    span Reverse
    div.switch
      label
        input(type="checkbox" @change="updateReverse" :value="filters.reverse" id="reverse-switch" ref="reverseSwitch" v-model="filters.reverse")
        span.lever
          
  div.row.range.price
    span Price Range
    input(:value="filters.price_range_min" @input="updatePriceRangeMin" type="number" placeholder="min")
    input(:value="filters.price_range_max" @input="updatePriceRangeMax" type="number" placeholder="max")
    
  div.row.range.market-cap
    span Mkt Cap
    input(:value="filters.market_cap_range_min" @input="updateMarketCapRangeMin" type="number" placeholder="min")
    input(:value="filters.market_cap_range_max" @input="updateMarketCapRangeMax" type="number" placeholder="max")
    
  div.row.range
    span 1hr % Change
    input(:value="filters.percent_change_1hr_range_min" @input="updatePercentChange1hrMin" type="number" placeholder="min" step="0.1")
    input(:value="filters.percent_change_1hr_range_max" @input="updatePercentChange1hrMax" type="number" placeholder="min" step="0.1")
    
  div.row.range
    span 24hr % Change
    input(:value="filters.percent_change_24hr_range_min" @input="updatePercentChange24hrMin" type="number" placeholder="min" step="0.1")
    input(:value="filters.percent_change_24hr_range_max" @input="updatePercentChange24hrMax" type="number" placeholder="min" step="0.1")

  div.row.range
    span 7day % Change
    input(:value="filters.percent_change_7day_range_min" @input="updatePercentChange7dayMin" type="number" placeholder="min" step="0.1")
    input(:value="filters.percent_change_7day_range_max" @input="updatePercentChange7dayMax" type="number" placeholder="min" step="0.1")
    
  div.row.reset.desktop
    div.button(@click="reset()") Reset
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
    updatePriceRangeMin(e){
      this.updateFilters({price_range_min: parseFloat(e.target.value)})
    },
    updatePriceRangeMax(e){
      this.updateFilters({price_range_max: parseFloat(e.target.value)})
    },
    updateMarketCapRangeMin(e){
      this.updateFilters({market_cap_range_min: parseFloat(e.target.value)})
    },
    updateMarketCapRangeMax(e){
      this.updateFilters({market_cap_range_max: parseFloat(e.target.value)})
    },
    updatePercentChange1hrMin(e){
      this.updateFilters({percent_change_1hr_range_min: parseFloat(e.target.value)})
    },
    updatePercentChange1hrMax(e){
      this.updateFilters({percent_change_1hr_range_max: parseFloat(e.target.value)})
    },
    updatePercentChange24hrMin(e){
      this.updateFilters({percent_change_24hr_range_min: parseFloat(e.target.value)})
    },
    updatePercentChange24hrMax(e){
      this.updateFilters({percent_change_24hr_range_max: parseFloat(e.target.value)})
    },
    updatePercentChange1dayMin(e){
      this.updateFilters({percent_change_1day_range_min: parseFloat(e.target.value)})
    },
    updatePercentChange1dayMax(e){
      this.updateFilters({percent_change_1day_range_max: parseFloat(e.target.value)})
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
    // this.price_range = noUiSlider.create(this.$refs.priceRange, {
    //   start: [0, 5000],
    //   connect: true,
    //   // step: 1,
    //   orientation: 'horizontal',
    //   range: {
    //     'min': 0,
    //     '30%': [  1, 5 ],
    //     '80%': [  500, 500 ],
    //     'max': 5000
    //   },
    //   pips: {
		//     mode: 'range',
		//     density: 3
	  //   },
    //   format: wNumb({
    //     decimals: 0
    //   })
    // });
    
    // this.price_range.on('change', this.updatePriceRange)

    // // Market Cap Range
    // this.market_cap_range = noUiSlider.create(this.$refs.marketCapRange, {
    //   start: [0, 100000000000],
    //   connect: true,
    //   // step: 1,
    //   orientation: 'horizontal',
    //   range: {
    //     'min': 0,
    //     'max': 100000000000
    //   },
    //   pips: {
		//     mode: 'range',
		//     density: 3
	  //   },
    //   format: wNumb({
    //     decimals: 0
    //   })
    // });
    
    // this.market_cap_range.on('change', this.updateMarketCapRange)

    // // Percent Change 1hr Range
    // this.percent_change_1hr_range = noUiSlider.create(this.$refs.percentChange1hrRange, {
    //   start: [-100, 100],
    //   connect: true,
    //   orientation: 'horizontal',
    //   range: {
    //     'min': -100,
    //     'max': 100
    //   },
    //   pips: {
		//     mode: 'range',
		//     density: 3
	  //   },
    //   format: wNumb({
    //     decimals: 0
    //   })
    // });
    
    // this.percent_change_1hr_range.on('change', this.updatePercentChange1hrRange)
    
    // // Percent Change 24hr Range
    // this.percent_change_24hr_range = noUiSlider.create(this.$refs.percentChange24hrRange, {
    //   start: [-100, 100],
    //   connect: true,
    //   orientation: 'horizontal',
    //   range: {
    //     'min': -100,
    //     'max': 100
    //   },
    //   pips: {
		//     mode: 'range',
		//     density: 3
	  //   },
    //   format: wNumb({
    //     decimals: 0
    //   })
    // });
    
    // this.percent_change_24hr_range.on('change', this.updatePercentChange24hrRange)

    // // Percent Change 7day Range
    // this.percent_change_7day_range = noUiSlider.create(this.$refs.percentChange7dayRange, {
    //   start: [-100, 100],
    //   connect: true,
    //   orientation: 'horizontal',
    //   range: {
    //     'min': -100,
    //     'max': 100
    //   },
    //   pips: {
		//     mode: 'range',
		//     density: 3
	  //   },
    //   format: wNumb({
    //     decimals: 0
    //   })
    // });
    
    // this.percent_change_7day_range.on('change', this.updatePercentChange7dayRange)
    
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
  padding 0 1.2em
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
    justify-content space-between
    margin-bottom 1.5em

    span
      font-size 1.2em
      flex-basis 30%
      flex-grow 1

    &.order-by
      .select-wrapper
        display flex
        flex-grow 1
        align-items center

        .caret
          font-size 12px
          margin-right 10px
    &.range
      margin-bottom 1.5em
      flex-wrap wrap
        
      span
        flex-basis 100%
        margin-bottom .5em
      input
        flex-basis 40%
        flex-grow 0
        min-width 0px

        &:last-child
          margin-left auto !important
        
    ul
      li
        span
          color $purple !important
          
  .input-field
    flex-grow 1
    margin 0px
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
