import Vue from 'vue'
import App from './App.vue'
import 'font-awesome/css/font-awesome.css'

//Bootstrap
import './config/bootstrap'

//Toast messages
import './config/msgs'

//Custom alerts
import VueSimpleAlert from './config/VueSimpleAlert'

//VeeValidate
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate"
import pt_BR from "vee-validate/dist/locale/pt_BR.json"
import * as rules from "vee-validate/dist/rules"

//Autocomplete from database
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap'

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

localize("pt_BR", pt_BR)

//Global registration
Vue.component("ValidationObserver", ValidationObserver)
Vue.component("ValidationProvider", ValidationProvider)
Vue.component('vue-typeahead-bootstrap', VueTypeaheadBootstrap)

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
