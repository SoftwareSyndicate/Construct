<template lang="pug">
div#currency-filter
  div.header
    span Construct
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
  div.row
    span Price
    div(ref="priceRange")



</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider.js'
import noUiSliderCSS from 'materialize-css/extras/noUiSlider/nouislider.css'

export default {
  name: 'RightNav',
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
    
    ul
      li
        span
          color $purple !important
          
    .noUi-target
      width 100% !important
    .noUi-value
      top 20px
      
    >span
      font-size 1.2em
      flex-basis 50%
      
    .input-field
      flex-grow 1
      input
        font-size 1.2em

   input:focus
     padding-left .5em !important

</style>
