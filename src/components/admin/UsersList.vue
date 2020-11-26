<template>
  <div class="user">
    <b-breadcrumb>
      <b-breadcrumb-item to="/">
        <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true" class="bread-icon" />
        Principal
      </b-breadcrumb-item>
      <b-breadcrumb-item active>Lista de usuários</b-breadcrumb-item>
    </b-breadcrumb>
    <h3>Lista de Usuários</h3>
    <hr>
    <div class="user-content">
    <b-form>
      <input id="user-id" type="hidden" v-model="user.id">
      <b-row>
        <b-col md="3" sm="9">
          <b-form-group label="Nome" label-for="user-name"> <!--label-for é o id do input  -->
            <b-form-input id="user-name" type="text" v-model="user.first_name" placeholder="Nome do usuário" />
          </b-form-group>
          <b-form-group label="Sobrenome" label-for="user-lastname"> <!--label-for é o id do input  -->
            <b-form-input id="user-lastname" type="text" v-model="user.last_name" placeholder="Sobrenome do usuário" />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group label="Email" label-for="user-email"> <!--label-for é o id do input  -->
            <b-form-input id="user-email" type="text" v-model="user.email" placeholder="Email do usuário" />
          </b-form-group>
        </b-col>
          <b-col md="3" sm="9" class="col-search">
          <b-button variant="success" class="ml-5" @click="loadUsers">Pesquisar</b-button>
          <b-button variant="primary" class="ml-5" @click="clearSearch">Limpar</b-button>
        </b-col>
      </b-row>
    </b-form>

    <b-table hover striped :items="users" :fields="fields" class="text-center">
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="showUser(data.item)" class="mr-2">
          <i class="fa fa-pencil" />
        </b-button>
        <b-button variant="danger" @click="notifyDeleteUser(data.item)">
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
import userApi from '../../services/api/userApi'

export default {
  name: "User",
  data() {
    return {
      mode: "save",
      user: {},
      users: [],
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
    selectedStatus: ''
    }
  },
  methods: {
    async loadUsers() {
      //console.log('params: ', this.user)
      try {
        let responseListUsers = await userApi.listUsers(
          this.$store.getters.user.id, 
          this.$store.getters.user.token,
          this.user.first_name ? this.user.first_name : '',
          this.user.last_name ? this.user.last_name : '',
          this.user.email ? this.user.email : '',
          this.page
        )

        let responseJson = responseListUsers.data
        console.log('response list users: ', responseJson)
        if (responseJson.success) {
          this.users = responseJson.users.data
          this.page = responseJson.users.pagination.page
          this.limit = responseJson.users.pagination.perPage
          this.count = responseJson.users.pagination.total
          if (this.users.length > 0) {
            this.users.filter(el => {
              //console.log('el: ', el)
              el.status = this.convertSelectedStatus(el.status)
              el.currentStatus = el.status
            })
          }
        } else {
          this.$toasted.global.defaultError({ msg: 'Erro ao tentar listar os usuários' })
        }
      } catch (error) {
        this.$toasted.global.defaultError({ msg: 'Falha na operação' })
      }
    },
    clearSearch() {
      this.user.first_name = ''
      this.user.last_name = ''
      this.user.email = ''
      this.loadUsers()
    },
    showUser(item) {
      //console.log('showUser: ', item)
      this.$router.push(`/user/${item.id}`)
    },
    notifyDeleteUser(item) {
      this.$confirm(`Tem certeza que deseja deletar o usuário ${item.first_name}?` ).then(() => {
        this.deleteUser(item)
      })
    },
    async deleteUser(item) {
      //console.log('delete user: ', item)
        try {
          let responseDeleteUser = await userApi.deleteUser(
            this.$store.getters.user.id, 
            this.$store.getters.user.token,
            item.id
          )

          let responseJson = responseDeleteUser.data
          if (responseJson.success) {
            this.$toasted.global.defaultSuccess({ msg: 'Usuário deletado com sucesso' })
            this.loadUsers()
          } else {
            this.$toasted.global.defaultError({ msg: 'Erro ao tentar deletar o usuário' })
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

      //console.log('newStatus: ', newStatus)
      if (newStatus !== item.status) {
        this.$confirm(
          `Tem certeza que deseja mudar o status do usuário para ${newStatusBr}?`, 
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
        let responseChangeStatus = await userApi.changeStatusUser(
          this.$store.getters.user.id, 
          this.$store.getters.user.token,
          item.id,
          newStatus,
          'user'
        )

        let responseJson = responseChangeStatus.data
        if (responseJson.success) {
          this.$toasted.global.defaultSuccess({ msg: responseJson.message })
          this.loadUsers()
        } else {
          this.$toasted.global.defaultError({ msg: responseJson.message })
        }
      } catch (error) {
        this.$toasted.global.defaultError({ msg: 'Falha na operação' })
      }
    },
  },
  watch: {
    page() {
      this.loadUsers()
    }
  },
  mounted() {
    this.loadUsers()
  },
}
</script>

<style>

.user-content {
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