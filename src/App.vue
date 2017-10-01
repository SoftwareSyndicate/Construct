<template lang="pug">
div#app
  div.navbar-container.mobile
    navbar

  // div.left-nav-container
  //   left-nav
    
  div.right-nav-mobile-container.mobile
    right-nav-mobile
    
  div.right-nav-desktop-container.desktop
    right-nav-desktop

  div.router-view-container
    transition(:name="transitionType" mode='out-in')      
      router-view

  div.bottom-nav-container
    bottom-nav
    
  // Modals 
  create-portfolio-modal
</template>

<script>
import Navbar from "@/components/Navbar"
import BottomNav from "@/components/BottomNav"
import LeftNav from "@/components/LeftNav"
import RightNavMobile from "@/components/RightNavMobile"
import RightNavDesktop from "@/components/RightNavDesktop"
import CreatePortfolioModal from "@/components/CreatePortfolioModal"
import { mapState } from 'vuex'

  
export default {
  components: {
    Navbar,
    LeftNav,
    BottomNav,
    RightNavMobile,
    RightNavDesktop,
    CreatePortfolioModal,
  },
  name: 'app',
  computed: {
    ...mapState({
      "transitionType": state => state.user.transition
    })
  },
  created(){
    console.log("Welcome to the Construct")
  },
}
</script>

<style lang="stylus">
@import "./styles/main.styl"

mobile-navbar-height = 60px
desktop-navbar-height = 80px
bottom-nav-height = 60px

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
    height 100vh

  .bottom-nav-container
    position fixed
    width 100%
    bottom 0px
    left 0px
    border-top 1px solid rgba(0, 0, 0, .1)
    box-shadow 0px -1px 1px 0px rgba(0, 0, 0, .1)
    background white
    z-index 999
    height 60px
    
    @media screen and (min-width: 600px)
      width 75%
    
  .router-view-container
    flex-basis 100%
    height "calc(100vh - %s)" % (mobile-navbar-height)  
    padding-top mobile-navbar-height
    overflow scroll
    
    @media screen and (min-width: 600px)
      height "calc(100vh - %s)" % bottom-nav-height      
      padding-top 0px
      flex-basis 75%
      overflow scroll
      
    .page
       display flex
       flex-basis 100%

</style>
