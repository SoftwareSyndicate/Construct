<template lang="pug">
div#currency-page.page
  div.header
    
  
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'


export default {
  name: 'CurrencyPage',
  components: {

  },
  props: {
    

  },
  data () {
    return {
      
    }
  },
  methods: {

  },

  computed: {
    ...mapGetters([
      'currency'
    ])
  },
  mounted(){
    
  },
}
</script>


<style lang="stylus">
#currency-page
  display flex
  

  
</style>
