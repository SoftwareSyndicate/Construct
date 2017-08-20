<template lang="pug">
router-link(:to="{name: 'currency', params: {id: currency.id, name: currency.symbol}}" tag="div")
  div.currency-list-item(:class="{'updating': updating}")
    // div.left
    //   span.rank {{currency.rank}}

    div.center
      img.icon(:src="'https://files.coinmarketcap.com/static/img/coins/32x32/' + currency.id + '.png'")
      // span.icon(:class="'coins-' + currency.symbol")
      p.name {{currency.name}}

    div.right
      p.price(:class="") ${{currency.price_usd}}
      p.percent-change(:class="{'up': currency.percent_change_24h > 0, 'down': currency.percent_change_24h < 0}") {{currency.percent_change_24h}}%
  
</template>

<script>
export default {
  name: 'CurrencyListItem',
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
  padding .0em .8em
  align-items center
  background  white
  border 1px solid rgba(0, 0, 0, .1)
  box-shadow 0px 1px rgba(0, 0, 0, .1)
  min-height 50px
  transition all .3s ease

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
      margin-right .8em
      min-width 30px

    .name
      font-size 20px

  .right
    display flex
    margin-left auto

    .price
     margin-right 20px

    .percent-change
      font-weight 400
      &.up
        color $green
      &.down
        color $red
    
</style>
