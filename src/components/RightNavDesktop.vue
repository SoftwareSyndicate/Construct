<template lang="pug">
div#right-nav-desktop
  div.header
    // img.icon(:src="'https://files.coinmarketcap.com/static/img/coins/64x64/' + currency.id + '.png'" alt="coin" v-if="brand != 'Construct'")            
    span.brand {{brand}}
  div.content-container  
    transition(name="slide-down" mode='out-in')          
      currency-filter(v-if="$route.name == 'currencies'")
      graph-builder(v-if="$route.name == 'currency'")
      profile-pane(v-if="$route.name == 'profile'")
    
    
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import CurrencyFilter from "@/components/CurrencyFilter"
import GraphBuilder from "@/components/graphs/GraphBuilder"
import ProfilePane from "@/components/ProfilePane"

export default {
  name: 'RightNavDesktop',
  components: {
    CurrencyFilter,
    GraphBuilder,
    ProfilePane,
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
  computed: {
    ...mapGetters([
      "brand",
      "currency",
    ]),
    ...mapState({
      "open": state => state.right_nav.open,
      "title": state => state.right_nav.title,
    }),
  },

  mounted(){
    
  }
}
</script>


<style lang="stylus">
#right-nav-desktop
  height 100%
  position relative
  display flex
  flex-wrap wrap
  overflow hidden
  .header
    display flex
    align-items center
    justify-content center
    font-family 'Cinzel', serif
    font-size 48px
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
      text-transform capitalize
    .icon
      margin-right .6em
      height 32px
      width 32px

      

  .content-container
    height calc(100% - 120px)
    flex-basis 100%

.fade-enter-active, .fade-leave-active 
  transition: opacity .5s

.fade-enter, .fade-leave-to 
  opacity: 0

</style>
