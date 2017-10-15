<template lang="pug">
div#portfolios-page
  h5 Arbitrage
  .pairs-container
    .pair.header
      .info.name
        span Name
      .info.ed-price
        span ED Price
      .info.liq-price
        span Liq Price
      .info.diff-percent
        span Diff %
      .info.ed-vol
        span ED Vol
      .info.liq-vol
        span Liq Vol
      .info.vol-price
        span Vol * Price
    .pair(v-for="pair in pairs")
      .info.name
        span {{pair.name}}
      .info.ed-price
        span {{pair.ed.price}}
      .info.liq-price
        span {{pair.liq.price}}
      .info.diff-percent(:class="{'up': pair.diff > 0, 'down': pair.diff < 0}")
        span {{pair.diff}}
      .info.ed-vol
        span {{pair.ed.volume}}
      .info.ed-vol
        span {{pair.liq.volume}}
      .info.vol-price
        span {{pair.potential}}
        
</template>

<script>
import TimeSeries from '@/components/graphs/TimeSeries'
import LineGraph from '@/components/graphs/Line'
import Doughnut from '@/components/graphs/Doughnut'
import APIs from '../store/apis'
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'PortfoliosPage',
  components: {
    TimeSeries,
    LineGraph,
    Doughnut
  },
  props: {
    

  },
  data () {
    return {
      pairs: [],
      ed_pairs: null,
      liq_pairs: null
    }
  },
  methods: {
    ...mapMutations({
      setBrand: 'SET_BRAND'
    }),
    generateArbitrage(){
      let promises = []
      let ed = []
      let liq = []
      let all_ed = null


      // Get Ticker info from EtherDelta
      promises.push(APIs.EtherDelta.fetch_all_tickers().then(results => {
        all_ed = results
        for(let k in results){
          ed.push(k.split('_')[1].toLowerCase())
        }
      }))

      // Get Ticker info from Liqui
      promises.push(APIs.Liqui.fetch_all_tickers().then(results => {
        for(let k in results.pairs){
          if(k.split('_')[1] == 'eth'){
            liq.push(k.split('_')[0])
          }
        }
      }))

      Promise.all(promises).then(()=> {
        this.pairs = []
        let matching = ed.filter(p => {
          if(liq.indexOf(p) > -1){
            return true
          } else {
            return false
          }
        })

        let promises = []
        matching.map(pair => {
          promises.push(APIs.Liqui.fetch_ticker(pair + "_eth").then(results => {
            let ed_last = parseFloat(all_ed["ETH_" + pair.toUpperCase()].last)
            let liq_last = parseFloat(results[pair + "_eth"].last)
            let dif = ((ed_last - liq_last) / ((ed_last + liq_last) / 2)) * 100
            this.pairs.push({
              name: pair.toUpperCase(),
              diff: dif.toFixed(2),
              potential: parseFloat(all_ed["ETH_" + pair.toUpperCase()].quoteVolume * ed_last).toFixed(2),
              ed: {
                price: ed_last,
                volume: parseFloat(all_ed["ETH_" + pair.toUpperCase()].quoteVolume).toFixed(2),
                
              },
              liq: {
                price: liq_last,
                volume: parseFloat(results[pair + "_eth"].vol).toFixed(2),
              }

            })
          }))

          Promise.all(promises).then(()=> {
            this.pairs = this.pairs.sort((a,b)=>{
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }

              return 0;
            })
          })
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
    ])
  },
  created(){
    this.generateArbitrage()
    setInterval(()=> {
      this.generateArbitrage()
    }, 10000)
  },
  mounted(){
    this.setBrand("Portfolios")
//     let ed = []
//     let liq = []
//     let all_ed = null
// c    APIs.EtherDelta.fetch_all_tickers().then(results => {
//       all_ed = results
//       for(let k in results){
//         ed.push(k.split('_')[1].toLowerCase())
//       }

//       APIs.Liqui.fetch_all_tickers().then(results => {
//         log(results)
//         for(let k in results.pairs){
//           if(k.split('_')[1] == 'eth'){
//             liq.push(k.split('_')[0])
//           }
//         }

//         let matching = ed.filter(p => {
//           if(liq.indexOf(p) > -1){
//             return true
//           } else {
//             return false
//           }
//         })
        
//         matching.map(pair => {
//           APIs.Liqui.fetch_ticker(pair + "_eth").then(results => {
//             let ed_last = parseFloat(all_ed["ETH_" + pair.toUpperCase()].last)
//             let liq_last = parseFloat(results[pair + "_eth"].last)
//             let dif = ((ed_last - liq_last) / ((ed_last + liq_last) / 2)) * 100
//             log(pair)
//             log("Liqui price" + ": ", liq_last)
//             log("Ether Delta price" + ": ", ed_last)
//             log("Diff: ", dif)
//             log("Liqui Vol: ", parseFloat(results[pair + "_eth"].vol))
//             log("Ether Delta Vol: ", parseFloat(all_ed["ETH_" + pair.toUpperCase()].quoteVolume))
//             log("Vol * Price: ", parseFloat(all_ed["ETH_" + pair.toUpperCase()].quoteVolume * ed_last))
//             log("\n\n")

//             this.pairs.push({
//               name: pair.toUpperCase(),
//               diff: dif.toFixed(2),
//               potential: parseFloat(all_ed["ETH_" + pair.toUpperCase()].quoteVolume * ed_last).toFixed(2),
//               ed: {
//                 price: ed_last,
//                 volume: parseFloat(all_ed["ETH_" + pair.toUpperCase()].quoteVolume).toFixed(2),
                
//               },
//               liq: {
//                 price: liq_last,
//                 volume: parseFloat(results[pair + "_eth"].vol).toFixed(2),
//               }

//             })
//           })
//         })
//       })
//     })


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
