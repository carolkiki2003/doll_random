export const state = () => ({
  browser: {
    width: 0,
    height: 0,
    orientation: null,
    scrollTop: 0,
    scrollLeft: 0
  },
  mobile: false
})

export const mutations = {
  SET_AGENT(state, data) {
    state.mobile = data
  },
  SET_WINDOW(state, data) {
    state.browser.width = data.width
    state.browser.height = data.height
    state.browser.orientation = data.orientation
  },
  SET_SCROLL(state, data) {
    state.browser.scrollTop = data.scrollTop
    state.browser.scrollLeft = data.scrollLeft
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
