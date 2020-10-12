<template>
  <aside class="menu" v-show="isMenuVisible">
      <Tree :data="treeData" ref="tree" />
  </aside>
</template>

<script>
import Tree from 'liquor-tree'

export default {
    components: { Tree },
    name: 'Menu',
    data() {
        return {
            treeData: [
                { text: 'Usuário', children: [
                    { text: 'Lista de usuários', data: { screen: 'users' } },
                    { text: 'Novo usuário', data: { screen: 'newUser' } },
                ] },
                { text: 'Prestador', children: [
                    { text: 'Lista de prestadores' },
                    { text: 'Novo prestador' },
                ] },
                { text: 'Categoria', children: [
                    { text: 'Lista de categorias', data: { screen: 'categories' } },
                    { text: 'Nova categoria', data: { screen: 'newCategory' } },
                ] },
                { text: 'Serviço', children: [
                    { text: 'Lista de serviços', data: { screen: 'services' } },
                    { text: 'Novo serviço', data: { screen: 'service' } },
                ] }
            ]
        }
    },
    computed: {
        isMenuVisible: {
            get() {
                return this.$store.state.menu.isMenuVisible
            },
            set() {
                return this.$store.commit('toggleMenu')
            }
        }
    },
    methods: {
        onNodeSelect(node) {
            console.log('onNodeSelect: ', node)
            if (node.data.screen) {
                this.$router.push({ name: node.data.screen })
            }
        }
    },
    mounted() {
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu a,
    .menu a:hover { /*Significa aplicar o estilo tanto para o link normal (a) como no hover */
        color: #fff;
        text-decoration: none;
    }

    .tree-node > .tree-content > .tree-anchor {
        color: #D3D3D3;
        font-size: 1.3rem;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2) !important;
    }

    .menu .tree-node .tree-content {
        margin-bottom: 10px;
    }

    .tree-arrow.has-child {
        filter: brightness(2)
    }
</style>