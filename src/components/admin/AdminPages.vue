<template>
  <div class="admin-pages">
    <PageTitle
      icon="fa fa-cogs"
      title="Configurações"
      subTitle="Informações gerais do sistema"
    />

    <div class="cont-config">
      <toggle-button
        :value="toggleBannerActive"
        color="#40c757"
        :sync="true"
        :labels="true"
        @change="toggleBanner"
      />
      <span class="span-text-config">Exibir Banner tela inicial do Aplicativo</span>
    </div>


  </div>
</template>

<script>
import PageTitle from "../template/PageTitle"

export default {
  name: "AdminPages",
  components: { PageTitle },
  data() {
    return {
      toggleBannerActive: false
    }
  },
  methods: {
    toggleBanner() {
      this.toggleBannerActive = !this.toggleBannerActive
    }
  }
}
</script>

<style>

.cont-config {
  display: flex;
  align-items: flex-start;
}

.span-text-config {
  margin-left: 15px;
  color: #808080;
}

</style>