<template lang="pug">
router-link(:to="{name: 'currency', params: {id: currency.id, name: currency.symbol}}" tag="div")
  div.currency-list-item(:class="{'updating': updating}")
    div.back
      div.line-container
        list-item-line(:graph_data="currency.history")
    div.front
      div.center
        img.icon.mobile(:src="'https://files.coinmarketcap.com/static/img/coins/64x64/' + currency.id + '.png'")
        img.icon.desktop(:src="'https://files.coinmarketcap.com/static/img/coins/128x128/' + currency.id + '.png'")        
        p.name {{currency.name}}

      div.right.mobile
        p.price(:class="") ${{currency.price_usd}}
        p.percent-change(:class="{'up': currency.percent_change_24h > 0, 'down': currency.percent_change_24h < 0}") {{currency.percent_change_24h}}%

      div.right.desktop
        p.price(:class="") ${{currency.price_usd}}

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
  watch: {
    currency: function (newCurrency, oldCurrency) {
      if(newCurrency.price_usd != oldCurrency.price_usd){
        this.updating = true
        setTimeout(()=> {
          this.updating = false
        }, 300)
      }
    }
  },
  props: {
    currency: {
      default: () => {}
    }
  },
  computed: {

  }
}
</script>

<style lang="stylus">
@import "../styles/main.styl"

.currency-list-item
  display flex
  flex-basis 100%

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
    flex-basis 10%
    display flex
    align-items center

    .rank
      font-size 24px


  .center
    display flex
    align-items center

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

  .right
    align-items center
    display flex
    margin-left auto
    @media screen and (min-width: 600px)  
      font-size 1.2em
      .price
        font-size 1.6rem
        
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
     margin-right 2em

    .percent-change
      font-weight 400
      &.up
        color $green
      &.down
        color $red



</style>
