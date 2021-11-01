export const state = () => ({
  backgroundColor: null,
  pokemon: {},
  training: {},
  weaknesses: {}
})

export const mutations = {
  SET_BACKGROUND_COLOR(state, payload) {
    state.backgroundColor = payload
  },
  SET_POKEMON(state, payload) {
    state.pokemon = payload
  },
  SET_TRAINING(state, payload) {
    state.training = payload
  },
  SET_WEAKNESSES(state, payload) {
    state.weaknesses = payload
  },
}

export const actions = {
  SET_BACKGROUND_COLOR({ commit }, color) {
    commit('SET_BACKGROUND_COLOR', color)
  },
  SET_POKEMON({ commit }, pokemon) {
    commit('SET_POKEMON', pokemon)
  },
  SET_TRAINING({ commit }, training) {
    commit('SET_TRAINING', training)
  },
  SET_WEAKNESSES({ commit }, weaknesses) {
    commit('SET_WEAKNESSES', weaknesses)
  },
}

export const getters = {
  GET_BACKGROUND_COLOR: (state) => {
    return state.backgroundColor
  },
  GET_POKEMON: (state) => {
    return state.pokemon
  },
  GET_TRAINING: (state) => {
    return state.training
  },
  GET_WEAKNESSES: (state) => {
    return state.weaknesses
  },
}
