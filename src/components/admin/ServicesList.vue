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
      <b-form-select :options="optionsStatus" v-on:change="changeStatus(data.item, $event)" v-model="data.item.status" />
    </template>

    <template v-slot:cell(name)="data">
      <b>{{ data.item.name }}</b>
    </template>

    <template v-slot:cell(initial_date)="data">
      <span class="initial-date">{{ data.item.initial_date }} às {{ data.item.initial_time }}</span>
    </template>

    <template v-slot:cell(final_date)="data">
      <span class="final-date">{{ data.item.final_date }} às {{ data.item.final_time }}</span>
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
        { key: "initial_date", label: "Início", sortable: false },
        { key: "final_date", label: "Fim", sortable: false },
        { key: "status", label: "Status", sortable: false },
        { key: "category.name", label: "Categoria", sortable: false },
        { key: "user.first_name", label: "Usuário", sortable: false },
        { key: "provider.first_name", label: "Prestador", sortable: false },
        { key: 'actions', label: 'Ações' }
      ],
      optionsStatus: [
        { value: 'a', text: 'Pendente' },
        { value: 'b', text: 'Confirmado' },
        { value: 'c', text: 'Finalizado' },
        { value: 'd', text: 'Cancelado' },
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
                if (this.services.length > 0) {
                  this.services.filter(el => {
                    el.status = this.convertSelectedStatus(el.status)
                  })
                }
                //console.log('this.services apos o filter: ', this.services)
            } else {
                this.$toasted.global.defaultError({ msg: responseJson.message })
             }
        })
      } catch (error) {
        this.$toasted.global.defaultError({ msg: 'Falha na operação' })
      }
    },
    convertSelectedStatus(statusValue) {
        if (statusValue == 'pending') {
            return 'a'
        } else if (statusValue == 'confirmed') {
            return 'b'
        } else if (statusValue == 'finished') {
            return 'c'
        } else {
            return 'd'
        }
    },
    changeStatus(item, event) {
        //console.log('this.selectedStatus: ', this.selectedStatus)
        let newStatus, newStatusBr = ''

        if (event == 'a') {
        newStatus = 'pending'
        newStatusBr = 'pendente'
      } else if (event == 'b') {
        newStatus = 'confirmed'
        newStatusBr = 'confirmado'
      } else if(event == 'c') {
        newStatus = 'finished'
        newStatusBr = 'finalizado'
      } else {
        newStatus = 'cancelled'
        newStatusBr = 'cancelado'
      }

      if (newStatus !== item.status) {
        this.$confirm(`Tem certeza que deseja mudar o status para ${newStatusBr}?`).then(() => {
        
        const url = `${baseURL}/admin/change_status_service`
        axios.post(url, {
          id: 22,
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
          service_id: item.id,
          status: newStatus,
        }).then(response => {
          let responseJson = response.data
          console.log('response change status: ', responseJson)
          if (responseJson.success) {
            this.$toasted.global.defaultSuccess({ msg: responseJson.message })
            this.loadServices()
          } else {
            this.$toasted.global.defaultError({ msg: responseJson.message })
          }
        })
        }).catch(() => {
          
          //this.loadServices()
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
          service_id: item.id
        }).then(response => {
          console.log('response delete service: ', response)
          const responseJson = response.data
          if (responseJson.success == true) {
            this.$toasted.global.defaultSuccess({ msg: 'Serviço deletado com sucesso' })
            this.loadServices()
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
.initial-date {
  color: darkgreen;
}
.final-date {
  color: blue;
}
</style>