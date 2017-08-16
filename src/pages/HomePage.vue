<template lang="pug">
div#home-page
  div.coin-list-container
    currency-list(:currencies="sorted_currencies")

</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import CurrencyList from '@/components/CurrencyList'

export default {
  name: 'HomePage',
  components: {
    CurrencyList,
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
    ...mapGetters([
      'currencies',
      'sorted_currencies',
    ])
  },

  mounted(){
    
  }
}
</script>


<style lang="stylus">
#home-page
  display flex
  flex-basis 100%
  
  .currency-list-container
    display flex
    flex-basis 100%
    
</style>
