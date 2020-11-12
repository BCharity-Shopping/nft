import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wax: "",
  },
  mutations: {
    storeWax (state, waxObj) {
      state.wax = waxObj
    },
    clearWax (state) {
      state.wax = ""
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getWax: state => {
      return state.wax
    }
  }
})
