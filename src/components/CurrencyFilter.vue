<template lang="pug">
div#currency-filter
  p hi
  
    
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'


export default {
  name: 'RightNav',
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations({
      openNav: 'RIGHT_NAV_OPEN',
      closeNav: 'RIGHT_NAV_CLOSE'
    }),
  },
  computed: {
    ...mapState({
      "filters": state => state.currencies.filters,
    }),
  },

  mounted(){
    
  }
}
</script>


<style lang="stylus">
// #right-nav
//   .container


</style>
