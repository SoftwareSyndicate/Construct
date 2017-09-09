<template lang="pug">
div#currency-filter
  div.header
    span Filters
  div.row
    span Name
    div.input-field
      input(:value="filters.name" @input="updateSearch")

  div.row
    span Order By
    div.input-field
      select#order-by-select(:value="filters.order_by") 
        option(v-for="type in order_by_types" :value="type.value") {{type.name}}
  div.row
    span Reverse
    div.switch
      label
        input(type="checkbox" @change="updateReverse" :value="filters.reverse" id="reverse-switch")
        span.lever
  div.row
    span Price
    div#price-range



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
        let reversed = $('#reverse-switch').prop('checked')
        this.updateFilters({reverse: reversed})
      }, 300)
    },
    updateSearch(e){
      this.updateFilters({name: e.target.value})
    }

  },
  computed: {
    ...mapState({
      "filters": state => state.currencies.filters,
    }),
  },

  mounted(){
    $('select').material_select()
    $('#order-by-select').on('change', this.updateOrderBy)
    var slider = document.getElementById('price-range');
    noUiSlider.create(slider, {
      start: [0, 100],
      connect: true,
      step: 1,
      orientation: 'horizontal',
      range: {
        'min': 0,
        'max': 100
      },
      format: wNumb({
        decimals: 0
      })
    });
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
  background #f9fafd
  .header
    display flex
    align-items center
    background $purple
    color white
    padding .5em
    font-size 2em
    font-weight 400
    margin-bottom 1em
    border-bottom 1px solid rgba(0, 0, 0, .1)
    box-shadow 0px 1px 1px 1px rgba(0, 0, 0, .1)
    
    i
      color white
      margin-right .2em
    span
      line-height 1
  .row
    padding 0 1em
    justify-content space-between
    height 40px
    margin-bottom .5em

    ul
      li
        span
          color $purple !important
    
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
