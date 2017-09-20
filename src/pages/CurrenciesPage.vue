<template lang="pug">
div#currencies-page
  div.currency-list-container
    currency-list(:currencies="sorted_currencies")

</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'

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
    ...mapActions([
      'fetch_currency_history',
      'set_brand',
    ]),
  },
  computed: {
    ...mapGetters([
      'sorted_currencies',
    ])
  },
  created(){
    this.set_brand("Construct")
    this.currency_watcher = this.$store.dispatch("fetch_currencies")
  },
  beforeDestroy(){
    // TODO - Destory interval
    // window.removeInterval(this.currency_watcher) ???
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
