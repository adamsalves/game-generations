const resource = 'generation'

export default ($axios) =>({
  getGenerations() {
    return $axios.get(`${resource}`)
  },
})

