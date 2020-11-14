<template>
  <div class="provider">
    <h3>Detalhes do prestador</h3>
    <hr />
    <b-form>

    <div class="conteiner-photo">
      <b-avatar variant="primary" size="8rem" rounded button @click="onButtonClick" :src="imageAvatar"  />
    </div>

    <input type="file"
       ref="file"
       :name="uploadFieldName"
       @change="onFileChange($event.target.name, $event.target.files)"
       style="display:none"
    >

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
      <router-link to="/prestadores">
        <b-button variant="primary" class="ml-5">Voltar</b-button>
      </router-link>
    </b-form>
  </div>
</template>

<script>
import { stateList  } from '../../config/constants/stateList'
import { mask } from 'vue-the-mask'
import providerApi from '../../services/api/providerApi'

export default {
  directives: { mask },
  data() {
    return {
      provider: {},
      editMode: false,
      listStates: [],
      selectedCategory: "",
      selectedState: "",
      uploadFieldName: 'file',
      maxSize: 1024,
      imageAvatar: '',
      picture: {},
      file: ''
    }
  },
  methods: {
    async loadProvider() {
      //console.log("id params: ", this.$route.params.id)
      try {
        let responseShowProvider = await providerApi.showProvider(
          21,
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIxLCJpYXQiOjE2MDM3OTk2OTh9.BMNO9BwUtn4prlopbmAlzUEi3EqZGvPLzh2S3N7zJ2M',
          this.$route.params.id
        )

        let responseJson = responseShowProvider.data
        if (responseJson.success) {
          this.provider = responseJson.provider
          this.selectedCategory = responseJson.provider.category_id
          this.selectedState = responseJson.provider.address_state
        } else {
          this.$toasted.global.defaultError({ msg: 'Erro ao tentar exibir o prestador' })
        }
      } catch (error) {
        this.$toasted.global.defaultError({ msg: 'Falha na operação' })
      }
    },
    async saveProvider() {
      console.log('parametros api provider: ', this.provider)

      if (this.editMode) { //Update
        try {
          let responseUpdateProvider = await providerApi.updateProvider(
            21,
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIxLCJpYXQiOjE2MDM3OTk2OTh9.BMNO9BwUtn4prlopbmAlzUEi3EqZGvPLzh2S3N7zJ2M',
            this.provider.id,
            this.provider.first_name,
            this.provider.last_name,
            this.provider.email,
            this.provider.phone,
            this.provider.zip_code,
            this.provider.address_street,
            this.provider.address_number,
            this.provider.address_neighborhood,
            this.provider.address_complement,
            this.provider.address_reference,
            this.provider.address_city,
            this.provider.address_state
          )

          let responseJson = responseUpdateProvider.data
          console.log('response update provider: ', responseJson)
          if (responseJson.success) {
            this.$toasted.global.defaultSuccess({ msg: 'Dados alterados com sucesso' })
          } else {
            this.$toasted.global.defaultError({ msg: 'Erro ao tentar atualizar o prestador' })
          }
        } catch (error) {
          this.$toasted.global.defaultError({ msg: 'Falha na operação' })
        }
      } else { //Register new
        try {
          let responseRegisterProvider = await providerApi.registerProvider(
            21,
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIxLCJpYXQiOjE2MDM3OTk2OTh9.BMNO9BwUtn4prlopbmAlzUEi3EqZGvPLzh2S3N7zJ2M',
            null, //this.picture,
            this.provider.first_name,
            this.provider.last_name,
            this.provider.email,
            this.provider.phone,
            this.provider.zip_code,
            this.provider.address_street,
            this.provider.address_number,
            this.provider.address_neighborhood,
            this.provider.address_complement,
            this.provider.address_reference,
            this.provider.address_city,
            this.provider.address_state,
            this.provider.password
          )

          let responseJson = responseRegisterProvider.data
          if (responseJson.success) {
            this.$toasted.global.defaultSuccess({ msg: 'Prestador criado com sucesso' })
          } else {
            this.$toasted.global.defaultError({ msg: 'Erro ao tentar criar o prestador' })
          }
        } catch (error) {
          this.$toasted.global.defaultError({ msg: 'Falha na operação' })
        }
      }
    },
    onButtonClick() {
      this.$refs.file.click()
    },
    onFileChange(fieldName, file) {
      const { maxSize } = this
      let imageFile = file[0]
      if (file.length > 0) {
        let size = imageFile.size / maxSize / maxSize
        if (!imageFile.type.match('image.*')) {
          let errorText = 'Por favor selecione uma imagem'
          console.log('errorText: ', errorText)
        } else if (size > 1) {
          let errorText = 'A imagem deve ter menos de 1MB'
          console.log('errorText: ', errorText)
        } else {
          // Append file into FormData and turn file into image URL
          let formData = new FormData()
          let imageURL = URL.createObjectURL(imageFile)
          formData.append(fieldName, imageFile)
          console.log('imageFile: ', imageFile)
          console.log('imageURL: ', imageURL)
          this.imageAvatar = imageURL
          this.picture = imageFile
          console.log('picture: ', this.picture)
          // Emit the FormData and image URL to the parent component
          //this.$emit('input', { formData, imageURL })
        }
      }
    },
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