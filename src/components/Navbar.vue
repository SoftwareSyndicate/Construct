<template lang="pug">
  
div#navbar
  div.left
    i.material-icons menu
  div.center
    transition(name="fade" v-if="!searching" mode="out-in")
      p.brand {{brand}}
    transition(name="fade" v-else mode="out-in")
      input(:value="search" @input="updateSearch" ref="search")
  div.right(@click="set_searching(!searching)")
    i.material-icons search
  
</template>

<script>
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
    ...mapActions({
      
    }),
    ...mapMutations([
      'set_brand',
      'set_searching',
      'set_search'
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
  height 4em
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
