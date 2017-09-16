<template lang="pug">
div#graph-builder
  div.row
    div.button.add(@click="addCurrency()") Add Currency
  div.row
    ul.collapsible(data-collapsible='expandable' ref="currencyList" )
      li(v-for="currency in graphs")
        div.collapsible-header
          i.material-icons.remove(@click="removeCurrency(currency)") remove_circle_outline
          | {{currency.name}}
          i.material-icons.open keyboard_arrow_down
          i.material-icons.close keyboard_arrow_up
        div.collapsible-body
          div.lines
            div.line(v-for="line in lineTypes")
              p
                input(type="checkbox" :id="currency.name + '-' + line + '-line'") 
                label(:for="currency.name + '-' + line + '-line'") {{line}}
      
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider.js'
import noUiSliderCSS from 'materialize-css/extras/noUiSlider/nouislider.css'

export default {
  name: 'GraphBuilder',
  data () {
    return {
      
    }
  },
  methods: {
    ...mapMutations({
      openNav: 'RIGHT_NAV_OPEN',
      closeNav: 'RIGHT_NAV_CLOSE',
      addCurrency: 'ADD_CURRENCY',
      removeCurrency: 'REMOVE_CURRENCY'
    }),
  },
  computed: {
    ...mapState({
      'graphs': state => state.currencies.graphs,
      'lineTypes': state => state.currencies.line_types,
    })
  },

  watch: {
    graphs: {
      handler: ()=>{
        log("fck!")
        log(this.graphs)
      },
      deep: true 
    }
  },

  mounted(){
    $(this.$refs.currencyList).collapsible();
    log(this.lineTypes)
  },
  beforeDestroy(){

  }
}
</script>


<style lang="stylus">
@import "../../styles/main.styl"
  
#graph-builder
  height 100%
  padding 0 1em

  .button.add
    flex-basis 100%

  .collapsible
    flex-basis 100%
    box-shadow none

    .collapsible-header
      &.active
        i.open
          display none
        i.close
          display block
          
      i.open
        margin-left auto
        margin-right 0
      i.close
        display none
        margin-left auto
        margin-right 0
        
    .collapsible-body
      background-color #f9fafd

    .lines
      display flex
      flex-basis 100%
      flex-wrap wrap
      .line
        display flex
        flex-basis 100%
  
</style>
