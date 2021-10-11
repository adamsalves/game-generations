import Vue from 'vue'

Vue.filter('formatIdNumber', (value) => {
  return value > 9 ? value : `00${value}`
})
