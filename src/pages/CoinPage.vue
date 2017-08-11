<template lang="pug">
div#coin-page
  p coin page
  // doughnut()
  i.cc.BTC
  
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import Doughnut from '@/components/graphs/Doughnut'

export default {
  name: 'CoinPage',
  components: {
    Doughnut,
  },
  props: {
    

  },
  data () {
    return {

    }
  },
  methods: {

  },

  computed: {
    
  },

  mounted(){

  }
}
</script>


<style scoped lang="stylus">

  
  
</style>
