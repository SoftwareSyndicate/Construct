<template lang="pug">
div#left-nav(:class="{'open': left_nav.open}")
  div.top

  div.bottom
  
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: 'LeftNav',
  data () {
    return {
      
    }
  },
  methods: {
    ...mapActions({
      
    }),
    ...mapMutations([

    ]),
  },

  computed: {
    ...mapGetters([
      'left_nav',
    ]),
  },

  mounted(){
    
  }
}
</script>


<style lang="stylus">

#left-nav
  flex-basis 100%
  height 100%
  display none
  z-index 2
  
  &.open
    display block
    z-index 4
  
  .top
    background-color rgba(255, 255, 255, .9)
    height 100px
  .bottom
    height calc(100% - 100px)
    background-image: linear-gradient(62deg, rgba(251, 171, 126, .9) 0%, rgba(247, 246, 104, .9) 100%);    
</style>
