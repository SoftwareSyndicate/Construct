<template lang="pug">
div#graph-builder
  h3 Graph Builder comming soon!
  // div.lines
  //   div.line(v-for="line in lineTypes")
  //     p
  //       input(type="checkbox" :id="line" :checked="line.active")
  //       label(:for="line" @click="toggleGraphLine(line)") {{line}}
      
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'GraphBuilder',
  methods: {
    ...mapMutations({
      
    }),
    openAddGraphCurrencyModal(){

    },
  },
  computed: {
    ...mapState({
      'chartConfig': state => state.graphs.chart_config,
      'lineTypes': state => state.graphs.line_types,
    }),
  },
  watch: {
    graphs: {
      handler: function(){
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
