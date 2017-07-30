import Vue from 'vue'
import Vuex from 'vuex'

import soundcloud from './soundcloud'
import firebase from './firebase'

import components from './components'

Vue.use(Vuex)

console.log(firebase)

const store = new Vuex.Store({
  modules: {
    firebase,
    modal: components.modal,
    leftNav: components.leftNav,
    rightNav: components.rightNav
    // soundcloud,
  }
})

export default store
