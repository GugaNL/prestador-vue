<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible}">
    <Header title="Prestador de serviços - Administração" :hideToggle="false" :hideUserDropdown="false" />
    <Menu />
    <Content />
    <Footer />
  </div>
</template>

<script>
import Content from "./components/template/Content"
import Header from "./components/template/Header"
import Footer from "./components/template/Footer"
import Menu from "./components/template/Menu"

export default {
  name: "App",
  components: {
    Content,
    Header,
    Footer,
    Menu,
  },
  computed: {
    isMenuVisible: {
      get() {
        return this.$store.state.menu.isMenuVisible
      },
      set() {
        return this.$store.commit("toggleMenu")
      },
    },
  },
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
