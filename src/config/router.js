import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '../components/auth/Auth'
import Home from '../components/home/Home'
import AdminPages from '../components/admin/AdminPages'
import UsersList from '../components/admin/UsersList'
import UserRegisterEdit from '../components/admin/UserRegisterEdit'
import ProvidersList from '../components/admin/ProvidersList'
import ProviderRegisterEdit from '../components/admin/ProviderRegisterEdit'
import CategoryList from '../components/admin/CategoryList'
import CategoryRegisterEdit from '../components/admin/CategoryRegisterEdit'
import ServicesList from '../components/admin/ServicesList'
import ServiceRegisterEdit from '../components/admin/ServiceRegisterEdit'

Vue.use(VueRouter)

const routes = [
    { name: 'auth', path: '/auth', component: Auth },
    { name: 'home', path: '/', component: Home },
    { name: 'adminPages', path: '/admin', component: AdminPages },
    { name: 'users', path: '/usuarios', component: UsersList },
    { name: 'user', path: '/user/:id', component: UserRegisterEdit },
    { name: 'newUser', path: '/user', component: UserRegisterEdit },
    { name: 'providers', path: '/prestadores', component: ProvidersList },
    { name: 'provider', path: '/provider/:id', component: ProviderRegisterEdit },
    { name: 'newProvider', path: '/provider', component: ProviderRegisterEdit },
    { name: 'categories', path: '/categorias', component: CategoryList },
    { name: 'category', path: '/category/:id', component: CategoryRegisterEdit },
    { name: 'newCategory', path: '/categoria', component: CategoryRegisterEdit },
    { name: 'services', path: '/servicos', component: ServicesList },
    { name: 'service', path: '/service/:id', component: ServiceRegisterEdit },
]

export default new VueRouter({
    mode: 'history',
    routes
})