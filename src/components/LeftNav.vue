<template lang="pug">
ul#left-nav.side-nav
  h1 hi crohurh
  
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
    // open: {
    //   handler: function(newData, oldData) {
    //     if(this.open){
    //       this.$refs.nav.open();
    //     } else {
    //       this.$refs.nav.close();
    //     }
    //   },
    // },
  },
  computed: {
    ...mapState({
      "open": state => state.left_nav.open
    }),
  },

  mounted(){
    $("#left-nav-button").sideNav();
  }
}
</script>


<style lang="stylus">



</style>
