<template lang="pug">
  
div#navbar
  div.left
    p help
  div.center
    p help
  div.right
    p help
  
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      config: {}
    }
  },
  methods: {
    ...mapActions({

    }),
  },

  computed: {
    ...mapGetters({

    }),
  },

  mounted(){
    
  }
}
</script>


<style lang="stylus">
@import "../styles/main.styl"

$nav-height = 4em

#navbar
  display flex
  flex-basis 100%
  padding 0px 2em
  height 4em
  background-color $colors['blue']


  .left
    display flex
    
  .center
    display flex
    margin-left auto
    margin-right auto
    
  .right
    display flex
    margin-left auto
    align-items center
    
</style>
