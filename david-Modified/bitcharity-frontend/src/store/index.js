import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        wax: "",
        Immutable_data:[]
    },
    mutations: {
        storeWax (state, waxObj){
            state.wax=waxObj
            console.log(state.wax);
        },
        clearWax(state) {
            state.wax=""
        },

        storeImmutableData(state, Immutable_data){
            state.Immutable_data=Immutable_data
        }
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
        }
    }
})