<template lang="pug">
div#currency-filter
  div.header
    span Filters
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


</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'


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
      this.updateFilters({order_by: e.currentTarget.value})
    },
    updateReverse(e){
      let reversed = $('#reverse-switch').prop('checked')
      this.updateFilters({reverse: reversed})
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
  },
  beforeDestroy(){
    $('select').material_select('destroy');
  }
}
</script>


<style lang="stylus">
#currency-filter
  height 100%
  background #f9fafd
  .header
    display flex
    align-items center
    background orange
    color white
    padding .5em
    font-size 2em
    font-weight 400
    
    i
      color white
      margin-right .2em
    span
      line-height 1
  .row
    padding 0 1em
    justify-content space-between
    
    >span
      font-size 1.2em
      flex-basis 50%
      
    .input-field
      flex-grow 1
      input
        font-size 1.2em

</style>
