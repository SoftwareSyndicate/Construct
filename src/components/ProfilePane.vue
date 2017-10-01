<template lang="pug">
div#profile-pane
  div.name
    span {{first_name + " " + last_name}}
  div.email
    span {{email}}

  div.base-fiat
    span Base Fiat: {{base_fiat}}
  
    
      

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProfilePane',
  computed: {
    ...mapState({
      "fiat_exchange_rates": state => state.currencies.fiat_exchange_rates,
      "base_fiat": state => state.user.base_fiat,
      "first_name": state => state.user.first_name,
      "last_name": state => state.user.last_name,
      "email": state => state.user.email,
    })
  },
}
</script>


<style lang="stylus">
@import "../styles/main.styl"
#profile-pane
  height 100%
  flex-basis 100%
  padding 1em
  align-items baseline
  justify-content center
  flex-wrap wrap

  .name
    display flex
    font-family 'Cinzel', serif
    flex-basis 100%
    font-size 1.8em
    align-items center
    justify-content center
    margin-bottom .5em

  .email
    display flex
    font-family 'Cinzel', serif
    flex-basis 100%
    font-size 1em
    align-items center
    justify-content center
    margin-bottom 3em

  .base-fiat
    display flex
    flex-basis 100%
    font-size 1em
    align-items center
    justify-content center

</style>
