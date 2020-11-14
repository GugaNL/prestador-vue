<template>
  <div class="home">
      <PageTitle icon="fa fa-home" title="Home" subTitle="Informações gerais" />
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
import axios from 'axios'
import { baseURL } from '../../global'

export default {
    name: 'Home',
    components: { PageTitle, Stat },
    data() { //data no contexto de component é uma função que retorna um objeto
      return {
        stat: {}
      }
    },
    methods: {
      getStats() {
        axios.get(`${baseURL}/admin/list_stats`, 
        { params: { 
          id: 21, 
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIxLCJpYXQiOjE2MDM3OTk2OTh9.BMNO9BwUtn4prlopbmAlzUEi3EqZGvPLzh2S3N7zJ2M"
           } }).then(response => {
          //console.log('response stat: ', response)
          this.stat = response.data.totalValues
        })
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