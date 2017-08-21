<template lang="pug">
div#left-nav(:class="{'open': left_nav.open}")
  div.top

  div.bottom
    div.links
      div.link(@click="set_left_nav({'open': false})")
        router-link(:to="{name: 'home'}" tag="div") Currencies
      div.link(@click="set_left_nav({'open': false})")
        router-link(:to="{name: 'portfolios'}" tag="div") Portfolios
    
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
    ...mapActions([
      'set_left_nav',
    ]),
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
    background-image: linear-gradient(62deg, rgba(251, 171, 126, .98) 0%, rgba(247, 246, 104, .98) 100%);
    .links
      padding-top 3em
      padding-left 2em
      padding-right 2em
      display flex
      flex-wrap wrap
      flex-basis 100%

      .link
        display flex
        flex-basis 100%
        color white
        font-size 24px
        font-weight 400
        border 1px solid white
        padding .5em
        border-radius 2px
        margin-bottom 1em

        &:focus, &:hover, &:active
          background white
          color rgba(0, 0, 0, .5)
</style>
