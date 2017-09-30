<template lang="pug">
  
div#bottom-nav
  router-link.nav-item(:to="item.link" v-for="item in nav_items" :key="item.link")
    i.material-icons {{item.icon}}

</template>

<script>
import { mapState } from 'vuex'  
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: 'Navbar',
  data(){
    return {
      nav_items: [
        {
          icon: "view_list",
          link: "currencies"
        },
        // {
        //   icon: "insert_chart",
        //   link: "portfolios"
        // },
        {
          icon: "person",
          link: "profile"
        },
      ]
    }
  },
  methods: {
    ...mapMutations([

    ]),
    ...mapActions([
      
    ]),
  },

  computed: {
    ...mapGetters([

    ]),
    ...mapState({
      'bottom_nav': state => state.bottom_nav
    })
  },

  mounted(){

  }
}
</script>


<style lang="stylus">

#bottom-nav
  display flex
  flex-basis 100%
  height 100%
  justify-content space-around

  .nav-item
    display flex
    flex-grow 1
    align-items center
    justify-content center
    border-right 1px solid rgba(0, 0, 0, .1)

    &:last-child
      border-right none

    &:hover
      cursor pointer
      background-color darken(white, 5%)

    &:active
      cursor pointer
      background-color darken(white, 25%)

    &.router-link-active
      background-color darken(white, 5%)
    i
      font-size 2em
        
</style>
