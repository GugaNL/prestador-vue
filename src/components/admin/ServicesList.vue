<template>
  <div class="service">
    <h3>Lista de serviços</h3>
    <hr>
    <div class="service-content">
    <b-form>
      <input id="service-id" type="hidden" v-model="service.id">
      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="Pesquisa" label-for="service-name"> <!--label-for é o id do input  -->
            <b-form-input id="service-name" type="text" v-model="service.name" placeholder="Nome do serviço" />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10" class="col-search">
          <b-button variant="success" class="ml-5" @click="loadServices">Pesquisar</b-button>
          <b-button variant="primary" class="ml-5" @click="clearSearch">Limpar</b-button>
        </b-col>
      </b-row>
    </b-form>

    <b-table hover striped :items="services" :fields="fields" class="text-center">
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="showService(data.item)" class="mr-2">
          <i class="fa fa-pencil" />
        </b-button>
        <b-button variant="danger" @click="deleteService(data.item)">
          <i class="fa fa-trash" />
        </b-button>
      </template>

    <template v-slot:cell(status)="data">
        <b-form-select :options="optionsStatus" v-on:change="changeStatus(data.item, $event)" >
            <b-form-select-option :value="data.status" >{{ convertStatus(data.item.status) }}</b-form-select-option>
        </b-form-select>
    </template>

    </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>

  </div>
</template>

<script>
import axios from "axios"
import { baseURL } from "../../global"

export default {
  data() {
    return {
      mode: "save",
      service: {},
      services: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Serviço", sortable: true },
        { key: "description", label: "Descrição", sortable: false },
        { key: "value", label: "Valor", sortable: false },
        { key: "initial_datetime", label: "Início", sortable: false },
        { key: "final_datetime", label: "Fim", sortable: false },
        { key: "status", label: "Status", sortable: false },
        { key: "category.name", label: "Categoria", sortable: false },
        { key: "user.first_name", label: "Usuário", sortable: false },
        { key: "provider.first_name", label: "Prestador", sortable: false },
      ],
      optionsStatus: [
        { value: 'a', text: 'Pendente' },
        { value: 'b', text: 'Aprovado' },
        { value: 'c', text: 'Rejeitado' },
      ],
      page: 1,
      limit: 0,
      count: 0,
    }
  },
  methods: {
    loadServices() {
      const url = `${baseURL}/admin/list_services`
      try {
        axios.get(url, {
          params: {
            id: 22,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
            page: this.page
          },
        }).then(response => {
            const responseJson = response.data
            //console.log('response list services: ', responseJson)
            if (responseJson.success == true) {
                this.services = responseJson.services.data
                this.page = responseJson.services.pagination.page
                this.limit = responseJson.services.pagination.perPage
                this.count = responseJson.services.pagination.total
            } else {
                this.$toasted.global.defaultError({ msg: responseJson.message })
             }
        })
      } catch (error) {
        this.$toasted.global.defaultError({ msg: 'Falha na operação' })
      }
    },
    convertStatus(statusName) {
      if (statusName === 'pending') {
        return 'Pendente'
      } else if (statusName === 'approved') {
        return 'Aprovado'
      } else {
        return 'Rejeitado'
      }
    },
    changeStatus(item, event) {
        //console.log('this.selectedStatus: ', this.selectedStatus)
        let newStatus, newStatusBr = ''

        if (event == 'a') {
        newStatus = 'pending'
        newStatusBr = 'pendente'
      } else if (event == 'b') {
        newStatus = 'approved'
        newStatusBr = 'aprovado'
      } else {
        newStatus = 'rejected'
        newStatusBr = 'rejeitado'
      }

      if (newStatus !== item.status) {
          this.$confirm(`Tem certeza que deseja mudar o status para ${newStatusBr}?`).then(() => {
        
        const url = `${baseURL}/admin/update_service`
        axios.post(url, {
          id: 22,
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
          person_id: item.id,
          status: newStatus,
        }).then(response => {
          let responseJson = response.data
          console.log('response update status: ', responseJson)
          if (responseJson.success) {
            this.$toasted.global.defaultSuccess({ msg: responseJson.message })
            this.loadUsers()
          } else {
            this.$toasted.global.defaultError({ msg: responseJson.message })
          }
        })
        }).catch(() => {
          
          //this.loadUsers()
        })
      }
    },
    clearSearch() {
      this.service.name = ''
      this.loadServices()
    },
    showService(item) {
      this.$router.push(`/service/${item.id}`)
    },
    deleteService(item) {
      //console.log('delete service: ', item)
      this.$confirm(`Tem certeza que deseja deletar o serviço ${item.name}?` ).then(() => {
        const url = `${baseURL}/admin/delete_service`
        axios.post(url, {
          id: 22,
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
          user_id: item.id
        }).then(response => {
          console.log('response delete service: ', response)
          const responseJson = response.data
          if (responseJson.success == true) {
            this.$toasted.global.defaultSuccess({ msg: 'Serviço deletado com sucesso' })
            this.loadUsers()
          } else {
            this.$toasted.global.defaultError({ msg: 'Falha na operação' })
          }
        })
      })
    },
  },
  mounted() {
      this.loadServices()
  },
  watch: {
    page() {
      this.loadServices()
    }
  }
}
</script>

<style>
</style>