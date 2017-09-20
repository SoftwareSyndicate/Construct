<template lang="pug">
div#graph-builder
  div.row
    div.button.add(@click="addGraphCurrency('LTC')") Add Currency
  div.row
    ul.collapsible(data-collapsible='expandable' ref="currencyList")
      li(v-for="currency in graphs")
        div.collapsible-header
          i.material-icons.remove(@click="removeGraphCurrency(currency.name)") remove_circle_outline
          | {{currency.name}}
          i.material-icons.open keyboard_arrow_down
          i.material-icons.close keyboard_arrow_up
        div.collapsible-body
          div.lines
            div.line(v-for="line in currency.lines")
              p
                input(type="checkbox" :id="currency.name + '-' + line.name" :checked="line.active")
                label(:for="currency.name + '-' + line.name" @click="toggleGraphLine({currency, line})") {{line.type}}
      
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'GraphBuilder',
  methods: {
    ...mapMutations({
      addGraphCurrency: 'ADD_GRAPH_CURRENCY',
      removeGraphCurrency: 'REMOVE_GRAPH_CURRENCY',
      toggleGraphLine: 'TOGGLE_GRAPH_LINE',
    }),
  },
  computed: {
    ...mapState({
      'graphs': state => state.graphs.graphs,
    }),
  },
  watch: {
    graphs: {
      handler: function(){
        log("watch!")
        $(this.$refs.currencyList).collapsible();
      },
      deep: true 
    }
  },
  mounted(){
    this.$nextTick(()=>{
      $(this.$refs.currencyList).collapsible();
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
