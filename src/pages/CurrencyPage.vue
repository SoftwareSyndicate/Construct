<template lang="pug">
div#currency-page
  div.top
    div.tab(v-if="currency_page_tab == 'charts'")
      div.charts
        h3 Price
        line-graph(:data="currency_history.price")
        h3 Market Cap
        line-graph(:data="currency_history.market_cap")
        h3 Volume
        line-graph(:data="currency_history.volume")


    div.tab(v-if="currency_page_tab == 'shapeshift'")
      div.shapeshift-rates
        h2 ShapeShift 
        div.quote(v-for="quote in filtered_shapeshift_rates")
          p.currency {{quote.pair.split("_")[1]}}
          p.rate {{quote.rate}}
      
    
  div.bottom
    div.icon
      i.material-icons insert_chart
    div.icon
      i.material-icons dialpad
    div.icon
      i.material-icons compare_arrows
    
  
</template>

<script>
import TimeSeries from '@/components/graphs/TimeSeries'
import LineGraph from '@/components/graphs/Line'

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'CurrencyPage',
  components: {
    TimeSeries,
    LineGraph
  },
  props: {
    

  },
  data () {
    return {
      currency_page_tab: "charts",
    }
  },
  methods: {
    ...mapActions([
      'fetch_currency_history',
    ]),
  },

  computed: {
    ...mapGetters([
      'currency',
      'currency_history',
      'filtered_shapeshift_rates',
    ])
  },
  mounted(){
    if(this.$route.params.name){
      this.fetch_currency_history(this.$route.params.name)
    } else {
      this.unwatch = this.$watch('currency', ()=>{
        if(this.currency.id){
          _fetch_currency_history()
        }
      })
      let _fetch_currency_history = function(){
        this.fetch_currency_history(this.currency.symbol)
        this.unwatch()
      }.bind(this)
    }
  },
}
</script>


<style lang="stylus">
@import "../styles/main.styl"

#currency-page
  display flex
  flex-wrap wrap
  flex-basis 100%
  
  .top
    height calc(100vh - 160px)
    display flex
    flex-basis 100%
    overflow scroll
    padding 1em

    .tab
      flex-basis 100%

    h3
      margin-bottom 1em

    .quote
      display flex
      flex-basis 100%
      align-items center
      justify-content space-between
      margin-bottom 10px
    

  .bottom
    display flex
    flex-basis 100%
    width 100%
    position absolute
    bottom 0px
    height 50px
    align-items center
    justify-content space-evenly

    .icon
      cursor pointer
      justify-content center
      flex-grow 1
      display flex
      border-top 1px solid rgba(0, 0, 0, .2)
      border-right 1px solid rgba(0, 0, 0, .2)
      align-items center
      height 100%

      &:last-child 
        border-right none

      &:hover
        background $orange
        i
          color white

      &:active
        background $orange
        i
          color white
        
      i
        font-size 34px
  
</style>
