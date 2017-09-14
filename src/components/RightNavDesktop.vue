<template lang="pug">
div#right-nav-desktop
  div.header
    transition(name="fade" mode="out-in" appear)
      span {{brand}}
  div.content-container  
    transition(name="slide-right" mode='out-in')          
      currency-filter(v-if="$route.name == 'currencies'")
      graph-builder(v-if="$route.name == 'currency'")
    
    
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import CurrencyFilter from "@/components/CurrencyFilter"
import GraphBuilder from "@/components/graphs/GraphBuilder"

export default {
  name: 'RightNavDesktop',
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
      closeNav: 'RIGHT_NAV_CLOSE'
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
    ...mapGetters([
      "brand"
    ]),
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
      draggable: true,
      onOpen: (el) => { this.openNav() }, 
      onClose: (el) => { this.closeNav() },
    })
  }
}
</script>


<style lang="stylus">
#right-nav-desktop
  height 100%
  position relative
  display flex
  flex-wrap wrap
  .header
    display flex
    align-items center
    justify-content center
    font-family 'Cinzel', serif
    font-size 42px
    height 100px
    margin-bottom 20px
    border-bottom 1px solid rgba(0, 0, 0, .1)
    position relative
    flex-basis 100%
    
    i
      color white
      margin-right .2em
    span
      line-height 1

  .content-container
    height calc(100% - 120px)
    flex-basis 100%

.fade-enter-active, .fade-leave-active 
  transition: opacity .5s

.fade-enter, .fade-leave-to 
  opacity: 0

</style>
