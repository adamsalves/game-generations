<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <header class="name">
          <span class="content-name">{{ name }}</span>
          <h2 class="generation-title">Geração</h2>
        </header>
        <footer>
          <p class="generation-number">{{ generationNumber(name) }}</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
  },
  methods: {
    generationNumber(generation) {
      const generations = {
        "generation-i": "#1",
        "generation-ii": "#2",
        "generation-iii": "#3",
        "generation-iv": "#4",
        "generation-v": "#5",
        "generation-vi": "#6",
        "generation-vii": "#7",
        "generation-viii": "#8",
        default: "#1",
      };
      return generations[generation] || generations.default;
    },
  }
}
</script>

<style scoped>
.card {
  max-width: 250px;
  border-radius: 15px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 44%), 0 0px 0 1px rgb(10 10 10 / 30%);
}

.card .card-content {
  padding: .5rem 1.5rem;
  background-image: url('assets/images/poke_ball_icon.svg');
  background-repeat: no-repeat;
  background-position: center;
}

.content h2:not(:first-child) {
  margin-top: 0;
}

.content .name {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content .name .content-name {
  font-size: 1rem;
  display: inline-flex;
  color: #aaa;
}

.content .name .generation-title {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 3rem;
  margin-bottom: 100px;
}

.content .generation-number {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 9rem;
  line-height: 6rem;
  font-weight: 700;
  position: absolute;
  bottom: 0;
  left: 0;
}

@media (max-width: 960px) {
  .card {
    max-width: 100%;
  }
}
</style>
