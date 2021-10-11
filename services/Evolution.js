const resource = 'evolution-chain'

export default ($axios) =>({
  getEvolution(id) {
    return $axios.get(`${resource}/${id}`)
  },
})
