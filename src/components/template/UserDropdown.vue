<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{ user.first_name }} {{ user.last_name }}</span>
      <!-- classe bootstrap para só colocar o nome do usuário se couber na tela -->
      <div class="user-dropdown-img">
        <Gravatar :email="user.email" alt="User" />
        <!--Coloca-se ':' quando quer que interprete a propriedade dentro das aspas -->
      </div>
      <i class="fa fa-angle-down" />
    </div>
    <div class="user-dropdown-content">
      <router-link to="/admin">
        <i class="fa fa-cogs" />Configurações
      </router-link>
      <router-link to="/">
        <a @click.prevent="notifyLogout"><i class="fa fa-sign-out" />Sair</a> 
      </router-link>
    </div>
  </div>
</template>

<script>
import Gravatar from 'vue-gravatar'
import authApi from '../../services/api/authApi'
import { userKey } from '../../config/constants/constants'

export default {
  components: { Gravatar },
  computed: {
    user: {
      get() {
        return this.$store.getters.user
      },
    },
  },
  methods: {
    notifyLogout() {
      this.$confirm(`Deseja se deslogar do sistema ${this.user.first_name}?` ).then(() => {
        this.logout()
      })
    },
    async logout() {
      try {
        let responseLogout = await authApi.logout(this.$store.getters.user.id, this.$store.getters.user.token)

        let responseJson = responseLogout.data
        if (responseJson.success) {
          localStorage.removeItem(userKey)
          this.$store.commit('setUser', {})
          this.$toasted.global.defaultSuccess({ msg: 'Deslogado do sistema' })
          this.$router.push({ name: 'auth' })
        } else {
          this.$toasted.global.defaultError({ msg: responseJson.message })
        }
      } catch (error) {
        this.$toasted.global.defaultError({ msg: 'Falha na operação' })
      }

    }
  }
}
</script>

<style>
.user-dropdown {
  height: 100%;
  position: relative;
}

.user-button {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 100;
  height: 100%;
  padding: 0px 20px; /*Vertical horizontal */
}

.user-dropdown:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.user-dropdown-img {
  margin: 0px 10px; /*Vertical horizontal */
}

.user-dropdown-img > img {
  max-height: 37px;
  border-radius: 5px;
}

.user-dropdown-content {
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 180px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1; /* Ter preferencia de aparecer na frente  */
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.user-dropdown:hover .user-dropdown-content {
  /* Significa que quando essa pseudoclasse estiver ativa (mouse em cima do componente) então aplica a nova regra no content */
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content > a {
  text-decoration: none;
  color: #2e2e2e;
  padding: 10px;
}

.user-dropdown-content > a:hover {
  text-decoration: none;
  color: #2e2e2e;
  background-color: #ededed;
}
</style>