<template>
  <div v-if="generation" class="content poke-generation">
    <h1 class="generation-title">Geração #{{ generation.id }} <span class="tag is-warning">{{ generation.name }}</span></h1>
    <div class="generation-info block">
      <div class="generation-region">
        <strong>{{ generation.pokemon_species.length }}</strong> Pokémons na região de <strong>{{ generation.main_region.name }}</strong> <i><font-awesome-icon :icon="['fa', 'globe']"/></i>
      </div>

      <div v-if="generation.pokemon_species.length > 0" class="generation-species">
        <h2>Espécies</h2>
          <b-autocomplete
            v-model="name"
            placeholder="Procure pelo nome do Pokémon"
            :keep-first="keepFirst"
            :open-on-focus="openOnFocus"
            :data="pokemonsfiltered"
            field="name"
            :clearable="clearable"
            @select="option => (selected = option)"
          />

        <b-carousel :indicator="false" :arrow-hover="false" :pause-hover="false">
          <b-carousel-item v-for="specie in pokemonsfiltered" :key="specie.name">
            <section class="is-info">
              <div class="hero-body has-text-centered">
                <h1 class="title" @click="handleClickSpecie(specie.name)">{{ specie.name }}</h1>
              </div>
            </section>
          </b-carousel-item>
        </b-carousel>
      </div>

      <div v-if="generation.types.length > 0" class="generation-type">
        <h3>Tipos</h3>
        <span v-for="type in generation.types" :key="type.name" class="tag is-light">{{ type.name }}</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      generation: null,
      error: null,
      keepFirst: false,
      openOnFocus: false,
      name: '',
      selected: null,
      clearable: true
    }
  },
  async fetch() {
    try {
      const _id = this.id.replace('#', '')
      const gen = await this.$services.generation.getGererationById(_id)
      this.generation = gen.data
      this.error = null
    } catch (error) {
      this.error = error.message
    }
  },
   computed: {
    pokemonsfiltered() {
      return this.generation.pokemon_species.filter(option => {
          return (
            option.name
              .toString()
              .toLowerCase()
              .includes(this.name.toLowerCase()) > 0
          )
      })
    }
  },
  methods: {
    handleClickSpecie(name) {
      this.$parent.close()
      this.$router.push({
        path: `/pokemon/${name}`,
      })
    }
  }
}
</script>

<style>
.poke-generation {
  font-family: 'Roboto', 'Source Sans Pro', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  max-width: 100%;
  padding: 20px;
  border-radius: 15px;
  background: #fff;
  margin: 0 10px;
}

.poke-generation .generation-title {
  font-size: 2rem;
  margin-bottom: .5rem;
}

.poke-generation .generation-region {
  margin-bottom: 40px;
}

.poke-generation .generation-species .is-info {
  background-image: url('assets/images/poke_ball.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 10rem;
}

.poke-generation .generation-species .title {
  color: #fff;
  text-transform: capitalize;
  font-size: 2.5rem;
  text-shadow:
    1px  1px 2px black,
    1px -1px 2px black,
   -1px  1px 2px black,
   -1px -1px 2px black;
  cursor: pointer;
}

.poke-generation .generation-species .title:hover {
  color: #000;
  text-shadow:
    1px  1px 2px white,
    1px -1px 2px white,
   -1px  1px 2px white,
   -1px -1px 2px white;
   transition: .5s;
}

.poke-generation .generation-species .carousel {
  margin-top: 20px;
}

.poke-generation .generation-title .tag {
  vertical-align: middle;
}

.poke-generation .generation-type {
  margin-top: 60px;
}

.poke-generation .generation-type .tag {
  margin: 3px;
}
</style>

