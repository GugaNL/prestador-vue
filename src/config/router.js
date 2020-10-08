import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import AdminPages from '../components/admin/AdminPages'
import UsersList from '../components/admin/UsersList'
import UserRegisterEdit from '../components/admin/UserRegisterEdit'
import CategoryList from '../components/admin/CategoryList'
import CategoryRegisterEdit from '../components/admin/CategoryRegisterEdit'

Vue.use(VueRouter)

const routes = [
    { name: 'home', path: '/', component: Home },
    { name: 'adminPages', path: '/admin', component: AdminPages },
    { name: 'users', path: '/usuarios', component: UsersList },
    { name: 'user', path: '/user/:id', component: UserRegisterEdit },
    { name: 'newUser', path: '/user', component: UserRegisterEdit },
    { name: 'categories', path: '/categorias', component: CategoryList },
    { name: 'category', path: '/category/:id', component: CategoryRegisterEdit },
]

export default new VueRouter({
    mode: 'history',
    routes
})