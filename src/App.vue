<template lang="pug">
div#app
  div.navbar-container
    navbar
  div.left-nav-container(:class="{'open': left_nav.open}")
    left-nav
  div.router-view-container
    router-view

</template>

<script>
import Navbar from "@/components/Navbar"
import LeftNav from "@/components/LeftNav"
import { mapGetters } from 'vuex'
  
export default {
  components: {
    Navbar,
    LeftNav
  },
  name: 'app',
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
  
#app

  .navbar-container
    display flex
    width 100%
    position fixed
    background #fefefe

  .left-nav-container
    display none
    width 70%
    height 100%
    position fixed
    z-index 2
    border-right 1px solid rgba(0, 0, 0, .1)
    box-shadow 1px 0px 1px 1px rgba(0, 0, 0, .1)
    
    &.open
      display block
      z-index 4
    
  .router-view-container
    display flex
    padding-top 64px

    .page
       display flex
       flex-basis 100%

       

</style>
