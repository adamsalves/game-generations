<template>
  <div class="columns">
    <Card
      v-for="(generation, index) in generationsList"
      :key="generation.name"
      :name="generation.name"
      :background-color="backgroundColors[index]"
      class="column"
      @generation-id="generationModal"
    />
  </div>
</template>

<script>
import Generations from '@/components/Modal/Generations.vue'
export default {
  data() {
    return {
      generationsList: [],
      backgroundColors: ['#8BD674', '#58ABF6', '#B5B9C4', '#9F6E97', '#F78551', '#EBA8C3', '#F2CB55', '#8bbebe']
    }
  },
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
  },
  mounted() {
    this.getGenerations()
  },
  methods: {
    async getGenerations() {
      try {
        const { data } = await this.$services.generation.getGenerations()
        this.generationsList = data.results
      } catch (error) {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Erro ao carregar dados: ${error.message}`,
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },
    generationModal(hash) {
      this.$buefy.modal.open({
        parent: this,
        component: Generations,
        customClass: 'generation-modal',
        props: {
          id: hash,
        }
      })
    },
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
