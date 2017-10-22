<template lang="pug">
div#portfolios-page
  h5 Arbitrage
  .pairs-container
    .pair.header
      .info.name
        span Name
      .info.ed-price
        span ED Ask
      .info.liq-price
        span ED Bid
      .info.diff-percent
        span Liq Ask
      .info.diff-percent
        span Liq Bid
      .info.ed-vol
        span ED Vol
      .info.liq-vol
        span Liq Vol
      .info.vol-price
        span Arb
    .pair(v-for="pair in arb_pairs")
      .info.name
        span {{pair.base}}
      .info.ed-price
        span {{pair.exchanges.ed.ask}}
      .info.ed-price
        span {{pair.exchanges.ed.bid}}
      .info.ed-price
        span {{pair.exchanges.liq.ask}}
      .info.liq-price
        span {{pair.exchanges.liq.bid}}
      .info.ed-vol
        span {{pair.exchanges.ed.volume}}
      .info.ed-vol
        span {{pair.exchanges.liq.volume}}
      .info.arb
        span {{pair.arb}}
        
</template>

<script>
import TimeSeries from '@/components/graphs/TimeSeries'
import LineGraph from '@/components/graphs/Line'
import Doughnut from '@/components/graphs/Doughnut'
import APIs from '../store/apis'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import Vue from 'vue'

export default {
  name: 'PortfoliosPage',
  components: {
    TimeSeries,
    LineGraph,
    Doughnut
  },
  data () {
    return {
      pairs: [],
      ed_pairs: null,
      liq_pairs: null,
      matched_pairs: ["ICN", "EDG", "TRST", "WINGS", "GUP", "TAAS", "LUN", "TKN", "BAT", "BNT", "MGO", "MYST", "SNGLS", "PTOY", "CFI", "SNT", "MCO", "STORJ", "ADX", "EOS", "PAY", "OMG", "CVC", "DGD", "OAX", "DNT", "STX", "ZRX", "TNT", "AE", "VEN", "BMC", "MANA", "PRO", "KNC", "SALT", "IND", "TRX", "ENG"]
    }
  },
  methods: {
    ...mapMutations({
      setBrand: 'SET_BRAND'
    }),
    generatePairs(){
      this.matched_pairs.forEach(mp => {
        this.pairs.push({
          base: mp,
          counter: "ETH",
          arb: null,
          exchanges: {
            ed: {},
            liq: {}
          },
        })
      })
    },
    update_pair_exchange(pair){
      for(let i = 0; i < this.pairs.length; i++){
        if(this.pairs[i].base == pair.base){
          found = true
          let updated = Object.assign({}, this.pairs[i], pair)
          Vue.set(this.pairs, i, updated)
        }
      }
    },
    generateArbitrage(){
      let promises = []
      
      // Get Ticker info from EtherDelta
      promises.push(APIs.EtherDelta.fetch_all_tickers().then(results => {
        for(let k in results){
          let base = k.split('_')[1].toUpperCase()
          for(let i = 0; i < this.pairs.length; i++){
            if(this.pairs[i].base == base){
              this.pairs.address = results[k].tokenAddr
              this.pairs[i].exchanges.ed = {
                ask:  parseFloat(results[k].ask),
                bid:  parseFloat(results[k].bid),
                last:  parseFloat(results[k].last),
                quote_volume:  parseFloat(results[k].quoteVolume),
                volume:  parseFloat(results[k].baseVolume),
              }
            }
          }
        }

        log(this.pairs)
      }, error => {
        this.generateArbitrage()
      }))

      // Get Ticker info from Liqui
      this.pairs.forEach(pair => {
        promises.push(APIs.Liqui.fetch_ticker(pair.base.toLowerCase() + "_eth").then(results => {
          for(let k in results){
            let base = k.split('_')[0].toUpperCase()
            for(let i = 0; i < this.pairs.length; i++){
              if(this.pairs[i].base == base){
                this.pairs.address = results[k].tokenAddr
                this.pairs[i].exchanges.liq = {
                  ask:  parseFloat(results[k].sell),
                  bid: parseFloat(results[k].buy),
                  last:  parseFloat(results[k].last),
                  low:  parseFloat(results[k].low),
                  high:  parseFloat(results[k].high),
                  volume:  parseFloat(results[k].vol).toFixed(2),
                  quote_volume:  parseFloat(results[k].vol_cur).toFixed(2),
                  avg:  parseFloat(results[k].avg),
                }
              }
            }
          }
        }))        
      })

      Promise.all(promises).then(()=> {
        this.pairs.forEach(pair => {
          if(pair.exchanges.ed.ask < pair.exchanges.liq.bid){
            let diff = ((pair.exchanges.ed.ask - pair.exchanges.liq.bid) / pair.exchanges.liq.bid) * 100
            pair.arb = "Buy ED - " + diff.toFixed(3)
          } else if(pair.exchanges.liq.ask < pair.exchanges.ed.bid){
            let diff = ((pair.exchanges.liq.ask - pair.exchanges.ed.bid) / pair.exchanges.ed.bid) * 100
            pair.arb = "Buy Liq - " + diff.toFixed(3)
          } else {
            pair.arb = "None"
          }
          
        })

      })
    }
  },
  computed: {
    ...mapGetters([
      'portfolios',
      'currency',
      'currency_history',
      'filtered_shapeshift_rates',
    ]),
    arb_pairs(){
      let arb_pairs = this.pairs.sort((a,b) => {
        if(a.base < b.base){
          return - 1
        } else if(a.base > b.base){
          return 1
        }
        return 0
      })

      return arb_pairs
      // return this.pairs.filter(p => {
      //   if(p.markets.ed && p.markets.liq){
      //     return true
      //   } else {
      //     return false
      //   }
      // })
      
    }
  },
  created(){
    this.generatePairs()
    this.generateArbitrage()
    setInterval(()=> {
      this.generateArbitrage()
    }, 10000)
  },
  mounted(){
    this.setBrand("Portfolios")
  },
}
</script>


<style lang="stylus">

#portfolios-page
  padding 1em
  display flex
  flex-wrap wrap
  flex-basis 100%

  .pairs-container
    background white
    display flex
    flex-wrap wrap
    flex-basis 100%
    border 1px solid rgba(0, 0, 0, .1)

    .pair
      display flex
      flex-basis 100%
      justify-content space-around
      align-items center
      padding .5em 1em

      .info
        flex-basis 14%
        text-align center

        &.up
          background-color greenyellow
        &.down 
          background-color orangered
      
</style>
