<template lang="pug">
div#currency-page
  div.top
    div.tab(v-if="currency_page_tab == 'chart'")
      div.chart-container
        multi-graph(:graph_data="currency_history")

        // calendar-graph(:graph_data="currency_history")

    div.tab(v-if="currency_page_tab == 'shapeshift'")
      div.shapeshift-rates
        h2 ShapeShift 
        div.quote(v-for="quote in filtered_shapeshift_rates")
          p.currency {{quote.pair.split("_")[1]}}
          p.rate {{quote.rate}}
      
    
  // div.bottom
  //   div.icon
  //     i.material-icons insert_chart
  //   div.icon
  //     i.material-icons dialpad
  //   div.icon
  //     i.material-icons compare_arrows
    
  
</template>

<script>
import MultiGraph from '@/components/graphs/Multi'
import CalendarGraph from '@/components/graphs/Calendar'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'CurrencyPage',
  components: {
    MultiGraph,
    CalendarGraph,
  },
  props: {
    

  },
  data () {
    return {
      currency_page_tab: "chart",
      multiChartConfig: {
        crosshair: true,
        close: true,
        heikinashi: true,
      }
    }
  },
  methods: {
    ...mapActions([
      'fetch_currency_history',
      'fetch_currency_history_better',
      'set_brand',
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
      // this.fetch_currency_history_better(this.currency.id)
      this.set_brand(this.$route.params.id)
    } else {
      this.unwatch = this.$watch('currency', ()=>{
        if(this.currency.id){
          this.set_brand(this.$route.params.id)
          _fetch_currency_history()
        }
      })
      let _fetch_currency_history = function(){
        this.fetch_currency_history(this.currency.symbol)
        // this.fetch_currency_history_better(this.currency.symbol)
        this.unwatch()
      }.bind(this)
    }
  },
}
</script>


<style lang="stylus" scoped>
@import "../styles/main.styl"

#currency-page
  display flex
  flex-wrap wrap
  flex-basis 100%
  height 100%
  overflow hidden

  .chart-container
    display flex
    flex-basis 100%
    background white
    display flex
    flex-basis 100%
    border 1px solid rgba(0, 0, 0, .1)
    padding 1em
    height 100%
  
  .top
    height calc(100vh - 60px)
    display flex
    flex-basis 100%
    padding 1em
    
    @media screen and (min-width: 600px)
      height calc(100vh)
      
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
    position fixed
    bottom 0px
    height 50px
    align-items center
    justify-content space-evenly
    background-color white

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
        background rgba(0, 0, 0, .2)
        i
          color white

      &:active
        background rgba(0, 0, 0, .2)
        i
          color white
        
      i
        font-size 34px
  
</style>
