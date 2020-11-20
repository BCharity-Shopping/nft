import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wax: "",
    blocksBehind: 3,
    expireSeconds: 1200,
    makerMarketplace: "l5oaw.wam",
    takerMarketplace: "l5oaw.wam",
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
    },
    getBlocksBehind: state => {
      return state.blocksBehind
    },
    getExpireSeconds: state => {
      return state.expireSeconds
    },
    getMakerMarketplace: state => {
      return state.makerMarketplace
    },
    getTakerMarketplace: state => {
      return state.takerMarketplace
    },
  }
})
