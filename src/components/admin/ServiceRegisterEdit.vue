<template>
  <div class="service">
    <h3>Serviço</h3>
    <hr />

    <div class="service-content">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(saveService)">
          <b-row>
            <b-col md="4" sm="10">
              <validation-provider
                name="Nome"
                :rules="{ required: true }"
                v-slot="validationContext"
              >
                <b-form-group label="Nome" label-for="service-name">
                  <!--label-for é o id do input  -->
                  <b-form-input
                    id="service-name"
                    type="text"
                    v-model="service.name"
                    :state="getValidationState(validationContext)"
                    placeholder="Nome do serviço"
                  />
                  <b-form-invalid-feedback id="input-name-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="4" sm="10">
              <validation-provider
                name="Descrição"
                :rules="{ required: true }"
                v-slot="validationContext"
              >
                <b-form-group label="Descrição" label-for="service-description">
                  <b-form-input
                    id="service-description"
                    type="text"
                    v-model="service.description"
                    :state="getValidationState(validationContext)"
                    placeholder="Descrição do serviço"
                  />
                  <b-form-invalid-feedback id="input-description-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="4" sm="10">
              <validation-provider
                name="Valor"
                :rules="{ required: true, numeric: true }"
                v-slot="validationContext"
              >
                <b-form-group label="Valor" label-for="service-value">
                  <b-form-input
                    id="service-value"
                    type="text"
                    v-model="service.value"
                    :state="getValidationState(validationContext)"
                    placeholder="Valor do serviço"
                  />
                  <b-form-invalid-feedback id="input-value-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="4" sm="10">
              <b-form-group
                label="Data de início"
                label-for="service-initial_date"
              >
                <b-form-input
                  id="service-initial_date"
                  type="date"
                  v-model="initialDate"
                  required
                />
              </b-form-group>
            </b-col>
            <b-col md="4" sm="10">
              <b-form-group
                label="Data do fim"
                label-for="service-final_datetime"
              >
                <b-form-input
                  id="service-final_datetime"
                  type="date"
                  v-model="finalDate"
                  required
                />
              </b-form-group>
            </b-col>

            <b-col md="4" sm="10">
              <b-form-group label="Status" label-for="service-status">
                <b-form-select
                  :options="optionsStatus"
                  v-model="selectedStatus"
                />
              </b-form-group>
            </b-col>

            <b-col md="4" sm="10">
              <b-form-group
                label="Horário de início"
                label-for="service-inital_time"
              >
                <b-form-input
                  id="service-inital_time"
                  type="time"
                  v-model="initialTime"
                  required
                />
              </b-form-group>
            </b-col>

            <b-col md="4" sm="10">
              <b-form-group
                label="Horário de fim"
                label-for="service-final_time"
              >
                <b-form-input
                  id="service-final_time"
                  type="time"
                  v-model="finalTime"
                  required
                />
              </b-form-group>
            </b-col>
            <b-col md="4" sm="10">
              <validation-provider
                name="Categoria"
                :rules="{ required: true }"
                v-slot="validationContext"
              >
                <b-form-group label="Categoria" label-for="service-category">
                  <b-form-select
                    :options="optionsCategories"
                    v-model="selectedCategory"
                    value-field="id"
                    text-field="name"
                    :state="getValidationState(validationContext)"
                  />
                  <b-form-invalid-feedback id="input-category-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="4" sm="10">
            <b-form-group label="Cliente" label-for="service-user">
              <vue-typeahead-bootstrap
                class="input-user"
                :data="users"
                v-model="queryUser"
                :serializer="user => user.first_name"
                placeholder="Nome do cliente"
                @hit="selectedUser = $event"
              />
              <span v-if="errorEmptyUser" class="empty-user">O campo cliente é obrigatório</span>
            </b-form-group>
            </b-col>
            <b-col md="4" sm="10" v-if="provider">
              <b-form-group label="Prestador" label-for="service-provider">
                <b-form-input
                  id="service-provider"
                  type="text"
                  v-model="provider.first_name"
                  :readonly="editMode"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-button type="submit" variant="success">Salvar</b-button>
          <router-link to="/servicos">
            <b-button variant="primary" class="ml-5">Voltar</b-button>
          </router-link>
        </b-form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { baseURL } from "../../global"
import moment from "moment"

