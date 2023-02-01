<template>
  <main>
    <h2>{{ $t('mainPage') }}</h2>
    <p>{{ $t('description') }}</p>
  </main>
</template>

<script>

export default {
  name: "HomeView",
}
</script>

<style scoped>

</style>

<i18n>
{
  "pl": {
    "mainPage": "Strona główna",
    "description": "Szukaj artystów, koncertów i sprawdź kto gdzie grał koncert"
  },
  "en": {
    "mainPage": "Main page",
    "description": "Serch for artists, concerts and check who played where"
  }
}
</i18n>