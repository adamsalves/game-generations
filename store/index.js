export const state = () => ({
  backgroundColor: null,
})

export const mutations = {
  SET_BACKGROUND_COLOR(state, payload) {
    state.backgroundColor = payload
  },
}

export const actions = {
  SET_BACKGROUND_COLOR({ commit }, color) {
    commit('SET_BACKGROUND_COLOR', color)
  },
}

export const getters = {
  GET_BACKGROUND_COLOR: (state) => {
    return state.backgroundColor
  },
}