export default {
  data() {
    return {
      editMode: false,
      service: {},
      category: {},
      user: {},
      provider: {},
      optionsStatus: [
        { value: "a", text: "Pendente" },
        { value: "b", text: "Confirmado" },
        { value: "c", text: "Finalizado" },
        { value: "d", text: "Cancelado" },
      ],
      optionsCategories: [],
      selectedStatus: "",
      selectedCategory: "",
      initialDate: moment().format("YYYY-MM-DD"),
      finalDate: moment().format("YYYY-MM-DD"),
      initialTime: moment().format("HH:mm"),
      finalTime: moment().format("HH:mm"),
      queryUser: '',
      selectedUser: null,
      users: [],
      errorEmptyUser: false
    }
  },
  methods: {
    loadService() {
      const url = `${baseURL}/admin/show_service`
      axios.get(url, {
          params: {
            id: 22,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
            service_id: this.$route.params.id,
          },
        })
        .then((response) => {
          //console.log("response show_service: ", response.data)
          const responseJson = response.data
          if (responseJson.success == true) {
            this.service = responseJson.service
            this.category = responseJson.service.category
            this.user = responseJson.service.user
            this.provider = responseJson.service.provider
            this.initialDate = moment( responseJson.service.initial_date, "DD/MM/YYYY" ).format("YYYY-MM-DD")
            this.finalDate = moment( responseJson.service.final_date, "DD/MM/YYYY" ).format("YYYY-MM-DD")
            this.initialTime = moment( responseJson.service.initial_time, "HH:mm" ).format("HH:mm")
            this.finalTime = moment( responseJson.service.final_time, "HH:mm" ).format("HH:mm")
            this.selectedStatus = this.convertSelectedStatus( responseJson.service.status )
            this.selectedCategory = responseJson.service.category_id
          }
        })
    },
    loadCategories() {
      const url = `${baseURL}/admin/list_categories_names`
      axios.get(url, {
          params: {
            id: 22,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU"
          },
        })
        .then((response) => {
          const responseJsonCategory = response.data
          if (responseJsonCategory.success == true) {
            this.optionsCategories = responseJsonCategory.categories.data
          } else {
            console.log("Erro")
          }
        })
    },
    getClients(userName) {
      const url = `${baseURL}/admin/list_users`
      axios.get(url, {
        params: {
          id: 22,
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
          first_name: userName,
          //page: this.page
        },
      }).then(response => {
        const responseJson = response.data
        console.log('response list users: ', responseJson)
        if (responseJson.success == true) {
          this.users = responseJson.users.data
        } else {
          console.log('Erro')
        }
      })
    },
    saveService() {
      //console.log("parametros: ", this.service)

      if (this.selectedUser == null || this.selectedUser == '') {
        this.errorEmptyUser = true
      } else {
        this.errorEmptyUser = false
        let formattedInitialDate = moment(this.service.initial_date, "DD/MM/YYYY").format("YYYY-MM-DD") + " " + this.service.initial_time
        let formattedFinalDate = moment(this.service.final_date, "DD/MM/YYYY").format("YYYY-MM-DD") + " " + this.service.final_time

        if (this.editMode) {
          //Update
          const url = `${baseURL}/admin/update_service`
          axios.post(url, {
              id: 22,
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
              service_id: this.service.id,
              name: this.service.name,
              description: this.service.description,
              value: this.service.value,
              initial_datetime: formattedInitialDate,
              final_datetime: formattedFinalDate,
              status: "pending",
              category_id: this.service.category_id,
              user_id: this.service.user_id
            })
            .then((response) => {
              console.log("response update service: ", response.data)
              const responseJson = response.data
              if (responseJson.success == true) {
                this.$toasted.global.defaultSuccess({
                  msg: "Dados alterados com sucesso",
                })
              }
            })
        } else {
          console.log('Vai salvar: ', this.selectedUser.id)
          //New service
          const url = `${baseURL}/admin/save_service`
          axios.post(url, {
              id: 22,
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
              name: this.service.name,
              description: this.service.description,
              value: this.service.value,
              status: this.service.status,
              category_id: this.service.category_id,
              user_id: this.selectedUser.id,
            })
            .then((response) => {
              console.log("response register service: ", response.data)
              const responseJson = response.data
              if (responseJson.success == true) {
                this.$toasted.global.defaultSuccess({ msg: "Serviço criado com sucesso" })
              }
            })
        }
      }

  },
    convertSelectedStatus(statusValue) {
      if (statusValue == "pending") {
        return "a"
      } else if (statusValue == "confirmed") {
        return "b"
      } else if (statusValue == "finished") {
        return "c"
      } else {
        return "d"
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
  },
  watch: {
    queryUser(newQuery) {
      //console.log('queryUser: ', newQuery)
      if (this.errorEmptyUser == true && this.selectedUser !== null) {
        this.errorEmptyUser = false
      }
      this.getClients(newQuery)
    }
  },
  mounted() {
    this.loadCategories()
    if (this.$route.params.id) {
      this.editMode = true
      this.loadService()
    }
  },
}
</script>

<style>
.service-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
}

.empty-user {
  color: #dc3545;
  margin-top: 0.25rem;
  font-size: 80%;
}

</style>