<template>
  <div class="columns">
    <Card
      v-for="generation in generationsList"
      :key="generation.name"
      :name="generation.name"
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
      generationsList: []
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
