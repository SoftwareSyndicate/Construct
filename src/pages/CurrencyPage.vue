<template lang="pug">
#currency-page
  .chart-container
    currency-chart(:chart-data="currency.history", :base-currency="baseCurrency")
      
</template>

<script>
import CurrencyChart from '@/components/graphs/CurrencyChart'
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'CurrencyPage',
  components: {
    CurrencyChart,
  },
  data(){
    return {
      currency_page_tab: "chart",
    }
  },
  methods: {
    ...mapActions({
      fetchCurrencyHistories: 'fetch_currency_histories',
      fetchAllCurrencies: 'fetch_all_currencies',
    }),
    ...mapMutations({
      addGraphCurrency: 'ADD_GRAPH_CURRENCY',
      removeAllGraphs: 'REMOVE_ALL_GRAPHS',
      setBrand: 'SET_BRAND',
    }),
  },
  computed: {
    ...mapGetters({
      currencies: 'currencies',
      currency: 'currency',
      baseCurrency: 'users/base_currency',
    })
  },
  created(){
    this.setBrand(this.$route.params.name)
    if(!this.currencies.length){
      this.fetchAllCurrencies().then(()=>{
        this.fetchCurrencyHistories([this.currency])
        this.setBrand(this.currency.name)
      })
    } else {
      this.fetchCurrencyHistories([this.currency])
    }
  },
  watch: {
    
  },
  beforeDestroy(){
    // this.removeAllGraphs()
    // this.currency_history_watchers.forEach(w => {
    //   window.clearInterval(w)
    // })
  },
}
</script>


<style lang="stylus" scoped>
@import "../styles/main.styl"

#currency-page
  display flex
  flex-wrap wrap
  flex-basis 100%
  height 100%
  overflow hidden
  padding 1em

  .chart-container
    display flex
    flex-basis 100%
    background white
    display flex
    flex-basis 100%
    border 1px solid rgba(0, 0, 0, .1)
    padding 1em
    height 100%
  
  .top
    height calc(100vh - 60px)
    display flex
    flex-basis 100%
    padding 1em
    
    @media screen and (min-width: 600px)
      height calc(100vh)
      
    .tab
      flex-basis 100%

    h3
      margin-bottom 1em

    .quote
      display flex
      flex-basis 100%
      align-items center
      justify-content space-between
      margin-bottom 10px
    

  .bottom
    display flex
    flex-basis 100%
    width 100%
    position fixed
    bottom 0px
    height 50px
    align-items center
    justify-content space-evenly
    background-color white

    .icon
      cursor pointer
      justify-content center
      flex-grow 1
      display flex
      border-top 1px solid rgba(0, 0, 0, .2)
      border-right 1px solid rgba(0, 0, 0, .2)
      align-items center
      height 100%

      &:last-child 
        border-right none

      &:hover
        background rgba(0, 0, 0, .2)
        i
          color white

      &:active
        background rgba(0, 0, 0, .2)
        i
          color white
        
      i
        font-size 34px
  
</style>
