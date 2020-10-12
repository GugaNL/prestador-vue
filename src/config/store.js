import Vue from 'vue'
import Vuex from 'vuex'

//modules vuex
import menu from './modules/menu'
import user from './modules/user'
import category from './modules/category'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: { menu, user, category }
})