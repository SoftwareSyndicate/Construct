<template lang="pug">
div#home-page
  div.coin-list
    div.coin-container(v-for="coin in sortedCoins")
      div.coin
        div.left
          span.rank {{coin.rank}}

        div.center
          span.icon(:class="'coins-' + coin.symbol")
          p.name {{coin.name}}

        div.right
          p.price(:class="") ${{coin.price_usd}}
          p.percent-change(:class="") {{coin.percent_change_24h}}%
            

</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import Doughnut from '@/components/graphs/Doughnut'

export default {
  name: 'HomePage',
  components: {
    Doughnut,
  },
  props: {
    

  },
  data () {
    return {
      coins: []
    }
  },
  methods: {

  },

  computed: {
    sortedCoins(){
      return this.coins.sort(function(a, b){
        return a.rank - b.rank
      })
    }
  },

  mounted(){
    this.$http.get('https://api.coinmarketcap.com/v1/ticker/?limit=100').then(response => {
      this.coins = response.body
      console.log(this.coins)
    }, error => {

    });
  }
}
</script>


<style lang="stylus">
#home-page
  display flex
  flex-basis 100%
  
  .coin-list
    display flex
    flex-basis 100%
    flex-wrap wrap
    padding 1em
    
    .coin-container
      margin-bottom .5em
      flex-basis 100%

      .coin
        display flex
        flex-basis 100%
        padding .3em
        align-items center

        .left
          flex-basis 10%
          
          .rank
            font-size 24px
          

        .center
          display flex
          align-items center
          
          .icon
            font-size 30px
            margin-right .5em
            min-width 30px

          .name
            font-size 20px
            
        .right
          display flex
          margin-left auto

          .price
           margin-right 20px
           
          .percent-change
            &.up
              color green
            &.down
              color red
</style>
