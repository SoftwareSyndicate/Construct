<template lang="pug">
md-sidenav.right-nav.md-right(ref="nav" @open="openNav()" @close="closeNav()" :md-swipeable="true" :md-swipe-threshold="50" :md-swipe-distance="100")
  md-toolbar.md-large
    div.md-toolbar-container
      h3.md-title {{title}}
      
  
    
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
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
  watch: {
    open: {
      handler: function(newData, oldData) {
        if(this.open){
          this.$refs.nav.open();
        } else {
          this.$refs.nav.close();
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
    
  }
}
</script>


<style lang="stylus">
.right-nav
  .md-toolbar
    min-height 40px
    height 40px    
    background orange
    display flex
    align-items center

    .md-toolbar-container
      height 40px    

</style>
