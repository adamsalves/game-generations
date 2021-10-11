const resource = 'type'

export default ($axios) =>({
  getTypeByName(name) {
    return $axios.get(`${resource}/${name}`)
  },
})
