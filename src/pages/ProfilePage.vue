<template lang="pug">
div#profile-page
  div.profile-form
    div.field
      span.label First Name
      input(:value="first_name" @input="onFirstNameChange")
    div.field
      span.label Last Name
      input(:value="last_name" @input="onLastNameChange")
    div.field
      span.label Email
      input(:value="email" @input="onEmailChange")
    div.field
      span.label Base Fiat
      select#base-fiat-select
        option(:value="base_fiat" selected) {{base_fiat}}
        option(:value="name" v-for="rate, name in fiat_exchange_rates" :selected="name == base_fiat") {{name}}
        option(value="USD") USD
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'

export default {
  name: 'ProfilePage',
  components: {

  },
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations({
      setBrand: 'SET_BRAND',
      updateBaseFiat: 'users/UPDATE_BASE_FIAT',
      updateFirstName: 'users/UPDATE_FIRST_NAME',
      updateLastName: 'users/UPDATE_LAST_NAME',
      updateEmail: 'users/UPDATE_EMAIL',
    }),
    onFirstNameChange(e){
      this.updateFirstName(e.target.value)
    },
    onLastNameChange(e){
      this.updateLastName(e.target.value)
    },
    onEmailChange(e){
      this.updateEmail(e.target.value)
    },
    onBaseFiatChange(){
      let fiat = $('#base-fiat-select').val()
      this.updateBaseFiat(fiat)
    }
  },
  computed: {
    ...mapState({
      "fiat_exchange_rates": state => state.currencies.fiat_exchange_rates,
      "base_fiat": state => state.users.base_fiat,
      "first_name": state => state.users.first_name,
      "last_name": state => state.users.last_name,
      "email": state => state.users.email,
    })
  },
  created(){
    this.setBrand("Profile")
    this.$store.dispatch("fetch_fiat_exchange_rates").then(results => {
      this.fiat_select = $('#base-fiat-select').material_select(this.onBaseFiatChange)
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
  align-items baseline
  justify-content center
  @media screen and (min-width: 600px)
    align-items center
  .profile-form
    background white
    display flex
    flex-basis 90%  
    padding 1em
    border 1px solid rgba(0, 0, 0, .1)
    flex-wrap wrap
    @media screen and (min-width: 600px)    
      flex-basis 50%
      
    .field
      flex-basis 100%  
      display flex
      align-items center
      margin-bottom 1em

      .label
        flex-basis 30%

      .select-wrapper
        display flex
        flex-basis 70%

        .caret
          margin-right 1em
        ul
          max-height 200px

      input
        flex-basis 70%

      .save
        margin-left auto
</style>
