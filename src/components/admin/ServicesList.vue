<template>
  <div class="service">
    <b-breadcrumb>
      <b-breadcrumb-item to="/">
        <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true" class="bread-icon" />
        Principal
      </b-breadcrumb-item>
      <b-breadcrumb-item active>Lista de serviços</b-breadcrumb-item>
    </b-breadcrumb>
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
        <b-button variant="danger" @click="notifyDelete(data.item)">
          <i class="fa fa-trash" />
        </b-button>
      </template>

    <template v-slot:cell(status)="data">
      <b-form-select :options="optionsStatus" v-on:change="notifyChangeStatus(data.item, $event)" v-model="data.item.status" />
    </template>

    <template v-slot:cell(name)="data">
      <b>{{ data.item.name }}</b>
    </template>

    <template v-slot:cell(initial_date)="data">
      <span v-if="data.item.initial_date != 'Invalid date'" class="initial-date">{{ data.item.initial_date }} às {{ data.item.initial_time }}</span>
    </template>

    <template v-slot:cell(final_date)="data">
      <span v-if="data.item.final_date != 'Invalid date'" class="final-date">{{ data.item.final_date }} às {{ data.item.final_time }}</span>
    </template>

    </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>

  </div>
</template>

<script>
import serviceApi from '../../services/api/serviceApi'

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
    async loadServices() {
      try {
        let responseListServices = await serviceApi.listServices(
          this.$store.getters.user.id, 
          this.$store.getters.user.token,
          this.service.name ? this.service.name : '',
          this.page
        )

        let responseJson = responseListServices.data

        if (responseJson.success == true) {
          this.services = responseJson.services.data
          this.page = responseJson.services.pagination.page
          this.limit = responseJson.services.pagination.perPage
          this.count = responseJson.services.pagination.total
          if (this.services.length > 0) {
            this.services.filter(el => {
              el.status = this.convertSelectedStatus(el.status)
              el.currentStatus = el.status
            })
          }
        } else {
          this.$toasted.global.defaultError({ msg: responseJson.message })
        }
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
    notifyChangeStatus(item, event) {
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
        this.$confirm(
          `Tem certeza que deseja mudar o status do serviço para ${newStatusBr}?`, 
          'Aviso', 
          'warning', 
          { confirmButtonText: 'Confirmar', cancelButtonText: 'Cancelar' })
        .then(() => {
          this.changeStatus(item, event, newStatus)
        }).catch(() => {
          item.status = item.currentStatus
        })
      }
      
    },
    async changeStatus(item, event, newStatus) {
      try {
        let responseChangeStatusService = await serviceApi.changeStatusService(
          this.$store.getters.user.id, 
          this.$store.getters.user.token,
          item.id,
          newStatus
        )

      let responseJson = responseChangeStatusService.data
      if (responseJson.success) {
        this.$toasted.global.defaultSuccess({ msg: responseJson.message })
        this.loadServices()
      } else {
        this.$toasted.global.defaultError({ msg: responseJson.message })
      }

      } catch (error) {
        this.$toasted.global.defaultError({ msg: 'Falha na operação' })
      }
      
    },
    clearSearch() {
      this.service.name = ''
      this.loadServices()
    },
    showService(item) {
      this.$router.push(`/service/${item.id}`)
    },
    notifyDelete(item) {
      this.$confirm(`Tem certeza que deseja deletar o serviço ${item.name}?` ).then(() => {
        this.deleteService(item)
      })
    },
    async deleteService(item) {
      try {
        let responseDeleteService = await serviceApi.deleteService(
          this.$store.getters.user.id, 
          this.$store.getters.user.token,
          item.id
        )

        const responseJson = responseDeleteService.data
        if (responseJson.success == true) {
          this.$toasted.global.defaultSuccess({ msg: 'Serviço deletado com sucesso' })
          this.loadServices()
        } else {
          this.$toasted.global.defaultError({ msg: responseJson.message })
        }
      } catch (error) {
        this.$toasted.global.defaultError({ msg: 'Falha na operação' })
      }

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

.bread-icon {
  margin-right: 5px;
}

.breadcrumb {
  background-color: transparent !important;
}

.breadcrumb-item > a:hover {
  text-decoration: none;
}
</style>