import Vue from 'vue'
import Vuex from 'vuex'
import userAgent from './userAgent'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    SET_LOADING(state, value) {
      state.loading = !!value
    }
  },
  actions: {},
  modules: {
    userAgent
  }
})
