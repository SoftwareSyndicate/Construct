<template lang="pug">
ul#right-nav.side-nav
  currency-filter(v-if="true")
    
    
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import CurrencyFilter from "@/components/CurrencyFilter"

export default {
  name: 'RightNav',
  components: {
    CurrencyFilter
  },
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
  watch: {
    open: {
      handler: function(newData, oldData) {
        if(this.open){
          // TODO
        } else {
          // TODO
        }
      },
    },
  },
  computed: {
    ...mapState({
      "open": state => state.right_nav.open,
      "title": state => state.right_nav.title,
    }),
  },

  mounted(){
    $('#right-nav-button').sideNav({
      menuWidth: 300, 
      edge: 'right', 
      closeOnClick: true, 
      draggable: true,
      onOpen: (el) => { this.openNav() }, 
      onClose: (el) => { this.closeNav() },
    })
  }
}
</script>


<style lang="stylus">
// #right-nav
//   .container


</style>
