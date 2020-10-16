<template>
  <div class="provider">
    <h3>Detalhes do prestador</h3>
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
          <b-form-group label="Nome" label-for="provider-name">
            <!--label-for é o id do input  -->
            <b-form-input
              id="provider-name"
              type="text"
              v-model="provider.first_name"
              required
              placeholder="Nome do prestador"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Sobrenome" label-for="provider-lastname">
            <b-form-input
              id="provider-lastname"
              type="text"
              v-model="provider.last_name"
              required
              placeholder="Sobrenome do prestador"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="Email" label-for="provider-email">
            <b-form-input
              id="provider-email"
              type="text"
              v-model="provider.email"
              required
              placeholder="Email do prestador"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Nascimento" label-for="provider-birthdate">
            <b-form-input
              id="provider-birthdate"
              type="text"
              v-mask="'##/##/####'"
              v-model="provider.birth_date"
              required
              placeholder="Data de nascimento do prestador"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="CPF" label-for="provider-document">
            <b-form-input
              id="provider-document"
              type="text"
              v-mask="'###.###.###-##'"
              v-model="provider.document"
              required
              placeholder="CPF do prestador"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Celular" label-for="provider-phone">
            <b-form-input
              id="provider-phone"
              type="text"
              v-mask="'(##)#####-####'"
              v-model="provider.phone"
              required
              placeholder="Celular do prestador"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="CEP" label-for="provider-zip-code">
            <b-form-input
              id="provider-zip-code"
              type="text"
              v-mask="'#####-###'"
              v-model="provider.zip_code"
              required
              placeholder="Somente números"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Rua" label-for="provider-address-street">
            <b-form-input
              id="provider-address-street"
              type="text"
              v-model="provider.address_street"
              required
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="Número" label-for="provider-address-number">
            <b-form-input
              id="provider-address-number"
              type="text"
              v-model="provider.address_number"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Bairro" label-for="provider-address-neighborhood">
            <b-form-input
              id="provider-address-neighborhood"
              type="text"
              v-model="provider.address_neighborhood"
              required
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="Complemento" label-for="provider-address-complement">
            <b-form-input
              id="provider-address-complement"
              type="text"
              v-model="provider.address_complement"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Referência" label-for="provider-address-reference">
            <b-form-input
              id="provider-address-reference"
              type="text"
              v-model="provider.address_reference"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="Cidade" label-for="provider-address-city">
            <b-form-input
              id="provider-address-city"
              type="text"
              v-model="provider.address_city"
              required
            />
          </b-form-group>
        </b-col>

        <b-col md="4" sm="10">
            <b-form-group label="Estado" label-for="provider-address-state">
                <b-form-select v-model="selectedState" :options="listStates" />
            </b-form-group>
        </b-col>
      </b-row>

      <b-row v-show="!editMode">
        <b-col md="4" sm="10">
          <b-form-group label="Senha" label-for="provider-password">
            <b-form-input
              id="provider-password"
              type="password"
              v-model="provider.password"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Confirmar senha" label-for="provider-password_confirmation">
            <b-form-input
              id="provider-password_confirmation"
              type="password"
              v-model="provider.password_confirmation"
              required
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-button variant="success" @click="saveProvider">Salvar</b-button>
      <router-link to="/providers">
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
      provider: {},
      editMode: false,
      listStates: [],
      selectedCategory: "",
      selectedState: ""
    }
  },
  methods: {
    loadProvider() {
      //console.log("id params: ", this.$route.params.id)
      const url = `${baseURL}/admin/show_provider`
      axios.get(url, {
          params: {
            id: 22,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
            provider_id: this.$route.params.id,
          },
        })
        .then((response) => {
          console.log("response show_provider: ", response)
          const responseJson = response.data
          if (responseJson.success == true) {
            this.provider = responseJson.provider
            this.selectedCategory = responseJson.provider.category_id
            this.selectedState = responseJson.provider.address_state
          }
        })
    },
    saveProvider() {
      console.log('parametros api provider: ', this.provider)

      if (this.editMode) { //Update
        const url = `${baseURL}/admin/update_provider`
        axios.post(url, {
        id: 22,
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
        provider_id: this.provider.id,
        first_name: this.provider.first_name,
        last_name: this.provider.last_name,
        email: this.provider.email,
        //birth_date: this.provider.birth_date,
        //gender: this.provider.gender,
        phone: this.provider.phone,
        zip_code: this.provider.zip_code,
        address_street: this.provider.address_street,
        address_number: this.provider.address_number,
        address_neighborhood: this.provider.address_neighborhood,
        address_complement: this.provider.address_complement,
        address_reference: this.provider.address_reference,
        address_city: this.provider.address_city,
        address_state: this.provider.address_state       
        }).then(response => {
          console.log('response update provider: ', response.data)
          const responseJson = response.data
          if (responseJson.success == true) {
           this.$toasted.global.defaultSuccess({ msg: 'Dados alterados com sucesso' })
          }
        })
      } else { //Register new
        const url = `${baseURL}/admin/save_provider`
        axios.post(url, {
        id: 22,
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
        first_name: this.provider.first_name,
        last_name: this.provider.last_name,
        email: this.provider.email,
        //birth_date: this.provider.birth_date,
        //gender: this.provider.gender,
        phone: this.provider.phone,
        zip_code: this.provider.zip_code,
        address_street: this.provider.address_street,
        address_number: this.provider.address_number,
        address_neighborhood: this.provider.address_neighborhood,
        address_complement: this.provider.address_complement,
        address_reference: this.provider.address_reference,
        address_city: this.provider.address_city,
        address_state: this.provider.address_state, 
        password: this.provider.password     
        }).then(response => {
          console.log('response register provider: ', response.data)
          const responseJson = response.data
          if (responseJson.success == true) {
           this.$toasted.global.defaultSuccess({ msg: 'Prestador criado com sucesso' })
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
      this.loadProvider()
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