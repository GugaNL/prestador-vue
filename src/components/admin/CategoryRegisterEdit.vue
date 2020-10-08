<template>
  <div class="category">
    <h3>Categoria</h3>
    <hr />
    
    <div class="category-content">
      <b-form>
      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="Nome" label-for="category-name"> <!--label-for é o id do input  -->
            <b-form-input
              id="category-name"
              type="text"
              v-model="category.name"
              required
              placeholder="Nome da categoria"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10">
          <b-form-group label="Descrição" label-for="category-description">
            <b-form-input
              id="category-description"
              type="text"
              v-model="category.description"
              required
              placeholder="Descrição da categoria"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-button variant="success" @click="saveCategory">Salvar</b-button>
      <router-link to="/categories">
        <b-button variant="primary" class="ml-5">Voltar</b-button>
      </router-link>
    </b-form>
    </div>
    
  </div>
</template>

<script>
import axios from "axios"
import { baseURL } from "../../global"

export default {
    data() {
        return {
            category: {}
        }
    },
    methods: {
      loadCategory() {
      const url = `${baseURL}/admin/show_category`
      axios
        .get(url, {
          params: {
            id: 22,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
            category_id: this.$route.params.id,
          },
        })
        .then((response) => {
          console.log("response show_category: ", response.data)
          const responseJson = response.data
          if (responseJson.success == true) {
            this.category = responseJson.category
          }
        })
      },
      saveCategory() {
        console.log('parametros: ', this.category)
        const url = `${baseURL}/admin/update_category`
        axios.post(url, {
            id: 22,
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
            category_id: this.category.id,
            name: this.category.name,
            description: this.category.description
          
        }).then(response => {
          console.log('response update category: ', response.data)
          const responseJson = response.data
          if (responseJson.success == true) {
            this.$toasted.global.defaultSuccess({ msg: 'Dados alterados com sucesso' })
            console.log('Editado com sucesso')
          }
        })
      }
    },
    mounted() {
      this.loadCategory()
    }
}

</script>

<style>

.category-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
}
</style>