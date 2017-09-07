<template lang="pug">
md-sidenav.md-left(ref="nav" @open="openNav()" @close="closeNav()" :md-swipeable="true" :md-swipe-threshold="50" :md-swipe-distance="100")
  md-toolbar.md-large
    div.md-toolbar-container
      h3.md-title Sidenav content

  p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibunns beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!

  
  // div.top

  // div.bottom
  //   div.links
  //     div.link(@click="set_left_nav({'open': false})")
  //       router-link(:to="{name: 'currencies'}" tag="div") Currencies
  //     div.link(@click="set_left_nav({'open': false})")
  //       router-link(:to="{name: 'portfolios'}" tag="div") Portfolios
    
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import 'vue-material/dist/components/mdSidenav/index.css'

export default {
  name: 'LeftNav',
  data () {
    return {
      
    }
  },
  methods: {
    ...mapMutations({
      openNav: 'LEFT_NAV_OPEN',
      closeNav: 'LEFT_NAV_CLOSE'
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
      "open": state => state.left_nav.open
    }),
  },

  mounted(){
    
  }
}
</script>


<style lang="stylus">



</style>
