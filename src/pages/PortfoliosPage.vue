<template lang="pug">
div#portfolios-page
  div.portfolio-list
    div.portfolio(v-for="portfolio in portfolios")
      div.name-container
        p.name {{portfolio.name}}

      div.chart-container
        doughnut(:data="portfolio.currencies")
</template>

<script>
import TimeSeries from '@/components/graphs/TimeSeries'
import LineGraph from '@/components/graphs/Line'
import Doughnut from '@/components/graphs/Doughnut'

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'PortfoliosPage',
  components: {
    TimeSeries,
    LineGraph,
    Doughnut
  },
  props: {
    

  },
  data () {
    return {

    }
  },
  methods: {
    ...mapActions([
      'fetch_currency_history',
      'set_brand',
    ]),
  },

  computed: {
    ...mapGetters([
      'portfolios',
      'currency',
      'currency_history',
      'filtered_shapeshift_rates',
    ])
  },
  mounted(){
    this.set_brand("Portfolios")
  },
}
</script>


<style lang="stylus">

#portfolios-page
  padding 1em
  display flex
  flex-wrap wrap
  flex-basis 100%

  .portfolio-list
    display flex
    flex-wrap wrap
    flex-basis 100%

    .portfolio
      background white
      display flex
      flex-wrap wrap
      flex-basis 100%
      padding 1em
      border 1px solid rgba(0, 0, 0, .1)

      .name-container
        flex-basis 100%
        display flex
        align-items center
        
      .chart-container
        display flex
        flex-basis 100%
  
</style>
