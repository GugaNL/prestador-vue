<template>
  <div class="user">
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
        <b-button variant="danger" @click="deleteUser(data.item)">
          <i class="fa fa-trash" />
        </b-button>
      </template>

      <template v-slot:cell(status)="data">
        <b-form-select :options="optionsStatus" v-on:change="changeStatus(data.item, $event)" :key="selectedCountryId" >
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
          { key: 'birth_date', label: 'Nascimento', sortable: false },
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
    loadUsers() {
      //console.log('params: ', this.user)
      const url = `${baseURL}/admin/list_users`
      axios.get(url, {
        params: {
          id: 22,
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
          first_name: this.user.first_name ? this.user.first_name : '',
          last_name: this.user.last_name ? this.user.last_name : '',
          email: this.user.email ? this.user.email : '',
          page: this.page
        },
      }).then(response => {
        const responseJson = response.data
        //console.log('response list users: ', responseJson)
        if (responseJson.success == true) {
          this.users = responseJson.users.data
          this.page = responseJson.users.pagination.page
          this.limit = responseJson.users.pagination.perPage
          this.count = responseJson.users.pagination.total
        } else {
          console.log('Erro')
        }
      })
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
    deleteUser(item) {
      //console.log('delete user: ', item)
      this.$confirm(`Tem certeza que deseja deletar o usuário ${item.first_name}?` ).then(() => {
        const url = `${baseURL}/admin/delete_user`
        axios.post(url, {
          id: 22,
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
          user_id: item.id
        }).then(response => {
          console.log('response delete user: ', response)
          const responseJson = response.data
          if (responseJson.success == true) {
            this.$toasted.global.defaultSuccess({ msg: 'Usuário deletado com sucesso' })
            this.loadUsers()
          } else {
            this.$toasted.global.defaultError({ msg: 'Falha na operação' })
          }
        })
      })
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
      console.log('this.selectedStatus: ', this.selectedStatus)
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

        this.$confirm(`Tem certeza que deseja mudar o status para ${newStatusBr}?`).then(() => {
        
        const url = `${baseURL}/admin/change_status_user`
        axios.post(url, {
          id: 22,
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
          person_id: item.id,
          status: newStatus,
          type: 'user'
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




</style>