<template>
  <div class="home">
      <PageTitle icon="fa fa-home" title="Painel Administrativo" subTitle="Informações gerais" />
      <div class="stats">
        <Stat title="Categorias" route="/categorias" :value="stat.totalCategories" icon="fa fa-folder" color="#d54d50" />
        <Stat title="Serviços" route="/servicos" :value="stat.totalServices" icon="fa fa-file" color="#3bc480" />
        <Stat title="Usuários" route="/usuarios" :value="stat.totalUsers" icon="fa fa-user" color="#3282cd" />
        <Stat title="Prestadores" route="/prestadores" :value="stat.totalProviders" icon="fa fa-user" color="#3282cd" />
      </div>
  </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import homeApi from '../../services/api/homeApi'

export default {
    name: 'Home',
    components: { PageTitle, Stat },
    data() { //data no contexto de component é uma função que retorna um objeto
      return {
        stat: {}
      }
    },
    methods: {
      async getStats() {
        //console.log('store no getStats: ', this.$store.getters.user)
        try {
          let responseListStats = await homeApi.listStats(this.$store.getters.user.id, this.$store.getters.user.token)

          let responseJson = responseListStats.data
          if (responseJson.success) {
            this.stat = responseJson.totalValues
          } else {
            this.$toasted.global.defaultError({ msg: 'Erro ao tentar listar as quantidades' })
          }
        } catch (error) {
          this.$toasted.global.defaultError({ msg: 'Falha ao tentar listar as quantidades' })
        }
      }
    },
    mounted() { //lifecicle chamado ao montar a tela
      this.getStats()
    }
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap; /*Quebra a linha se houver necessidade */
    }
</style>