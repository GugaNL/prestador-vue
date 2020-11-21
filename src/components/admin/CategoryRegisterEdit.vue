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
      <router-link to="/categorias">
        <b-button variant="primary" class="ml-5">Voltar</b-button>
      </router-link>
    </b-form>
    </div>
    
  </div>
</template>

<script>
import categoryApi from '../../services/api/categoryApi'

export default {
    data() {
      return {
        category: {},
        editMode: false
      }
    },
    methods: {
      async loadCategory() {
        try {
          let responseShowCategory = await categoryApi.showCategory(
            this.$store.getters.user.id, 
            this.$store.getters.user.token,
            this.$route.params.id
          )

          let responseJson = responseShowCategory.data
          if (responseJson.success) {
            this.category = responseJson.category
          } else {
            this.$toasted.global.defaultError({ msg: 'Erro ao tentar exibir a categoria' })
          }
        } catch (error) {
          this.$toasted.global.defaultError({ msg: 'Falha na operação' })
        }
      },
      async saveCategory() {
        console.log('parametros: ', this.category)

        if (this.editMode) { //Edit category
        try {
          let responseUpdateCategory = await categoryApi.updateCategory(
            this.$store.getters.user.id, 
            this.$store.getters.user.token,
            this.category.id,
            this.category.name,
            this.category.description
          )

          let responseJson = responseUpdateCategory.data
          if (responseJson.success) {
            this.$toasted.global.defaultSuccess({ msg: 'Dados alterados com sucesso' })
          } else {
            this.$toasted.global.defaultError({ msg: 'Erro ao tentar editar a categoria' })
          }
        } catch (error) {
          this.$toasted.global.defaultError({ msg: 'Falha na operação' })
        }
        } else { //New category
          try {
            let responseSaveCategory = await categoryApi.saveCategory(
              this.$store.getters.user.id, 
              this.$store.getters.user.token,
              this.category.name,
              this.category.description
            )

            let responseJson = responseSaveCategory.data
            if (responseJson.success) {
              this.$toasted.global.defaultSuccess({ msg: 'Categoria criada com sucesso' })
            } else {
              this.$toasted.global.defaultError({ msg: 'Erro ao tentar salvar a categoria' })
            }
          } catch (error) {
            this.$toasted.global.defaultError({ msg: 'Falha na operação' })
          }
        }
      }
    },
    mounted() {
      if (this.$route.params.id) {
        this.editMode = true
        this.loadCategory()
      }
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