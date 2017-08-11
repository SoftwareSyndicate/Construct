<template lang="pug">
  
div#navbar
  div.left
    // p coins
  div.center
    p.brand Construct
  div.right
    // p exchanges
  
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

#navbar
  display flex
  flex-basis 100%
  padding 0px 2em
  height 4em
  justify-content space-between
  box-shadow 0px 1px 1px 1px rgba(0, 0, 0, .1)
  
  
  .left
    display flex
    align-items center
    
  .center
    display flex
    align-items center

    .brand
      font-family 'Cinzel', serif
      font-size 24px
    
    
  .right
    display flex
    align-items center
    
</style>
