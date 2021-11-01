<template>
  <header v-if="pending" class="poke-header">
    <b-skeleton width="100%" height="366px" :animated="true" />
  </header>
  <header v-else class="poke-header" :style="{ backgroundColor: background }">
    <h1 class="pokemon-name">
      <span v-if="training" class="pokemon-name-generation">{{
        training.generation.name
      }}</span>
      {{ pokemon.name }}
      <span class="pokemon-number">#{{ pokemon.id | formatIdNumber }}</span>
    </h1>
    <div class="card-image">
      <figure class="image poke-image">
        <b-image
          :src="`${pokemon.sprites.other['official-artwork'].front_default}`"
          :alt="`Pokémon - ${pokemon.name}`"
          lazy
        />
      </figure>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PokeHeader',
  props: {
    pending: {
      type: Boolean,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    training: {
      type: Object,
      required: true,
    },
    pokemon: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.poke-header {
  background: #dbdbdb;
  .pokemon-name {
    color: #fff;
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    padding-top: 20px;
    text-transform: capitalize;
  }
  .pokemon-name-generation {
    text-transform: none;
    display: block;
    font-size: 1rem;
    color: rgba(23, 23, 27, 0.5);
  }
  .card-image {
    display: flex;
    justify-content: center;
  }
  .poke-image {
    width: 250px;
    height: 250px;
  }
}
</style>
