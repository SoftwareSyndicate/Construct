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
    ...mapMutations([
      'set_searching',
      'set_search'
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
    log(this.currencies)
    log(this.$store)
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
