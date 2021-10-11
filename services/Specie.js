const resource = 'pokemon'

export default ($axios) =>({
  getPokemons() {
    return $axios.get(`${resource}`)
  },

  getPokemonByName(name) {
    return $axios.get(`${resource}/${name}`)
  },
})
