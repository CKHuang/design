import Vue from 'vue'
import Vuex from 'vuex'
import ide from './modules/ide'
import code from './modules/code'

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        ide,
        code
    }
})