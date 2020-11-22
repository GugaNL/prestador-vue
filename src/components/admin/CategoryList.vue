<template>
  <div class="category">

    <b-breadcrumb>
      <b-breadcrumb-item to="/">
        <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true" class="bread-icon" />
        Principal
      </b-breadcrumb-item>
      <b-breadcrumb-item active>Lista de categorias</b-breadcrumb-item>
    </b-breadcrumb>

    <h3>Lista de categorias</h3>
    <hr>
    <div class="category-content">
    <b-form>
      <input id="category-id" type="hidden" v-model="category.id">
      <b-row>
        <b-col md="4" sm="10">
          <b-form-group label="Pesquisa" label-for="category-name"> <!--label-for é o id do input  -->
            <b-form-input id="category-name" type="text" v-model="category.name" placeholder="Nome da categoria" />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="10" class="col-search">
          <b-button variant="success" class="ml-5" @click="loadCategories">Pesquisar</b-button>
          <b-button variant="primary" class="ml-5" @click="clearSearch">Limpar</b-button>
        </b-col>
      </b-row>
    </b-form>

    <b-table hover striped :items="categories" :fields="fields" class="text-center">
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="showCategory(data.item)" class="mr-2">
          <i class="fa fa-pencil" />
        </b-button>
        <b-button variant="danger" @click="notifyDelete(data.item)">
          <i class="fa fa-trash" />
        </b-button>
      </template>

      <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </b-table>
    </div>

  </div>
</template>

<script>
import categoryApi from '../../services/api/categoryApi'

export default {
  name: "Category",
  data() {
    return {
      mode: "save",
      category: {},
      categories: [],
      fields: [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'description', label: 'Descrição', sortable: false },
        { key: 'actions', label: 'Ações' }
      ],
      page: 1,
      limit: 0,
      count: 0
    }
  },
  methods: {
    async loadCategories() {
      try {
        let responseListCategories = await categoryApi.listCategories(
        this.$store.getters.user.id, 
        this.$store.getters.user.token,
        this.category.name ? this.category.name : '',
        this.page
        )
        let responseJson = responseListCategories.data

        if (responseJson.success == true) {
          this.categories = responseJson.categories.data
          this.page = responseJson.categories.pagination.page
          this.limit = responseJson.categories.pagination.perPage
          this.count = responseJson.categories.pagination.total
        } else {
          this.$toasted.global.defaultError({ msg: 'Erro ao tentar listar categorias' })
        }
      } catch (error) {
        this.$toasted.global.defaultError({ msg: 'Falha na operação' })
      }
    },
    notifyDelete(item) {
      this.$confirm(`Tem certeza que deseja deletar a categoria ${item.name}?` ).then(() => {
        this.deleteCategory(item)
      })
    },
    async deleteCategory(item) {
      try {
        let responseDeleteCategory = await categoryApi.deleteCategory(
        this.$store.getters.user.id, 
        this.$store.getters.user.token,
        item.id
        )

        let responseJson = responseDeleteCategory.data

        if (responseJson.success == true) {
          this.$toasted.global.defaultSuccess({ msg: 'Categoria deletada com sucesso' })
          this.loadCategories()
        } else {
          this.$toasted.global.defaultError({ msg: 'Erro ao tentar deletar a categoria' })
        }
      } catch (error) {
        this.$toasted.global.defaultError({ msg: 'Falha na operação' })
      }
    },
    clearSearch() {
      this.category.name = ''
      this.loadCategories()
    },
    showCategory(item) {
      this.$router.push(`/category/${item.id}`)
    },
    convertStatus(statusName) {
      if (statusName === 'pending') {
        return 'Pendente'
      } else if (statusName === 'approved') {
        return 'Aprovado'
      } else {
        return 'Rejeitado'
      }
    }
  },
  mounted() {
    this.loadCategories()
  },
  watch: {
    page() {
      this.loadCategories()
    }
  }
}
</script>

<style>

.category-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
}

.col-search {
  display: flex;
  align-items: center;
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