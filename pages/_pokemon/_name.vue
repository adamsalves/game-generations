<template>
  <div class="pokemon-specie">
    <div class="pokemon">
      <div v-if="pokemon" class="card">
        <header class="p-header" :style="{ backgroundColor: GET_BACKGROUND_COLOR }">
          <h1 class="pokemon-name">{{ pokemon.name }} <span class="pokemon-number">#{{ pokemon.id | formatIdNumber }}</span></h1>
          <div class="card-image">
            <figure class="image poke-image">
              <img :src="`${pokemon.sprites.other['official-artwork'].front_default}`" :alt="`Pokémon - ${pokemon.name}`">
            </figure>
          </div>
        </header>
        <div class="card-content pokemon-info">
          <div class="content">
            <b-tabs v-model="activeTab" @input="handleEvolution">
              <b-tab-item label="About">
                <div class="poke-content">
                  <p class="poke-desc is-6"><strong>Specie:</strong> {{ pokemon.name }}</p>
                  <p class="poke-desc is-6">
                    <strong>Weight:</strong> {{ pokemon.weight }}
                  </p>
                  <p class="poke-desc is-6">
                    <strong>Height:</strong> {{ pokemon.height }}
                  </p>
                  <p class="poke-desc is-6">
                    <strong>Type:</strong> <span v-for="type in pokemon.types" :key="type.type.name" class="tag is-warning">{{ type.type.name }}</span>
                  </p>
                  <p class="poke-desc is-6">
                    <strong>Abilities:</strong> <span v-for="ability in pokemon.abilities" :key="ability.ability.name" class="tag is-info">{{ ability.ability.name }}</span>
                  </p>
                  <p v-if="weaknesses" class="poke-desc is-6">
                    <strong>Weaknesses:</strong> <span v-for="weakness in weaknesses.damage_relations.double_damage_from" :key="weakness.name" class="tag is-danger">{{ weakness.name }}</span>
                  </p>
                </div>
              </b-tab-item>

              <b-tab-item v-if="training" label="Training">
                <div class="poke-content">
                  <p class="poke-desc is-6"><strong>Generation:</strong> {{ training.generation.name }}</p>
                  <p class="poke-desc is-6"><strong>Base happiness:</strong> {{ training.base_happiness }}</p>
                  <p class="poke-desc is-6">
                    <strong>Habitat:</strong> {{ training.habitat ? training.habitat.name : 'unknown' }}
                  </p>
                  <p class="poke-desc is-6">
                    <strong>Capture rate:</strong> {{ training.capture_rate }}
                  </p>
                  <p class="poke-desc is-6">
                    <strong>Growth rate:</strong> {{ training.growth_rate ? training.growth_rate.name : 'unknown' }}
                  </p>
                  <p class="poke-desc is-6">
                    <strong>Shape:</strong> {{ training.shape ? training.shape.name : '' }}
                  </p>
                  <p class="poke-desc is-6">
                    <strong>Egg groups:</strong>
                    <span v-if="training.egg_groups.length > 0">
                      <span v-for="group in training.egg_groups" :key="group.name" class="tag is-link">{{ group.name }}</span>
                    </span>
                    <span v-else class="tag is-link">unknown</span>
                  </p>
                </div>
              </b-tab-item>

              <b-tab-item label="Stats">
                <div class="poke-stats">
                  <b-progress v-for="stat in pokemon.stats" :key="stat.stat.name" :value="stat.base_stat" size="is-medium" type="is-success" show-value>
                    {{ stat.stat.name }} {{ stat.base_stat }}%
                  </b-progress>
                </div>
              </b-tab-item>

              <b-tab-item label="Evolution">
                <div class="poke-evolution">
                  <div v-for="poke in pokeEvolution" :key="poke.id" class="poke-specie">
                    <p class="poke-specie-name">{{ poke.specie }} - #{{ poke.id | formatIdNumber }}</p>
                    <img :src="poke.image_url" :alt="poke.specie" class="poke-specie-image">
                    <span v-for="type in poke.types" :key="type.type.name" class="tag is-warning">{{ type.type.name }}</span>
                  </div>
                </div>
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PokemonName',
  data() {
    return {
      activeTab: 0,
      pokemon: null,
      weaknesses: null,
      training: null,
      evolution: null,
      pokeEvolution: null
    }
  },
  async fetch() {
    try {
      const name = this.$route.params.name
      const poke = await this.$services.specie.getPokemonByName(name)

      const type = poke.data.types.find((type, index) => index === 0)
      const pokeStats = await this.$services.type.getTypeByName(type.type.name)

      const pokemonSpecie = await this.$services.pokemonSpecie.getPokemonSpecieByName(name)

      const id = pokemonSpecie.data.evolution_chain.url.replace('https://pokeapi.co/api/v2/evolution-chain/', '')
      const evolutionChain = await this.$services.evolution.getEvolution(id)

      this.pokemon = poke.data
      this.weaknesses = pokeStats.data
      this.training = pokemonSpecie.data
      this.evolution = evolutionChain.data
    } catch (error) {
      this.$router.push('/')
      this.$buefy.toast.open({
        duration: 5000,
        message: `Não foi possivel retornar os dados! ${error.message}`,
        position: 'is-bottom',
        type: 'is-danger'
      })
    }
  },
  head() {
    return {
      title: `${this.pokemon ? this.pokemon.name : ''} - Pokémon - Game Generations'`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.pokemon ? this.pokemon.name : ''} - Pokémon - Game Generations'`,
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['GET_BACKGROUND_COLOR'])
  },
  methods: {
    handleEvolution() {
      if(this.activeTab === 3) {
        this.$nuxt.$loading.start()
        const first = this.evolution.chain.species.name
        const secondEvolution = this.evolution.chain.evolves_to.find((chain, index) => index === 0)
        const thirdEvolution = secondEvolution !== undefined ? secondEvolution.evolves_to.find((chain, index) => index === 0) : ''
        const second = secondEvolution ? secondEvolution.species.name : ''
        const third = thirdEvolution ? thirdEvolution.species.name : ''

        const pokemonPromisses = [first, second, third].map((name) => {
          return name !== '' ? this.$services.specie.getPokemonByName(name) : null
        })

        Promise.all(pokemonPromisses).then((poke) => {
          const pokeEvolution = poke.map((p) => {
            return p ? {
              id: p.data.id,
              image_url: p.data.sprites.other['official-artwork'].front_default,
              specie: p.data.name,
              types: p.data.types
            } : null
          })

          this.pokeEvolution = pokeEvolution.filter((pe) => {
            return pe !== null
          })

          this.$nuxt.$loading.finish()
        }).catch((error) => {
          this.$nuxt.$loading.finish()
          this.$buefy.toast.open({
            duration: 5000,
            message: `Não foi possivel retornar os dados! ${error.message}`,
            position: 'is-bottom',
            type: 'is-danger'
          })
        })
      }
    },
  },
}
</script>

<style scoped>
.pokemon .p-header {
  background: #8BBE8A;
}

.pokemon .p-header .pokemon-name {
  color: #fff;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  padding-top: 20px;
  text-transform: capitalize;
}

.pokemon .card-image {
  display: flex;
  justify-content: center;
}

.pokemon .poke-image {
  width: 250px;
  height: 250px;
}

.pokemon .pokemon-info {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.pokemon .pokemon-info .poke-content .poke-desc {
  margin: 10px 0;
}

.pokemon .pokemon-info .poke-content .tag {
  margin-right: 5px;
}

.pokemon .pokemon-info .poke-stats {
  margin-top: 10px;
}

.pokemon .pokemon-info .poke-evolution {
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;
}

.pokemon .pokemon-info .poke-specie {
  margin: 25px;
  text-align: center;
}

.pokemon .pokemon-info .poke-specie-image {
  display: block;
  width: 150px;
  height: 150px;
}

.pokemon .pokemon-info .poke-specie .tag {
  margin-top: 10px;
  margin-right: 5px;
}

.pokemon .pokemon-info .poke-specie-name {
  text-transform: capitalize;
  font-weight: 700;
}
</style>
