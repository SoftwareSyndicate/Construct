<template lang="pug">
div#home-page
  div.currency-list-container
    currency-list(:currencies="sorted_currencies")

</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'

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
    ...mapActions([
      'fetch_currency_history',
      'set_brand',
      'set_search',
      'set_searching',
    ]),
  },

  computed: {
    ...mapGetters([
      'currencies',
      'sorted_currencies',
    ])
  },

  beforeDestroy(){
    this.set_searching(false)
    this.set_search("")
  },

  mounted(){
    this.set_brand("Construct")
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
