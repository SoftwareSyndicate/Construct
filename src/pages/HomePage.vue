<template lang="pug">
div#home-page
  div.coin-list-container
    currency-list(:currencies="sortedCurrencies")

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
      currencies: []
    }
  },
  methods: {

  },

  computed: {
    sortedCurrencies(){
      return this.currencies.sort(function(a, b){
        return a.rank - b.rank
      })
    }
  },

  mounted(){
    setInterval(()=> {
      this.$http.get('https://api.coinmarketcap.com/v1/ticker/?limit=100').then(response => {
        this.currencies = response.body
      }, error => {
        
      });
    }, 5000)
    this.$http.get('https://api.coinmarketcap.com/v1/ticker/?limit=100').then(response => {
      this.currencies = response.body
    }, error => {

    });
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
