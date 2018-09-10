import Vue from 'vue'
import Vuex from 'vuex'
import ide from './modules/ide/index'
import code from './modules/code'

Vue.use(Vuex);

console.log('--->ide',ide);

export default new Vuex.Store({
    modules: {
        ide,
        code
    }
})