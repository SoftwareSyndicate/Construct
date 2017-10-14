<template lang="pug">
div#currency-filter
  div.row.name
    span Name
    input(:value="filters.name" @input="updateSearch" placeholder="Name or Symbol")

  div.row.order-by
    span Order By
    select#order-by-select(:value="filters.order_by" ref="orderBySelect" v-model="filters.order_by") 
      option(v-for="type in order_by_types" :value="type.value") {{type.name}}

  div.row.auto-update
    span Auto-Update
    div.switch
      label
        input(type="checkbox" @change="updateAutoUpdate" :value="filters.auto_update" id="auto-update-switch" ref="autoUpdateSwitch" v-model="filters.auto_update")
        span.lever
          
  div.row.reverse
    span Reverse
    div.switch
      label
        input(type="checkbox" @change="updateReverse" :value="filters.reverse" id="reverse-switch" ref="reverseSwitch" v-model="filters.reverse")
        span.lever
  div.row.range.price
    span Price Range
    input(:value="filters.price_range_min" @input="updatePriceRangeMin" type="number" placeholder="min")
    i.material-icons settings_ethernet
    input(:value="filters.price_range_max" @input="updatePriceRangeMax" type="number" placeholder="max")
    
  div.row.range.market-cap
    span Mkt Cap
    input(:value="filters.market_cap_range_min" @input="updateMarketCapRangeMin" type="number" placeholder="min")
    i.material-icons settings_ethernet    
    input(:value="filters.market_cap_range_max" @input="updateMarketCapRangeMax" type="number" placeholder="max")
    
  div.row.range
    span 1hr % Change
    input(:value="filters.percent_change_1hr_range_min" @input="updatePercentChange1hrMin" type="number" placeholder="min" step="0.1")
    i.material-icons settings_ethernet
    input(:value="filters.percent_change_1hr_range_max" @input="updatePercentChange1hrMax" type="number" placeholder="min" step="0.1")
    
  div.row.range
    span 24hr % Change
    input(:value="filters.percent_change_24hr_range_min" @input="updatePercentChange24hrMin" type="number" placeholder="min" step="0.1")
    i.material-icons settings_ethernet
    input(:value="filters.percent_change_24hr_range_max" @input="updatePercentChange24hrMax" type="number" placeholder="min" step="0.1")

  div.row.range
    span 7day % Change
    input(:value="filters.percent_change_7day_range_min" @input="updatePercentChange7dayMin" type="number" placeholder="min" step="0.1")
    i.material-icons settings_ethernet
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
      this.updateFilters({order_by: e.currentTarget.value})
    },
    updateReverse(e){
      this.updateFilters({reverse: this.$refs.reverseSwitch.checked})
    },
    updateAutoUpdate(e){
      this.updateFilters({auto_update: this.$refs.autoUpdateSwitch.checked})
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
    updatePercentChange7dayMin(e){
      this.updateFilters({percent_change_7day_range_min: parseFloat(e.target.value)})
    },
    updatePercentChange7dayMax(e){
      this.updateFilters({percent_change_7day_range_max: parseFloat(e.target.value)})
    },
    
    initFilters(){
      this.$nextTick(()=>{
        $(this.$refs.orderBySelect).material_select()
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
    margin-bottom 1em
    @media screen and (min-width: 600px)
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

      i
        color rgba(0, 0, 0, .3)
        
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
     .button
       flex-basis 100%
       

</style>
