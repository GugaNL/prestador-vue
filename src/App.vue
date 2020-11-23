<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user.email}">
    <Header title="Prestador de serviços - Administração" :hideToggle="!user.email" :hideUserDropdown="!user.email" />
    <Menu v-if="user.email" />
    <Loading v-if="validatingToken" />
    <Content v-else />
    <Footer />
  </div>
</template>

<script>
import Content from "./components/template/Content"
import Header from "./components/template/Header"
import Footer from "./components/template/Footer"
import Menu from "./components/template/Menu"
import Loading from './components/template/Loading'
import authApi from './services/api/authApi'
import { userKey } from './config/constants/constants'

export default {
  name: "App",
  components: {
    Content,
    Header,
    Footer,
    Menu,
    Loading
  },
  data() {
    return {
      validatingToken: true
    }
  },
  methods: {
    async validateToken() {
      this.validatingToken = true
      const jsonStorage = localStorage.getItem(userKey)
      const userData = JSON.parse(jsonStorage)
      this.$store.commit('setUser', {})

      if (!userData) { // Se não encontrar usuario no storage então ja redireciona para tela de login sem executar o resto do codigo por conta do return
        this.validatingToken = false
        this.$router.push({ name: 'auth' })
        return
      }

      let responseValidateToken = await authApi.validateToken(userData.token)

      let responseJson = responseValidateToken.data

      if (responseJson.success) {
        this.$store.commit('setUser', userData)
        this.$store.commit('toggleMenu', true)
      } else {
        this.$toasted.global.defaultError({ msg: responseJson.message })
        localStorage.removeItem(userKey)
        this.$store.commit('setUser', {})
        this.$router.push({ name: 'auth' })
      }

      this.validatingToken = false
    }
  },
  computed: {
    isMenuVisible: {
      get() {
        return this.$store.getters.isMenuVisible
      },
      set() {
        return this.$store.commit("toggleMenu")
      },
    },
    user: {
      get() {
        return this.$store.getters.user
      }
    }
  },
  created() {
    this.validateToken()
  }
}
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; /* Serve para suavizar no momento que as fontes sao renderizadas */
  height: 100vh; /* Vai ter 100% do tamanho */
  display: grid;
  grid-template-rows: 60px 1fr 40px; /*Será 3 linhas: header com 60px, content com o tamanho que precisar (1 frame) e footer com 40px */
  grid-template-columns: 300px 1fr; /*Será coluna menu com 300px e o conteudo com o tamanho que precisar (1 frame) */
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#app.hide-menu { /*Qualquer elemento que tenha o id 'app' e tenha a classe hide-menu */
  grid-template-areas: 
  "header header"
  "content content"
  "footer footer"
  ;
}
</style>
