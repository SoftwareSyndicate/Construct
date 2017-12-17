<template lang="pug">
div#rumors-page
  h5 Rumors or whatever fuck you
  
        
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import Vue from 'vue'
import APIs from '@/store/apis'
import io from 'socket.io-client'

export default {
  name: 'RumorsPage',
  components: {

  },
  data () {
    return {
      
    }
  },
  methods: {
    ...mapMutations({
      setBrand: 'SET_BRAND'
    }),
  },
  computed: {
    ...mapGetters([
      'portfolios',
      'currency',
      'currency_history',
      'filtered_shapeshift_rates',
    ]),
  },
  created(){
    
    let url = "https://socket.etherdelta.com"
    this.socket = io.connect(url, { transports: ['websocket'] })

    
    this.socket.on('disconnect', () => {
      console.log('socket disconnected');
    });

    this.socket.on('orders', (orders) => {
      log("order: ", orders)
    });

    this.socket.once('market', (market) => {
      log("market: ", market)
    })
    
    this.socket.on('trades', (trades) => {
      log("trade: ", trades)
    })
    
    this.socket.on('connect', () => {
      this.socket.emit('getMarket', { token: '', user: '' });      
    })
    
  },
  mounted(){
    this.setBrand("Rumors")
  },
}
</script>


<style lang="stylus">

#rumors-page
  padding 1em
  display flex
  flex-wrap wrap
  flex-basis 100%

      
</style>
