const resource = 'generation'

export default ($axios) =>({
  getGenerations() {
    return $axios.get(`${resource}`)
  },

  getGererationById(id) {
    return $axios.get(`${resource}/${id}`)
  },
})
