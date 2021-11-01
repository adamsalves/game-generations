<template>
  <div class="poke-content">
    <b-skeleton v-if="pending" width="15%" :animated="true" />
    <p v-else class="poke-desc is-6">
      <strong>Specie:</strong> {{ pokemon.name }}
    </p>
    <b-skeleton v-if="pending" width="15%" :animated="true" />
    <p v-else class="poke-desc is-6">
      <strong>Weight:</strong> {{ pokemon.weight }}
    </p>
    <b-skeleton v-if="pending" width="15%" :animated="true" />
    <p v-else class="poke-desc is-6">
      <strong>Height:</strong> {{ pokemon.height }}
    </p>
    <b-skeleton v-if="pending" width="15%" :animated="true" />
    <p v-else class="poke-desc is-6">
      <strong>Type:</strong>
      <span
        v-for="type in pokemon.types"
        :key="type.type.name"
        class="tag is-warning"
        >{{ type.type.name }}</span
      >
    </p>
    <b-skeleton v-if="pending" width="30%" :animated="true" />
    <p v-else class="poke-desc is-6">
      <strong>Abilities:</strong>
      <span
        v-for="ability in pokemon.abilities"
        :key="ability.ability.name"
        class="tag is-info"
        >{{ ability.ability.name }}</span
      >
    </p>
    <b-skeleton v-if="pending" width="30%" :animated="true" />
    <p v-else class="poke-desc is-6">
      <strong>Weaknesses:</strong>
      <span
        v-for="weakness in weaknesses.damage_relations.double_damage_from"
        :key="weakness.name"
        class="tag is-danger"
        >{{ weakness.name }}</span
      >
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PokeAbout',
  props: {
    pending: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      pokemon: 'GET_POKEMON',
      weaknesses: 'GET_WEAKNESSES',
    }),
  },
}
</script>

<style lang="scss">
.poke-desc {
  margin: 10px 0;
  .tag {
    margin-right: 5px;
  }
}
</style>
