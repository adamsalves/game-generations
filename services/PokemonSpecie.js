const resource = 'pokemon-species'

export default ($axios) =>({
  getPokemonSpecieByName(name) {
    return $axios.get(`${resource}/${name}`)
  },
})
