// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import moment from 'moment'
import Charts from 'Chart.js'
import SyndicateUI from 'syndicate-ui'

// Sync the store with the router
import { sync } from 'vuex-router-sync'
sync(store, router)

//Install SyndicateUI
Vue.use(SyndicateUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


// Put these somewhere else?
window.log = console.log
window.moment = moment

