<template>
  <header class="header">
      <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
          <i class="fa fa-lg" :class="icon"></i>
      </a>
      <h1 class="title">
          <router-link to="/">{{ title }}</router-link>
      </h1>
      <UserDropdown v-if="!hideUserDropdown" />
  </header>
</template>

<script>
import UserDropdown from './UserDropdown'

export default {
    components: { UserDropdown },
    name: 'Header',
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean
    },
    computed: {
        icon() {
            return this.$store.getters.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
        }
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #1e409a, #49a7c1);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a {
        color: #fff;
        text-decoration: none; /* Quando colocar o mouse por cima não vai ficar com 'cara' de link */
    }

    .title a:hover {
        color: #fff;
        text-decoration: none; /* Quando colocar o mouse por cima não vai ficar com 'cara' de link */
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: start;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>