<template>
  <div class="provider">

    <b-breadcrumb>
      <b-breadcrumb-item to="/">
        <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true" class="bread-icon" />
        Principal
      </b-breadcrumb-item>
      <b-breadcrumb-item active>Lista de prestadores</b-breadcrumb-item>
    </b-breadcrumb>

    <h3>Lista de Prestadores</h3>
    <hr>
    <div class="provider-content">
      <loading :active.sync="loading" :can-cancel="false" is-full-page="true" color="#4169E1" />
      <b-form>
        <input id="provider-id" type="hidden" v-model="provider.id">
        <b-row>
          <b-col md="3" sm="9">
            <b-form-group label="Nome" label-for="provider-name"> <!--label-for é o id do input  -->
              <b-form-input id="provider-name" type="text" v-model="provider.first_name" placeholder="Nome do prestador" />
            </b-form-group>
            <b-form-group label="Sobrenome" label-for="provider-lastname"> <!--label-for é o id do input  -->
              <b-form-input id="provider-lastname" type="text" v-model="provider.last_name" placeholder="Sobrenome do prestador" />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group label="Email" label-for="provider-email"> <!--label-for é o id do input  -->
              <b-form-input id="provider-email" type="text" v-model="provider.email" placeholder="Email do prestador" />
            </b-form-group>
          </b-col>
            <b-col md="3" sm="9" class="col-search">
            <b-button variant="success" class="ml-5" @click="loadProviders">Pesquisar</b-button>
            <b-button variant="primary" class="ml-5" @click="clearSearch">Limpar</b-button>
          </b-col>
        </b-row>
      </b-form>

      <b-table hover striped :items="providers" :fields="fields" class="text-center">
        <template v-slot:cell(actions)="data">
          <b-button variant="warning" @click="showProvider(data.item)" class="mr-2">
            <i class="fa fa-pencil" />
          </b-button>
          <b-button variant="danger" @click="notifyDeleteProvider(data.item)">
            <i class="fa fa-trash" />
          </b-button>
        </template>
        <template v-slot:cell(status)="data">
          <b-form-select :options="optionsStatus" v-on:change="notifyChangeStatus(data.item, $event)" v-model="data.item.status" />
        </template>
      </b-table>

    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
    
  </div>
</template>

<script>
import providerApi from '../../services/api/providerApi'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: "provider",
    components: {
    Loading
  },
  data() {
    return {
      mode: "save",
      provider: {},
      providers: [],
      fields: [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'first_name', label: 'Nome', sortable: true },
        { key: 'last_name', label: 'Sobrenome', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'document', label: 'CPF', sortable: false },
        { key: 'phone', label: 'Telefone', sortable: false },
        { key: 'status', label: 'Status', sortable: false },
        { key: 'actions', label: 'Ações' }
      ],
      optionsStatus: [
        { value: 'a', text: 'Pendente' },
        { value: 'b', text: 'Aprovado' },
        { value: 'c', text: 'Rejeitado' },
    ],
    page: 1,
    limit: 0,
    count: 0,
    selectedStatus: '',
    loading: false
    }
  },
  methods: {
    async loadProviders() {
      //console.log('params: ', this.provider)
      try {
        this.loading = true
        let responseListProviders = await providerApi.listProviders(
          this.$store.getters.user.id, 
          this.$store.getters.user.token,
          this.provider.first_name ? this.provider.first_name : '',
          this.provider.last_name ? this.provider.last_name : '',
          this.provider.email ? this.provider.email : '',
          this.page
        )

        let responseJson = responseListProviders.data
        this.loading = false
        if (responseJson.success == true) {
          this.providers = responseJson.providers.data
          this.page = responseJson.providers.pagination.page
          this.limit = responseJson.providers.pagination.perPage
          this.count = responseJson.providers.pagination.total
          if (this.providers.length > 0) {
            this.providers.filter(el => {
              //console.log('el: ', el)
              el.status = this.convertSelectedStatus(el.status)
              el.currentStatus = el.status
            })
          }
        } else {
          this.$toasted.global.defaultError({ msg: 'Erro ao tentar listar os prestadores' })
        }
      } catch (error) {
        this.loading = false
        this.$toasted.global.defaultError({ msg: 'Falha na operação' })
      }
    },
    clearSearch() {
      this.provider.first_name = ''
      this.provider.last_name = ''
      this.provider.email = ''
      this.loadProviders()
    },
    showProvider(item) {
      //console.log('showprovider: ', item)
      this.$router.push(`/provider/${item.id}`)
    },
    notifyDeleteProvider(item){
      this.$confirm(`Tem certeza que deseja deletar o prestador ${item.first_name}?` ).then(() => {
        this.deleteProvider(item)
      })
    },
    async deleteProvider(item) {
      //console.log('delete provider: ', item)
        try {
          let responseDeleteProvider = await providerApi.deleteProvider(
            this.$store.getters.user.id, 
            this.$store.getters.user.token,
            item.id
          )

          let responseJson = responseDeleteProvider.data
          if (responseJson.success) {
            this.$toasted.global.defaultSuccess({ msg: 'Prestador deletado com sucesso' })
            this.loadProviders()
          } else {
            this.$toasted.global.defaultError({ msg: 'Erro ao tentar deletar o prestador' })
          }
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
    convertSelectedStatus(statusValue) {
      if (statusValue == 'pending') {
        return 'a'
      } else if (statusValue == 'approved') {
        return 'b'
      } else {
        return 'c'
      }
    },
    notifyChangeStatus(item, event) {
      //console.log('this.selectedStatus: ', this.selectedStatus)
      //console.log('item: ', item)
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
        /*this.$confirm(`Tem certeza que deseja mudar o status para ${newStatusBr}?`).then(() => {
          this.changeStatus(item, event, newStatus)
        })*/

        this.$confirm(
          `Tem certeza que deseja mudar o status do prestador para ${newStatusBr}?`, 
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
      //console.log('newStatus: ', newStatus)
      try {
        let responseChangeStatus = await providerApi.changeStatusProvider(
          this.$store.getters.user.id, 
          this.$store.getters.user.token,
          item.id,
          newStatus,
          'provider'
        )

        let responseJson = responseChangeStatus.data
        if (responseJson.success) {
          this.$toasted.global.defaultSuccess({ msg: responseJson.message })
          this.loadProviders()
        } else {
          this.$toasted.global.defaultError({ msg: responseJson.message })
        }
      } catch (error) {
        console.log(error)
        this.$toasted.global.defaultError({ msg: 'Falha na operação' })
      }
    },
  },
  watch: {
    page() {
      this.loadProviders()
    }
  },
  mounted() {
    this.loadProviders()
  },
}
</script>

<style>

.provider-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
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