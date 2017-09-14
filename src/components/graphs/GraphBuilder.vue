<template lang="pug">
div#graph-builder
  div.row
    h1 graph builder coming soon
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider.js'
import noUiSliderCSS from 'materialize-css/extras/noUiSlider/nouislider.css'

export default {
  name: 'GraphBuilder',
  data () {
    return {
      
    }
  },
  methods: {
    ...mapMutations({
      openNav: 'RIGHT_NAV_OPEN',
      closeNav: 'RIGHT_NAV_CLOSE',
    }),
  },
  computed: {
    ...mapState({

    }),
  },

  mounted(){
  },
  beforeDestroy(){

  }
}
</script>


<style lang="stylus">
@import "../../styles/main.styl"
  
#graph-builder
  height 100%
  .header
    display flex
    align-items center
    justify-content center
    font-family 'Cinzel', serif
    font-size 42px
    height 100px
    margin-bottom 20px
    border-bottom 1px solid rgba(0, 0, 0, .1)
    position relative
    
    i
      color white
      margin-right .2em
    span
      line-height 1

</style>
