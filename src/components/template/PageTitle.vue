<template>
  <div class="page-title">
      <h1><i v-if="icon" :class="icon"></i>{{ title }}</h1>
      <h2>{{ subTitle }}</h2>
      <hr>
  </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon', 'title', 'subTitle']
}
</script>

<style>
    .page-title h1 {
        margin: 0px;
        color: cornflowerblue;
    }

    .page-title h2 {
        color: #777;
        margin-top: 5px;
        font-size: 1.3rem;
    }

    .page-title i {
        margin-right: 10px;
    }

</style>