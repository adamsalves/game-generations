<template>
  <div v-if="generation" class="content poke-generation">
    <h1 class="generation-title">
      Generation #{{ generation.id }}
      <span class="tag is-warning">{{ generation.name }}</span>
    </h1>
    <div class="generation-info block">
      <div class="generation-region">
        <strong>{{ generation.pokemon_species.length }}</strong> Pokémons in the
        <strong>{{ generation.main_region.name }}</strong> region
        <i><font-awesome-icon :icon="['fa', 'globe']" /></i>
      </div>

      <div
        v-if="generation.pokemon_species.length > 0"
        class="generation-species"
      >
        <h2>Species</h2>
        <b-autocomplete
          v-model="name"
          placeholder="Search for Pokémon name"
          :keep-first="keepFirst"
          :open-on-focus="openOnFocus"
          :data="pokemonsfiltered"
          field="name"
          :clearable="clearable"
          @select="(option) => (selected = option)"
        />

        <b-carousel
          :indicator="false"
          :arrow-hover="false"
          :pause-hover="false"
        >
          <b-carousel-item
            v-for="specie in pokemonsfiltered"
            :key="specie.name"
          >
            <section class="is-info">
              <div class="hero-body has-text-centered">
                <h1 class="title" @click="handleClickSpecie(specie.name)">
                  {{ specie.name }}
                </h1>
              </div>
            </section>
          </b-carousel-item>
        </b-carousel>
      </div>

      <div v-if="generation.types.length > 0" class="generation-type">
        <h3>Types</h3>
        <span
          v-for="type in generation.types"
          :key="type.name"
          class="tag is-light"
          >{{ type.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      generation: null,
      keepFirst: false,
      openOnFocus: false,
      name: '',
      selected: null,
      clearable: true,
    }
  },
  async fetch() {
    try {
      const _id = this.id.replace('#', '')
      const gen = await this.$services.generation.getGererationById(_id)
      this.generation = gen.data
    } catch (error) {
      this.$parent.close()
      this.$buefy.toast.open({
        duration: 5000,
        message: `Não foi possivel retornar os dados! ${error.message}`,
        position: 'is-bottom',
        type: 'is-danger',
      })
    }
  },
  computed: {
    pokemonsfiltered() {
      return this.generation.pokemon_species.filter((option) => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .includes(this.name.toLowerCase()) > 0
        )
      })
    },
  },
  methods: {
    handleClickSpecie(name) {
      this.$parent.close()
      this.$router.push({
        path: `/pokemon/${name}`,
      })
    },
  },
}
</script>

<style lang="scss">
.poke-generation {
  font-family: 'Roboto', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  max-width: 100%;
  padding: 20px;
  border-radius: 15px;
  background: #fff;
  margin: 0 10px;
  .generation-title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    .tag {
      vertical-align: middle;
    }
  }
  .generation-region {
    margin-bottom: 40px;
  }
  .generation-species {
    .is-info {
      background-image: url('assets/images/poke_ball.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 10rem;
    }
    .title {
      color: #fff;
      text-transform: capitalize;
      font-size: 2.5rem;
      text-shadow: 1px 1px 2px black, 1px -1px 2px black, -1px 1px 2px black,
        -1px -1px 2px black;
      cursor: pointer;
      margin: 0 20px;
      &:hover {
        color: #000;
        text-shadow: 1px 1px 2px white, 1px -1px 2px white, -1px 1px 2px white,
          -1px -1px 2px white;
        transition: 0.5s;
      }
    }
    .carousel {
      margin-top: 25px;
      margin-bottom: 15px;
    }
  }
  .generation-type {
    margin-top: 30px;
    .tag {
      margin: 3px;
    }
  }
}
</style>

