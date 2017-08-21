<template lang="pug">
div#portfolios-page
  p portfolios
  p portfolios
  p portfolios 
  
</template>

<script>
import TimeSeries from '@/components/graphs/TimeSeries'
import LineGraph from '@/components/graphs/Line'

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'PortfoliosPage',
  components: {
    TimeSeries,
    LineGraph
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
    log("ok")
  },
}
</script>


<style lang="stylus">

#portfolios-page
  display flex
  flex-wrap wrap
  flex-basis 100%
  
</style>
