<template>
  <div class="columns">
    <Card class="column" name="generation-i" />
    <Card class="column" name="generation-ii" />
    <Card class="column" name="generation-iii" />
    <Card class="column" name="generation-iv" />
    <Card class="column" name="generation-v" />
    <Card class="column" name="generation-vi" />
    <Card class="column" name="generation-vii" />
    <Card class="column" name="generation-viii" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Home - Pokémon - Game Generations',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Pokémon - Game Generations - Lista de gerações de Pokémons e seus detalhes'
        }
      ]
    }
  }
}
</script>

<style scoped>
.columns {
  flex-flow: wrap;
  margin-left: 0;
  margin-right: 0;
}
.card {
  margin: 35px;
}
</style>
