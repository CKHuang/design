import Vue from 'vue'
import Vuex from 'vuex'
import ide from './modules/ide/index'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ide
    }
})