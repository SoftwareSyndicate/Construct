<template lang="pug">
  
div#navbar
  div.left
    i.material-icons menu
  div.center
    p.brand(v-if="!searching") {{brand}}
    input(v-else v-model="search")
  div.right(@click="searching = !searching")
    i.material-icons search
  
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      searching: false,
      search: ""
    }
  },
  methods: {
    ...mapActions({

    }),
  },

  computed: {
    ...mapGetters([
      'brand'
    ]),
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
