<template>
  <div class="pokemon-specie">
    <div class="pokemon">
      <div class="card">
        <header v-if="$fetchState.pending" class="p-header">
          <b-skeleton width="100%" height="366px" :animated="true" />
        </header>
        <header
          v-else
          class="p-header"
          :style="{ backgroundColor: GET_BACKGROUND_COLOR }"
        >
          <h1 class="pokemon-name">
            <span v-if="training" class="pokemon-name-generation">{{
              training.generation.name
            }}</span>
            {{ pokemon.name }}
            <span class="pokemon-number"
              >#{{ pokemon.id | formatIdNumber }}</span
            >
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
        <div class="card-content pokemon-info">
          <div class="content">
            <b-tabs v-model="activeTab" @input="handleEvolution">
              <b-tab-item label="About">
                <div class="poke-content">
                  <b-skeleton
                    v-if="$fetchState.pending"
                    width="15%"
                    :animated="true"
                  />
                  <p v-else class="poke-desc is-6">
                    <strong>Specie:</strong> {{ pokemon.name }}
                  </p>
                  <b-skeleton
                    v-if="$fetchState.pending"
                    width="15%"
                    :animated="true"
                  />
                  <p v-else class="poke-desc is-6">
                    <strong>Weight:</strong> {{ pokemon.weight }}
                  </p>
                  <b-skeleton
                    v-if="$fetchState.pending"
                    width="15%"
                    :animated="true"
                  />
                  <p v-else class="poke-desc is-6">
                    <strong>Height:</strong> {{ pokemon.height }}
                  </p>
                  <b-skeleton
                    v-if="$fetchState.pending"
                    width="15%"
                    :animated="true"
                  />
                  <p v-else class="poke-desc is-6">
                    <strong>Type:</strong>
                    <span
                      v-for="type in pokemon.types"
                      :key="type.type.name"
                      class="tag is-warning"
                      >{{ type.type.name }}</span
                    >
                  </p>
                  <b-skeleton
                    v-if="$fetchState.pending"
                    width="30%"
                    :animated="true"
                  />
                  <p v-else class="poke-desc is-6">
                    <strong>Abilities:</strong>
                    <span
                      v-for="ability in pokemon.abilities"
                      :key="ability.ability.name"
                      class="tag is-info"
                      >{{ ability.ability.name }}</span
                    >
                  </p>
                  <b-skeleton
                    v-if="$fetchState.pending"
                    width="30%"
                    :animated="true"
                  />
                  <p v-else class="poke-desc is-6">
                    <strong>Weaknesses:</strong>
                    <span
                      v-for="weakness in weaknesses.damage_relations
                        .double_damage_from"
                      :key="weakness.name"
                      class="tag is-danger"
                      >{{ weakness.name }}</span
                    >
                  </p>
                </div>
              </b-tab-item>

              <b-tab-item label="Training">
                <div v-if="training" class="poke-content">
                  <p class="poke-desc is-6">
                    <strong>Generation:</strong> {{ training.generation.name }}
                  </p>
                  <p class="poke-desc is-6">
                    <strong>Base happiness:</strong>
                    {{ training.base_happiness }}
                  </p>
                  <p class="poke-desc is-6">
                    <strong>Habitat:</strong>
                    {{ training.habitat ? training.habitat.name : 'unknown' }}
                  </p>
                  <p class="poke-desc is-6">
                    <strong>Capture rate:</strong> {{ training.capture_rate }}
                  </p>
                  <p class="poke-desc is-6">
                    <strong>Growth rate:</strong>
                    {{
                      training.growth_rate
                        ? training.growth_rate.name
                        : 'unknown'
                    }}
                  </p>
                  <p class="poke-desc is-6">
                    <strong>Shape:</strong>
                    {{ training.shape ? training.shape.name : '' }}
                  </p>
                  <p class="poke-desc is-6">
                    <strong>Egg groups:</strong>
                    <span v-if="training.egg_groups.length > 0">
                      <span
                        v-for="group in training.egg_groups"
                        :key="group.name"
                        class="tag is-link"
                        >{{ group.name }}</span
                      >
                    </span>
                    <span v-else class="tag is-link">unknown</span>
                  </p>
                </div>
              </b-tab-item>

              <b-tab-item label="Stats">
                <div v-if="pokemon" class="poke-stats">
                  <b-progress
                    v-for="stat in pokemon.stats"
                    :key="stat.stat.name"
                    :value="stat.base_stat"
                    size="is-medium"
                    type="is-success"
                    show-value
                  >
                    {{ stat.stat.name }} {{ stat.base_stat }}%
                  </b-progress>
                </div>
              </b-tab-item>

              <b-tab-item label="Evolution">
                <div class="poke-evolution">
                  <div v-if="error" class="no-poke-evolution">
                    {{ error }}
                  </div>
                  <div
                    v-for="poke in pokeEvolution"
                    :key="poke.value.id"
                    class="poke-specie"
                  >
                    <p class="poke-specie-name">
                      {{ poke.value.specie }} - #{{
                        poke.value.id | formatIdNumber
                      }}
                    </p>
                    <b-image
                      :src="poke.value.image_url"
                      :alt="poke.value.specie"
                      class="poke-specie-image"
                      lazy
                    />
                    <span
                      v-for="type in poke.value.types"
                      :key="type.type.name"
                      class="tag is-warning"
                      >{{ type.type.name }}</span
                    >
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
      pokeEvolution: null,
      evolutionChainNames: [],
      loading: true,
      error: null,
    }
  },
  async fetch() {
    try {
      const name = this.$route.params.name
      const poke = await this.$services.specie.getPokemonByName(name)

      const type = poke.data.types.find((type, index) => index === 0)
      const pokeStats = await this.$services.type.getTypeByName(type.type.name)

      const pokemonSpecie =
        await this.$services.pokemonSpecie.getPokemonSpecieByName(name)

      const id = pokemonSpecie.data.evolution_chain.url.replace(
        'https://pokeapi.co/api/v2/evolution-chain/',
        ''
      )
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
        type: 'is-danger',
      })
    }
  },
  head() {
    return {
      title: `${
        this.pokemon ? this.pokemon.name : ''
      } - Pokémon - Game Generations'`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${
            this.pokemon ? this.pokemon.name : ''
          } - Pokémon - Game Generations'`,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['GET_BACKGROUND_COLOR']),
  },
  methods: {
    evolutionChain(evolution) {
      if (!evolution.species) return false
      this.evolutionChainNames.push(evolution.species.name)
      evolution.evolves_to.forEach((evolvesTo) => {
        return this.evolutionChain(evolvesTo)
      })
    },
    handleEvolution() {
      if (this.activeTab === 3 && !this.pokeEvolution) {
        this.$nuxt.$loading.start()
        this.evolutionChain(this.evolution.chain)
        const pokemonPromisses = this.evolutionChainNames.map((name) => {
          return this.$services.specie.getPokemonByName(name).then((poke) => {
            return {
              id: poke.data.id,
              image_url:
                poke.data.sprites.other['official-artwork'].front_default,
              specie: poke.data.name,
              types: poke.data.types,
            }
          })
        })
        Promise.allSettled(pokemonPromisses)
          .then((pokemon) => {
            this.pokeEvolution = pokemon.filter((poke) => {
              return poke.status === 'fulfilled'
            })
            this.$nuxt.$loading.finish()
          })
          .catch((error) => {
            this.$nuxt.$loading.finish()
            this.$buefy.toast.open({
              duration: 5000,
              message: `Não foi possivel retornar os dados! ${error.message}`,
              position: 'is-bottom',
              type: 'is-danger',
            })
            this.error = 'Parece que não temos evolução para esse Pokémon :('
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.pokemon {
  .p-header {
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
  .pokemon-info {
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    .poke-content {
      .poke-desc {
        margin: 10px 0;
        .tag {
          margin-right: 5px;
        }
      }
    }
    .poke-stats {
      margin-top: 10px;
    }
    .poke-evolution {
      display: flex;
      justify-content: space-around;
      align-content: center;
      flex-wrap: wrap;
      .no-poke-evolution {
        margin-top: 2rem;
      }
      .poke-specie {
        margin: 25px;
        text-align: center;
        .poke-specie-image {
          display: block;
          width: 150px;
          height: 150px;
          margin: 0;
        }
        .tag {
          margin-top: 10px;
          margin-right: 5px;
        }
        .poke-specie-name {
          text-transform: capitalize;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
