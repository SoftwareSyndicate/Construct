<template lang="pug">
ul#right-nav-mobile.side-nav
  div.currency-filter-container(v-if="$route.name == 'currencies'")
    div.header
      h3 Apply Filters
      i.material-icons(@click="resetFilters()") refresh

    currency-filter
  div.graph-builder-container(v-if="$route.name == 'currency'")
    graph-builder
  
  
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import CurrencyFilter from "@/components/CurrencyFilter"
import GraphBuilder from "@/components/graphs/GraphBuilder"

export default {
  name: 'RightNavMobile',
  components: {
    CurrencyFilter,
    GraphBuilder,
  },
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations({
      openNav: 'RIGHT_NAV_OPEN',
      closeNav: 'RIGHT_NAV_CLOSE',
      resetFilters: 'RESET_FILTERS'
    }),
  },
  watch: {
    open: {
      handler: function(newData, oldData) {
        if(this.open){
          // TODO
        } else {
          // TODO
        }
      },
    },
  },
  computed: {
    ...mapState({
      "open": state => state.right_nav.open,
      "title": state => state.right_nav.title,
    }),
  },

  mounted(){
    $('#right-nav-button').sideNav({
      menuWidth: 300, 
      edge: 'right', 
      closeOnClick: true, 
      draggable: false,
      onOpen: (el) => { this.openNav() }, 
      onClose: (el) => { this.closeNav() },
    })
  }
}
</script>


<style lang="stylus">
  @import "../styles/main.styl"
  
#right-nav-mobile
  height 100%
  padding-bottom 0px
  z-index 9999
  .currency-filter-container
    height 100%
    align-items center
    justify-content center


    .header
      display flex
      align-items center
      flex-basis 100%
      background $blue
      padding 1em
      margin-bottom 10px
      height 60px
      h3 
        color white
        font-size 2em
      i
       margin-left auto
       color white

    #currency-filter
      height calc(100vh - 70px) 

</style>
