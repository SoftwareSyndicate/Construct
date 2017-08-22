<template lang="pug">
div#create-portfolio-modal(v-if="open")
  div.container
    div.header
      h3 New Portfolio
    div.body
      div.field
        input(placeholder='name')
      div.field
        input(placeholder='symbol')
        input(placeholder='amount' type="number")

    div.footer
      div.button(@click="add_portfolio(portfolio)") create
        
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      open: false,                // TODO
      portfolio: {
        name: "",
        currencies: []
      }
    }
  },
  methods: {
    ...mapActions([
      'set_open',
      'create_portfolio'
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

#create-portfolio-modal
    display flex
    position fixed
    justify-content center
    align-items center
    top 15vh
    width 100vw

  .container
    background white
    border 1px solid rgba(0, 0, 0, .1)
    box-shadow 1px 2px 3px 1px rgba(0,0,0,.25)    
    padding 2em
    width 60vw

    .header
      margin-bottom 1.5em
    .body
      display flex
      flex-wrap wrap
      margin-bottom 1.5em
      
      .field
        display flex
        flex-basis 100%
        margin-bottom .5em
        align-items center
    .footer
      display flex
      align-items center
      justify-content flex-end
      

</style>
