<template lang="pug">
  
div#navbar
  div.left(@click="LEFT_NAV_OPEN()")
    i.material-icons menu
  div.center
    transition(name="fade" v-if="!searching" mode="out-in")
      p.brand {{brand}}
    transition(name="fade" v-else mode="out-in")
      input(:value="search" @input="updateSearch" ref="search")
  div.right
    div.search(@click="RIGHT_NAV_OPEN()" v-if="$route.name == 'currencies'")
      i.material-icons filter_list
    div.search(@click="set_open(true)"  v-if="$route.name == 'portfolios'")
      i.material-icons playlist_add
  
</template>

<script>
import { mapState } from 'vuex'  
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      
    }
  },
  methods: {
    ...mapMutations([
      'LEFT_NAV_OPEN',
      'RIGHT_NAV_OPEN',
    ]),
    ...mapActions([
      'set_brand',
      'set_searching',
      'set_search',
    ]),
    updateSearch(e){
      this.set_search(e.target.value)
    }
  },

  computed: {
    ...mapGetters([
      'brand',
      'searching',
      'search',
    ]),
    ...mapState({
      'left_nav_open': state => state.left_nav.open
    })
  },

  watch: {
    searching: function(){
      if(this.searching){
        setTimeout(()=>{
          this.$refs.search.focus()
        }, 300)
      } 
    }
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
  height 100%
  justify-content space-between
  box-shadow 0px 1px 1px 1px rgba(0, 0, 0, .1)
  
  .left
    display flex
    align-items center
    flex-grow 1
    
  .center
    display flex
    align-items center
    justify-content center
    flex-grow 1
    
    .brand
      font-family 'Cinzel', serif
      font-size 24px
    
    
  .right
    display flex
    align-items center
    justify-content flex-end
    flex-grow 1
    
</style>
