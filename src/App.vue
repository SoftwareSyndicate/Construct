<template lang="pug">
div#app
  div.navbar-container
    navbar

  div.left-nav-container
    left-nav
  
  div.router-view-container(@click="routerClick($event)")
    transition(name="slide" mode='out-in')      
      router-view

  // Modals 
  create-portfolio-modal
</template>

<script>
import Navbar from "@/components/Navbar"
import LeftNav from "@/components/LeftNav"
import CreatePortfolioModal from "@/components/CreatePortfolioModal"
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
  
export default {
  components: {
    Navbar,
    LeftNav,
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
    ...mapGetters([
      'left_nav',
    ]),
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
    background #fefefe
    z-index 10
    height navbar-height

  // .left-nav-container
  //   width 75%
  //   height 100%
  //   position fixed
  //   z-index 4
  //   border-right 1px solid rgba(0, 0, 0, .1)
  //   box-shadow 1px 0px 1px 1px rgba(0, 0, 0, .1)
    
    
  .router-view-container
    height calc(100vh - navbar-height)
    padding-top navbar-height

    .page
       display flex
       flex-basis 100%

</style>
