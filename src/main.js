import Vue from 'vue'
import App from './App.vue'
import 'font-awesome/css/font-awesome.css'

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


Vue.config.productionTip = false

new Vue({
  store,
  router,
  VueSimpleAlert,
  render: h => h(App),
}).$mount('#app')
