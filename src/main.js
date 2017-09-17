// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import moment from 'moment'
// import * as d3 from "d3"

// Sync the store with the router
sync(store, router)

// Install VueResource
import VueResource from 'vue-resource'

Vue.use(VueResource);

import materialize from 'materialize-css'
import css from 'materialize-css/dist/css/materialize.css'


//Install SyndicateUI
// Vue.use(SyndicateUI)
Vue.config.productionTip = false

// Put these somewhere else?
window.log = console.log
window.moment = moment

// Move to Service Worker?
store.dispatch("fetch_currencies")
// store.dispatch("load_user")
// store.dispatch("load_currencies")

// window.onbeforeunload = function(event) {
//   store.dispatch("save_user")
//   store.dispatch("save_currencies")
// };

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

