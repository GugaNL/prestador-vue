<template>
  <div class="category">
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
        <b-button variant="danger" @click="deleteCategory(data.item)">
          <i class="fa fa-trash" />
        </b-button>
      </template>

      <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </b-table>
    </div>

  </div>
</template>

<script>
import axios from "axios"
import { baseURL } from "../../global"

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
    loadCategories() {
      const url = `${baseURL}/admin/list_categories`
      axios.get(url, {
        params: {
          id: 22,
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJpYXQiOjE2MDE0MTM5NjN9.a3C95mPHvDDlZpY1H1L6AgdyFaZGHduNFEL4xr1iilU",
          name: this.category.name ? this.category.name : '',
          page: this.page
        },
      }).then(response => {
        const responseJson = response.data
        if (responseJson.success == true) {
          this.categories = responseJson.categories.data
          this.page = responseJson.categories.pagination.page
          this.limit = responseJson.categories.pagination.perPage
          this.count = responseJson.categories.pagination.total
        } else {
          console.log('Erro')
        }
      })
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


</style>