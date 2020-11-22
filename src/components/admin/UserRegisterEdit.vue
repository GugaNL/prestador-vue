<template>
  <div class="user">

    <b-breadcrumb>
      <b-breadcrumb-item to="/">
        <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true" class="bread-icon" />
        Principal
      </b-breadcrumb-item>
      <b-breadcrumb-item to="/usuarios">Listar usuários</b-breadcrumb-item>
      <b-breadcrumb-item active>Usuário</b-breadcrumb-item>
    </b-breadcrumb>

    <h3>Detalhes do usuário</h3>
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
      <router-link to="/usuarios">
        <b-button variant="primary" class="ml-5">Voltar</b-button>
      </router-link>
    </b-form>
  </div>
</template>

<script>
import { stateList  } from '../../config/constants/stateList'
import { mask } from 'vue-the-mask'
import userApi from '../../services/api/userApi'
//require('/Aprendizado/prestadorservicos-backend/prestador-servicos/public/uploads/1604237092537-bZJOGzqhOzlJPUnaxQYQ.jpeg')

export default {
  directives: { mask },
  data() {
    return {
      user: {},
      editMode: false,
      listStates: [],
      uploadFieldName: 'file',
      maxSize: 1024,
      imageAvatar: '',
      picture: {},
      file: ''
    }
  },
  methods: {
    async loadUser() {
      //console.log("id params: ", this.$route.params.id)
      try {
        let responseShowUser = await userApi.showUser(
        this.$store.getters.user.id, 
        this.$store.getters.user.token,
        this.$route.params.id
      )

      let responseJson = responseShowUser.data
      console.log('response show user: ', responseJson)
      if (responseJson.success == true) {
        this.user = responseJson.user
        if (responseJson.user.image !== null) {
          //this.imageAvatar = responseJson.user.picture
          this.imageAvatar = "../../../../prestadorservicos-backend/prestador-servicos/public/uploads/1604237092537-bZJOGzqhOzlJPUnaxQYQ.jpeg"
          //this.imageAvatar = { id: 1, url: 'C:\\Aprendizado\\prestadorservicos-backend\\prestador-servicos\\public\\uploads\\1604237092537-bZJOGzqhOzlJPUnaxQYQ.jpeg', size: '1mb', original_name: '1604237092537-bZJOGzqhOzlJPUnaxQYQ.jpeg', extension: 'jpg' }
          //this.imageAvatar = "https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/viacom-Avatar-Sea1-Full-Image_GalleryBackground-en-US-1552014700974._SX1080_.jpg" 
          console.log('imageAvatar: ', this.imageAvatar)
        }
      } else {
        this.$toasted.global.defaultError({ msg: 'Erro ao tentar exibir usuário' })
      }
      } catch (error) {
        this.$toasted.global.defaultError({ msg: 'Problemas na operação' })
      }
    },
    async saveUser() {
      console.log('parametros api user: ', this.user, this.picture)

      if (this.editMode) { //Update

        try {
          let responseUpdateUser = await userApi.updateUser(
          this.$store.getters.user.id, 
          this.$store.getters.user.token,
          this.user.id,
          this.picture,
          this.user.first_name,
          this.user.last_name,
          this.user.email,
          //birth_date: this.user.birth_date,
          //gender: this.user.gender,
          this.user.phone,
          this.user.zip_code,
          this.user.address_street,
          this.user.address_number,
          this.user.address_neighborhood,
          this.user.address_complement,
          this.user.address_reference,
          this.user.address_city,
          this.user.address_state
          )

          let responseJson = responseUpdateUser.data
          if (responseJson.success == true) {
            this.$toasted.global.defaultSuccess({ msg: 'Dados alterados com sucesso' })
          } else {
            this.$toasted.global.defaultError({ msg: 'Erro ao tentar atualizar usuário' })
          }
        } catch (error) {
          this.$toasted.global.defaultError({ msg: 'Problemas na operação' })
        }

      } else { //Register new

        try {
          let responseRegisterUser = await userApi.registerUser(
          this.$store.getters.user.id, 
          this.$store.getters.user.token,
          this.picture,
          this.user.first_name,
          this.user.last_name,
          this.user.email,
          //birth_date: this.user.birth_date,
          //gender: this.user.gender,
          this.user.phone,
          this.user.zip_code,
          this.user.address_street,
          this.user.address_number,
          this.user.address_neighborhood,
          this.user.address_complement,
          this.user.address_reference,
          this.user.address_city,
          this.user.address_state, 
          this.user.password
          )

          let responseJson = responseRegisterUser.data
          if (responseJson.success == true) {
            this.$toasted.global.defaultSuccess({ msg: 'Usuário criado com sucesso' })
          } else {
            this.$toasted.global.defaultError({ msg: 'Erro ao tentar registar usuário' })
          }
        } catch (error) {
          this.$toasted.global.defaultError({ msg: 'Problemas na operação' })
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