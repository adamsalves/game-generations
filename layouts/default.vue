<template>
  <div class="poke-app">
    <Header />
    <main class="main">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
html, body {
  font-family: 'Exo', 'Source Sans Pro', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.poke-app {
  background-image: url('assets/images/container_bg.png');
  background-repeat: repeat;
  .main {
    max-width: 960px;
    margin: 15px auto;
    min-height: 100vh;
    padding-top: 100px;
  }
}

</style>
