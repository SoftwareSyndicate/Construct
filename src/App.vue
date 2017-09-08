<template lang="pug">
div#app
  div.navbar-container
    navbar

  div.left-nav-container
    left-nav
    
  div.right-nav-container
    right-nav

  div.router-view-container(@click="routerClick($event)")
    transition(name="slide" mode='out-in')      
      router-view

  // Modals 
  create-portfolio-modal
</template>

<script>
import Navbar from "@/components/Navbar"
import LeftNav from "@/components/LeftNav"
import RightNav from "@/components/RightNav"
import CreatePortfolioModal from "@/components/CreatePortfolioModal"
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
  
export default {
  components: {
    Navbar,
    LeftNav,
    RightNav,
    CreatePortfolioModal,
  },
  name: 'app',
  methods:{
    ...mapActions([
      'set_left_nav'
    ]),
    routerClick(e){
      this.set_left_nav({'open': false})
    }
  },
  mounted(){
    console.log("Welcome to the Construct")
  },
  computed: {
    
  },

}
</script>

<style lang="stylus">
@import "./styles/main.styl"

navbar-height = 60px
#app
  height 100%
  
  .navbar-container
    display flex
    width 100%
    position fixed
    background #fff
    z-index 10
    height navbar-height

  .router-view-container
    height calc(100vh - navbar-height)
    padding-top navbar-height

    .page
       display flex
       flex-basis 100%

</style>
