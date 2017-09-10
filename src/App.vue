<template lang="pug">
div#app
  div.navbar-container.mobile
    navbar

  div.left-nav-container
    left-nav
    
  div.right-nav-mobile-container.mobile
    right-nav
    
  div.right-nav-desktop-container.desktop
    right-nav-desktop

  // div.right-nav-container
  //   right-nav-desktop
    
  div.router-view-container
    transition(name="slide" mode='out-in')      
      router-view

  // Modals 
  create-portfolio-modal
</template>

<script>
import Navbar from "@/components/Navbar"
import LeftNav from "@/components/LeftNav"
import RightNav from "@/components/RightNav"
import RightNavDesktop from "@/components/RightNavDesktop"
import CreatePortfolioModal from "@/components/CreatePortfolioModal"
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
  
export default {
  components: {
    Navbar,
    LeftNav,
    RightNav,
    RightNavDesktop,
    CreatePortfolioModal,
  },
  name: 'app',
  methods:{
    
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

mobile-navbar-height = 60px
desktop-navbar-height = 80px

#app
  height 100%
  display flex
  width 100vw
  overflow scroll
  
  @media screen and (min-width: 600px)
    flex-direction row-reverse
    
  .navbar-container
    display flex
    width 100%
    position fixed
    background #fff
    z-index 10
    height mobile-navbar-height

    @media screen and (min-width: 600px)  
      height desktop-navbar-height

  .right-nav-desktop-container
    flex-basis 25%
    background white
    border-left 1px solid rgba(0, 0, 0, .1)
    box-shadow 0px 1px 1px 1px rgba(0, 0, 0, .1)
    
  .router-view-container
    flex-basis 100%
    height "calc(100vh - %s)" % mobile-navbar-height  
    padding-top mobile-navbar-height
    
    @media screen and (min-width: 600px)
      height 100vh
      padding-top 0px
      flex-basis 75%
      overflow scroll
      
    .page
       display flex
       flex-basis 100%

</style>
