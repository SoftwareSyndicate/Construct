<template lang="pug">
div#app
  router-view

</template>

<script>
export default {
  name: 'app',
  mounted(){

  }
}
</script>

<style lang="stylus" module>
@import "./styles/main.styl"
  
#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

</style>
