<template lang="pug">
div#add-graph-currency-modal(v-if="true")
  div.container
    div.header
      h3 Add Currency
    div.body
      div.currency-list-container
        p currency list container        
        div.currency-list
          div.currency-list-item(v-for="currency in currencies")
            p {{currency.name}}
        
    div.footer
      div.button(@click="addGraphCurrency(currency)") Add
        
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: 'AddGraphCurrencyModal',
  props: {
    currencies: {
      default: ()=>[],
    },
  },
  data(){
    return {
      
    }
  },
  methods: {
    ...mapMutations({
      addGraphCurrency: 'ADD_GRAPH_CURRENCY',
    }),
  },
  computed: {
    ...mapGetters([
      'brand',
      'searching',
      'search',
    ]),
  },
  mounted(){
    
  }
}
</script>


<style lang="stylus">

#create-portfolio-modal
    display flex
    position fixed
    justify-content center
    align-items center
    top 15vh
    width 100vw

  .container
    background white
    border 1px solid rgba(0, 0, 0, .1)
    box-shadow 1px 2px 3px 1px rgba(0,0,0,.25)    
    padding 2em
    width 60vw

    .header
      margin-bottom 1.5em
    .body
      display flex
      flex-wrap wrap
      margin-bottom 1.5em
      
      .field
        display flex
        flex-basis 100%
        margin-bottom .5em
        align-items center
    .footer
      display flex
      align-items center
      justify-content flex-end
      

</style>
