<template lang="pug">
// router-link(:to="{name: 'currency', params: {id: currency.id, name: currency.symbol}}" tag="div")
div
  div.currency-list-item(:class="{'updating': updating}")
    div.back
      div.line-container
        list-item-line(:graph_data="currency.history")
    div.front
      div.left
        img.icon.mobile(:src="'https://files.coinmarketcap.com/static/img/coins/64x64/' + currency.id + '.png'")
        img.icon.desktop(:src="'https://files.coinmarketcap.com/static/img/coins/128x128/' + currency.id + '.png'")        
        p.name {{currency.name}}

      div.center.desktop
        p.price(:class="") {{exchange(currency.price_usd)}}
        
      div.right.mobile
        p.price(:class="") {{exchange(currency.price_usd)}}
        p.percent-change(:class="{'up': currency.percent_change_24h > 0, 'down': currency.percent_change_24h < 0}") {{currency.percent_change_24h}}%

      div.right.desktop
        // p.volume(:class="") ${{parseFloat(currency['24h_volume_usd']).toLocaleString()}}
        p.volume(:class="") {{exchange(parseFloat(currency['market_cap_usd']))}}

        div.percent-changes
          div.change
            span 1hr 
            p.percent-change(:class="{'up': currency.percent_change_1h > 0, 'down': currency.percent_change_1h < 0}") {{currency.percent_change_1h}}%
          div.change
            span 24hr 
            p.percent-change(:class="{'up': currency.percent_change_24h > 0, 'down': currency.percent_change_24h < 0}") {{currency.percent_change_24h}}%                    
          div.change
            span 7day
            p.percent-change(:class="{'up': currency.percent_change_7d > 0, 'down': currency.percent_change_7d < 0}") {{currency.percent_change_7d}}%                    
  
</template>

<script>
import ListItemLine from '@/components/graphs/ListItemLine'
import {mapState} from 'vuex'
export default {
  name: 'CurrencyListItem',
  components: {
    ListItemLine
  },
  data () {
    return {
      updating: false
    }
  },
  props: {
    currency: {
      default: () => {}
    },
  },
  computed: {
    ...mapState({
      "fiat_exchange_rates": state => state.currencies.fiat_exchange_rates,
      "base_fiat": state => state.user.base_fiat,
    })
  },
  methods: {
    exchange(value){
      if (!value || !this.base_fiat || !this.fiat_exchange_rates) return value
      if(this.base_fiat != "USD"){
        let exchanged = value * this.fiat_exchange_rates[this.base_fiat]
        return exchanged.toLocaleString(undefined, { style: 'currency', currency: this.base_fiat })
      } else {
        return "$" + value.toLocaleString()
      }
    }
  },
}
</script>

<style lang="stylus">
@import "../styles/main.styl"

.currency-list-item
  display flex
  flex-basis 100%
  cursor pointer
  align-items center
  background  white
  border 1px solid rgba(0, 0, 0, .1)
  box-shadow 0px 1px rgba(0, 0, 0, .1)
  min-height 50px
  transition all .3s ease
  position relative

  @media screen and (min-width: 600px)  
    height 100px
  
  .back
    padding-top .3em
    position absolute
    flex-basis 100%
    display flex
    align-items center
    height 100%
    width calc(100%)
    .line-container
      height 100%    
      flex-basis 100%
      display flex
      align-items center
        
  .front
    padding 15px 20px
    flex-basis 100%
    display flex
    align-items center    
    z-index 3
  &.updating
    background rgba(0, 0, 0, .05)

  .left
    display flex
    align-items center
    flex-basis 50%

    .icon
      font-size 30px
      margin-right .6em
      min-width 30px

      &.mobile
        height 32px
        width 32px
      &.desktop
        height 64px
        width 64px

    .name
      font-size 1.5em
      
      @media screen and (min-width: 600px)  
        font-size 2em

  .center
    .price
      font-size 1.4rem
      
  .right
    margin-left auto
    font-size 1.2em
    align-items center
    display flex
    @media screen and (min-width: 600px)  
      font-size 1.2em
      .volume
        font-size 1.2rem
        margin-right 2em
        
      .percent-changes
        .change
          margin-bottom .5em
          display flex
          flex-basis 100%
          justify-content flex-end
          display flex
          span
            flex-basis 50%
            margin-right .5em

          &:last-child
            margin-bottom 0px
    .price
     margin-right 1em

    .percent-change
      font-weight 400
      &.up
        color $green
      &.down
        color $red



</style>
