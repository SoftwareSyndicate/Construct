<template lang="pug">
div#currencies-page
  div.currency-list-container
    currency-list(:currencies="sorted_currencies")

</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

import CurrencyList from '@/components/CurrencyList'

export default {
  name: 'CurrenciesPage',
  components: {
    CurrencyList,
  },
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations({
      setBrand: 'SET_BRAND',
    }),
  },
  computed: {
    ...mapGetters([
      'sorted_currencies',
      'currencies',
    ])
  },
  created(){
    this.setBrand("Construct")
    this.$store.dispatch("fetch_fiat_exchange_rates")
    this.$store.dispatch("fetch_all_currencies").then(results => {
      this.$store.dispatch("fetch_currency_histories", this.sorted_currencies)
      this.$store.dispatch("watch_currency_histories", this.sorted_currencies).then(results => {
        this.currency_history_watchers = results
      })
    })
    this.$store.dispatch("watch_all_currencies").then(results => {
      this.currency_watcher = results
    })
  },
  beforeDestroy(){
    window.clearInterval(this.currency_watcher)
    this.currency_history_watchers.forEach(w => {
      window.clearInterval(w)
    })
  }
}
</script>


<style lang="stylus">
#currencies-page
  display flex
  flex-basis 100%
  
  .currency-list-container
    display flex
    flex-basis 100%
    
</style>
