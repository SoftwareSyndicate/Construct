<template lang="pug">
div#coin-sheet-page
  iframe#iframe(src="https://www.coinsheet.org/coin/september-29-2017#content" width="100%" height="100%")
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'

export default {
  name: 'CoinSheetPage',
  methods:{
    
  },
  mounted(){

  }
}
</script>


<style lang="stylus">
#coin-sheet-page
  height 100%
  display flex
  flex-basis 100%
  padding 1em
  align-items baseline
  justify-content center

  
  
</style>
