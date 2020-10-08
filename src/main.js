import Vue from 'vue'
import App from './App.vue'
import 'font-awesome/css/font-awesome.css'

import 'vue-select/dist/vue-select.css'

//Bootstrap
import './config/bootstrap'

//Toast messages
import './config/msgs'

//Custom alerts
import VueSimpleAlert from './config/VueSimpleAlert'

//Vuex conf
import store from './config/store'

//Routers
import router from './config/router'

import vSelect from './config/vSelect'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  VueSimpleAlert,
  vSelect,
  render: h => h(App),
}).$mount('#app')
