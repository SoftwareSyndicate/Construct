<template lang="pug">
div.currency-list
  div.currency-container(v-for="currency in currencies")
    currency-list-item(:currency="currency")
</template>

<script>
import CurrencyListItem from '@/components/CurrencyListItem'
export default {
  name: 'CurrencyList',
  data () {
    return {

    }
  },
  components: {
    CurrencyListItem,
  },

  props: {
    currencies: {
      default: () => []
    }
  }
}
</script>


<style lang="stylus">

.currency-list
  display flex
  flex-basis 100%
  flex-wrap wrap
  padding 1em

  .currency-container
    margin-bottom .5em
    flex-basis 100%
    transition all .4s 
    
    &:hover
      box-shadow 3px 3px 1px 0px rgba(0,0,0,0.1)
    
</style>
