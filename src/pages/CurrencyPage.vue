<template lang="pug">
div#currency-page
  div.top
    div.tab
      div.shapeshift-rates
        h2 ShapeShift 
        div.quote(v-for="quote in filtered_shapeshift_rates")
          p.currency {{quote.pair.split("_")[1]}}
          p.rate {{quote.rate}}
      
    
  div.bottom
    div.icon
      i.material-icons insert_chart
    div.icon
      i.material-icons dialpad
    div.icon
      i.material-icons compare_arrows
    
  
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'


export default {
  name: 'CurrencyPage',
  components: {

  },
  props: {
    

  },
  data () {
    return {
      
    }
  },
  methods: {

  },

  computed: {
    ...mapGetters([
      'currency',
      'filtered_shapeshift_rates',
    ])
  },
  mounted(){
    
  },
}
</script>


<style lang="stylus">
@import "../styles/main.styl"

#currency-page
  display flex
  flex-wrap wrap
  flex-basis 100%
  
  .top
    height calc(100vh - 160px)
    display flex
    flex-basis 100%
    overflow scroll
    padding 1em

    .tab
      flex-basis 100%

    h2
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
    position absolute
    bottom 0px
    height 50px
    align-items center
    justify-content space-evenly

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
        background $orange
        i
          color white

      &:active
        background $orange
        i
          color white
        
      i
        font-size 34px
  
</style>
