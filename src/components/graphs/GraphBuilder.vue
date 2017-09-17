<template lang="pug">
div#graph-builder
  div.row
    div.button.add(@click="addCurrency()") Add Currency
  div.row
    ul.collapsible(data-collapsible='expandable' ref="currencyList" )
      li(v-for="currency in graphs")
        div.collapsible-header.active
          i.material-icons.remove(@click="removeCurrency(currency)") remove_circle_outline
          | {{currency.name}}
          i.material-icons.open keyboard_arrow_down
          i.material-icons.close keyboard_arrow_up
        div.collapsible-body
          div.lines
            div.line(v-for="line in currency.lines")
              p
                input(type="checkbox" :id="currency.name + '-' + line.type" :checked="line.active")
                label(:for="currency.name + '-' + line.type" @click="toggleLine({currency, line})") {{line.type}}
      
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

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
      addCurrency: 'ADD_GRAPH_CURRENCY',
      updateCurrency: 'UPDATE_GRAPH_CURRENCY',
      removeCurrency: 'REMOVE_GRAPH_CURRENCY',
      toggleLine: 'TOGGLE_GRAPH_LINE',
    }),
  },
  computed: {
    ...mapState({
      'graphs': state => state.currencies.graphs,
    }),
  },

  watch: {
    graphs: {
      handler: function(){
        // log("fck!")
        // log(this.graphs)
      },
      deep: true 
    }
  },

  mounted(){
    this.$nextTick(()=>{
      $(this.$refs.currencyList).collapsible();
      $('.graph-line-select').material_select();
    })
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
      padding 1em

    .lines
      display flex
      flex-basis 100%
      flex-wrap wrap
      .line
        display flex
        flex-basis 100%

        label
          color #292f33        

    .graph-line-select
      span
        color $purple    
      label
        top -8px

  
</style>
