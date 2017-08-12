<template lang="pug">
div#app
  div.navbar-container
    navbar
  div.router-view-container
    router-view

</template>

<script>
import Navbar from "@/components/Navbar"
  
export default {
  components: {
    'navbar': Navbar
  },
  name: 'app',
  mounted(){
    
  }
}
</script>

<style lang="stylus">
@import "./styles/main.styl"
@import "./fonts/coins/style.css"

  
#app

  .navbar-container
    display flex
    width 100%
    position fixed
    background #fdfdfd
    
  .router-view-container
    display flex
    padding-top 64px

    .page
       display flex
       flex-basis 100%

       

</style>
