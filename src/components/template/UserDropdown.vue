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
        <i class="fa fa-sign-out" />Sair 
      </router-link>
    </div>
  </div>
</template>

<script>
import Gravatar from "vue-gravatar"

export default {
  components: { Gravatar },
  computed: {
    user: {
      get() {
        return this.$store.getters.user
      },
    },
  },
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