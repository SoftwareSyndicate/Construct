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
  watch: {
    auto_update: {
      handler: function(newData, oldData){
        if(this.auto_update){
          this.watchAll()
        } else {
          this.unWatchAll()
        }
      },
      deep: true
    }

  },
  methods: {
    ...mapMutations({
      setBrand: 'SET_BRAND',
    }),
    watchAll(){
      this.$store.dispatch("watch_all_currencies").then(results => {
        this.currency_watcher = results
      })

      this.$store.dispatch("watch_currency_histories", this.sorted_currencies).then(results => {
        this.currency_history_watchers = results
      })
    },
    unWatchAll(){
      if(this.currency_watcher){
        window.clearInterval(this.currency_watcher)
      }
      if(this.currency_history_watchers){
        this.currency_history_watchers.forEach(w => {
          window.clearInterval(w)
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'sorted_currencies',
      'currencies',
      'auto_update',
    ])
  },
  created(){
    this.setBrand("Construct")
    this.$store.dispatch("fetch_fiat_exchange_rates")
    this.$store.dispatch("fetch_all_currencies").then(results => {
      this.$store.dispatch("fetch_currency_histories", this.sorted_currencies)
      if(this.auto_update){
        this.watchAll()
      }
    })
  },
  beforeDestroy(){
    this.unWatchAll()
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
