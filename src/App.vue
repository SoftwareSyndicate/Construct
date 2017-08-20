<template lang="pug">
div#app
  div.navbar-container
    navbar
  transition(name="slide")
    div.left-nav-container(v-if="left_nav.open")
      left-nav
  
  div.router-view-container(@click="routerClick($event)")
    transition(name="slide" mode='out-in')      
      router-view

</template>

<script>
import Navbar from "@/components/Navbar"
import LeftNav from "@/components/LeftNav"
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
  
export default {
  components: {
    Navbar,
    LeftNav
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
  
#app
  height 100%
  
  .navbar-container
    display flex
    width 100%
    position fixed
    background #fefefe

  .left-nav-container
    width 75%
    height 100%
    position fixed
    z-index 4
    border-right 1px solid rgba(0, 0, 0, .1)
    box-shadow 1px 0px 1px 1px rgba(0, 0, 0, .1)
    
    
  .router-view-container
    height 100%
    padding-top 64px

    .page
       display flex
       flex-basis 100%

.slide-enter-active 
  transition: all .3s ease;

.slide-leave-active 
  transition: all .3s ease;

.slide-enter, .slide-leave-to
  transform: translateX(-400px);
  opacity: 0;


</style>
