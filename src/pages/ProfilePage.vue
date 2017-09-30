<template lang="pug">
div#profile-page
  div.profile-form
    div.field
      span.label First Name
      input(v-model="firstName")
    div.field
      span.label Last Name
      input(v-model="lastName")
    div.field
      span.label Base Fiat
      select#base-fiat-select
        option(:value="base_fiat" selected) {{base_fiat}}
        option(:value="name" v-for="rate, name in fiat_exchange_rates" :selected="name == base_fiat") {{name}}
    div.field
      div.button.save(@click="save") Save
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'

export default {
  name: 'ProfilePage',
  components: {

  },
  data () {
    return {
      firstName: "",
      lastName: "",
      selected_fiat: "",
    }
  },
  methods: {
    ...mapMutations({
      setBrand: 'SET_BRAND',
      updateBaseFiat: 'UPDATE_BASE_FIAT'
    }),
    save(){
      log("save")
      let fiat = $('#base-fiat-select').val()
      this.updateBaseFiat(fiat)
    }
  },
  computed: {
    ...mapGetters([

    ]),
    ...mapState({
      "fiat_exchange_rates": state => state.currencies.fiat_exchange_rates,
      "base_fiat": state => state.currencies.base_fiat,
    })
  },
  created(){
    this.setBrand("Profile")
    this.$store.dispatch("fetch_fiat_exchange_rates").then(results => {
      this.fiat_select = $('#base-fiat-select').material_select()
    })
  },
  mounted(){

  }
}
</script>


<style lang="stylus">
#profile-page
  height 100%
  display flex
  flex-basis 100%
  padding 1em
  align-items center
  justify-content center
    
  .profile-form
    background white
    display flex
    flex-basis 50%  
    padding 1em
    border 1px solid rgba(0, 0, 0, .1)
    flex-wrap wrap

    .field
      flex-basis 100%  
      display flex
      align-items center
      margin-bottom 1em

      .label
        flex-basis 30%

      .select-wrapper
        flex-basis 70%

      input
        flex-basis 70%

      .save
        margin-left auto
</style>
