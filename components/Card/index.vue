<template>
  <div
    class="card"
    :style="{ backgroundColor }"
    @click="handleClickCard(generationNumber(name), backgroundColor)"
  >
    <div class="card-content">
      <div class="content">
        <header class="name">
          <span class="content-name">{{ name }}</span>
          <h2 class="generation-title">Generation</h2>
        </header>
        <footer>
          <p class="generation-number">{{ generationNumber(name) }}</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(['SET_BACKGROUND_COLOR']),
    generationNumber(generation) {
      const generations = {
        'generation-i': '#1',
        'generation-ii': '#2',
        'generation-iii': '#3',
        'generation-iv': '#4',
        'generation-v': '#5',
        'generation-vi': '#6',
        'generation-vii': '#7',
        'generation-viii': '#8',
        default: '#1',
      }
      return generations[generation] || generations.default
    },
    handleClickCard(hash, color) {
      this.SET_BACKGROUND_COLOR(color)
      this.$emit('generation-id', hash)
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  max-width: 250px;
  border-radius: 15px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 44%),
    0 0px 0 1px rgb(10 10 10 / 30%);
  cursor: pointer;
  &:hover {
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 44%),
      0 0px 0 1px rgb(10 10 10 / 70%);
    .content {
      .generation-number,
      .content-name,
      .generation-title {
        color: rgba(23, 23, 27, 1);
        transition: 0.6s;
      }
    }
  }
  .card-content {
    padding: 0.5rem 1.5rem;
    background-image: url('assets/images/poke_ball_icon.svg');
    background-repeat: no-repeat;
    background-position: center;
  }
  .content {
    h2:not(:first-child) {
      margin-top: 0;
    }
    .name {
      display: flex;
      flex-direction: column;
      align-items: center;
      .content-name {
        font-size: 1rem;
        display: inline-flex;
        color: rgba(23, 23, 27, 0.6);
      }
      .generation-title {
        font-size: 2.7rem;
        margin-bottom: 100px;
        color: rgba(23, 23, 27, 0.6);
      }
    }
    .generation-number {
      font-size: 9rem;
      line-height: 6rem;
      font-weight: 700;
      position: absolute;
      bottom: 0;
      left: 0;
      color: rgba(23, 23, 27, 0.6);
    }
  }
}

@media (max-width: 960px) {
  .card {
    max-width: 100%;
  }
}
</style>
