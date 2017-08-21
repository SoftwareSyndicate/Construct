<template lang="pug">
div#portfolios-page
  
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
    this.set_brand("Portfolios")
  },
}
</script>


<style lang="stylus">

#portfolios-page
  display flex
  flex-wrap wrap
  flex-basis 100%
  
</style>
