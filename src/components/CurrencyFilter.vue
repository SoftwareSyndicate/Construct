<template lang="pug">
div#currency-filter
  div.header
    span Filters
  div.order-by-container
    div.input-field
      select
        option(value="") Taco
        option(value="") Loco
        option(value="") Trucko
      label Materialize Select

</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'


export default {
  name: 'RightNav',
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations({
      openNav: 'RIGHT_NAV_OPEN',
      closeNav: 'RIGHT_NAV_CLOSE'
    }),
  },
  computed: {
    ...mapState({
      "filters": state => state.currencies.filters,
    }),
  },

  mounted(){
    $('select').material_select();
  },
  beforeDestroy(){
    $('select').material_select('destroy');
  }
}
</script>


<style lang="stylus">
#currency-filter
  height 100%
  background #f9fafd
  .header
    display flex
    background darken(orange, 5%)
    color white
    padding .5em
    font-size 2em
    font-weight 400
  .order-by-container
    display flex
    padding 0 1em
    .input-field
      flex-basis 100%
</style>
