<template lang="pug">
  
div#create-portfolio-modal
  p ima modal
  
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
    ...mapActions([
      'set_open',
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
  z-index 3
  
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
