<template>
  <div class="user">
    <h3>Detalhes do usuário</h3>
    <hr />
    <b-form>

      <div class="conteiner-photo">
        <b-avatar variant="primary" size="8rem" rounded button @click="onButtonClick" >
        </b-avatar>

        <label class="file-select">
          <div class="select-button">
            <span>Alterar</span>
          </div>
          <input type="file" @change="handleFileChange"/>
        </label>
      </div>



      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="Nome" label-for="user-name">
            <!--label-for é o id do input  -->
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.first_name"
              required
              placeholder="Nome do usuário"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Sobrenome" label-for="user-lastname">
            <b-form-input
              id="user-lastname"
              type="text"
              v-model="user.last_name"
              required
              placeholder="Sobrenome do usuário"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="Email" label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              required
              placeholder="Email do usuário"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Nascimento" label-for="user-birthdate">
            <b-form-input
              id="user-birthdate"
              type="text"
              v-mask="'##/##/####'"
              v-model="user.birth_date"
              required
              placeholder="Data de nascimento do usuário"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="CPF" label-for="user-document">
            <b-form-input
              id="user-document"
              type="text"
              v-mask="'###.###.###-##'"
              v-model="user.document"
              required
              placeholder="CPF do usuário"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Celular" label-for="user-phone">
            <b-form-input
              id="user-phone"
              type="text"
              v-mask="'(##)#####-####'"
              v-model="user.phone"
              required
              placeholder="Celular do usuário"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="CEP" label-for="user-zip-code">
            <b-form-input
              id="user-zip-code"
              type="text"
              v-mask="'#####-###'"
              v-model="user.zip_code"
              required
              placeholder="Somente números"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Rua" label-for="user-address-street">
            <b-form-input
              id="user-address-street"
              type="text"
              v-model="user.address_street"
              required
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="Número" label-for="user-address-number">
            <b-form-input
              id="user-address-number"
              type="text"
              v-model="user.address_number"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Bairro" label-for="user-address-neighborhood">
            <b-form-input
              id="user-address-neighborhood"
              type="text"
              v-model="user.address_neighborhood"
              required
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="Complemento" label-for="user-address-complement">
            <b-form-input
              id="user-address-complement"
              type="text"
              v-model="user.address_complement"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Referência" label-for="user-address-reference">
            <b-form-input
              id="user-address-reference"
              type="text"
              v-model="user.address_reference"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="Cidade" label-for="user-address-city">
            <b-form-input
              id="user-address-city"
              type="text"
              v-model="user.address_city"
              required
            />
          </b-form-group>
        </b-col>

        <b-col md="4" sm="10">
          <b-form-group label="Estado" label-for="user-address-state">
            <b-form-select v-model="user.address_state" :options="listStates">
              <option :value="user.address_state">{{ listStates.text }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-show="!editMode">
        <b-col md="4" sm="10">
          <b-form-group label="Senha" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Confirmar senha" label-for="user-password_confirmation">
            <b-form-input
              id="user-password_confirmation"
              type="password"
              v-model="user.password_confirmation"
              required
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-button variant="success" @click="saveUser">Salvar</b-button>
      <router-link to="/users">
        <b-button variant="primary" class="ml-5">Voltar</b-button>
      </router-link>
    </b-form>
  </div>
</template>

<script>
import axios from "axios"
import { baseURL } from "../../global"
import { stateList  } from '../../config/constants/stateList'
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  data() {
    return {
      user: {},
      editMode: false,
      listStates: []
    }
  },
  methods: {
    loadUser() {
      //console.log("id params: ", this.$route.params.id)
      const url = `${baseURL}/admin/show_user`
      axios
        .get(url, {
          params: {
            id: 22,
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
            user_id: this.$route.params.id,
          },
        })
        .then((response) => {
          console.log("response show_user: ", response)
          const responseJson = response.data
          if (responseJson.success == true) {
            this.user = responseJson.user
          }
        })
    },
    saveUser() {
      console.log('parametros api user: ', this.user)

      if (this.editMode) { //Update
        const url = `${baseURL}/admin/update_user`
        axios.post(url, {
        id: 22,
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
        user_id: this.user.id,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        //birth_date: this.user.birth_date,
        //gender: this.user.gender,
        phone: this.user.phone,
        zip_code: this.user.zip_code,
        address_street: this.user.address_street,
        address_number: this.user.address_number,
        address_neighborhood: this.user.address_neighborhood,
        address_complement: this.user.address_complement,
        address_reference: this.user.address_reference,
        address_city: this.user.address_city,
        address_state: this.user.address_state       
        }).then(response => {
          console.log('response update user: ', response.data)
          const responseJson = response.data
          if (responseJson.success == true) {
           this.$toasted.global.defaultSuccess({ msg: 'Dados alterados com sucesso' })
          }
        })
      } else { //Register new
        const url = `${baseURL}/admin/save_user`
        axios.post(url, {
        id: 22,
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        //birth_date: this.user.birth_date,
        //gender: this.user.gender,
        phone: this.user.phone,
        zip_code: this.user.zip_code,
        address_street: this.user.address_street,
        address_number: this.user.address_number,
        address_neighborhood: this.user.address_neighborhood,
        address_complement: this.user.address_complement,
        address_reference: this.user.address_reference,
        address_city: this.user.address_city,
        address_state: this.user.address_state, 
        password: this.user.password     
        }).then(response => {
          console.log('response register user: ', response.data)
          const responseJson = response.data
          if (responseJson.success == true) {
           this.$toasted.global.defaultSuccess({ msg: 'Usuário criado com sucesso' })
          }
        })
      }
    },
    onButtonClick() {
      console.log("changePhoto!")
    },
    handleFileChange() {

    }
  },
  mounted() {
    //console.log('props editMode: ', this.$route)
    this.listStates = stateList
    if (this.$route.params.id) {
      this.editMode = true
      this.loadUser()
    }
  },
}
</script>

<style>

.conteiner-photo {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.file-select > .select-button {
  padding: 1rem;
  color: white;
  background-color: #2EA169;
  border-radius: .3rem;
  text-align: center;
  font-weight: bold;
}

.file-select > input[type="file"] {
  display: none;
}


</style>