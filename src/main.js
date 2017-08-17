// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import moment from 'moment'
// import SyndicateUI from 'syndicate-ui'
import VueResource from 'vue-resource'

// Sync the store with the router
sync(store, router)

// Install VueResource
Vue.use(VueResource);

//Install SyndicateUI
// Vue.use(SyndicateUI)
Vue.config.productionTip = false

// Put these somewhere else?
window.log = console.log
window.moment = moment

// Move to App?
store.dispatch("fetch_currencies")
store.dispatch("fetch_shapeshift_market_info")

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})



