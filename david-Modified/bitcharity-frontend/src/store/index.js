import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        wax: "",
        blocksBehind: 3,
        expireSeconds: 1200,
    },
    mutations: {
        storeWax (state, waxObj){
            state.wax=waxObj
            console.log(state.wax);
        },
        clearWax(state) {
            state.wax=""
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
        getImmutableData: state=>{
            return state.Immutable_data
        },
        getBlocksBehind: state => {
            return state.blocksBehind
          },
        getExpireSeconds: state => {
            return state.expireSeconds
        }
    }
})