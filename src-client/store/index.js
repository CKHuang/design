import Vue from 'vue'
import Vuex from 'vuex'
import ide from './modules/ide/index'
import code from './modules/code'
import nodeTree from './modules/nodeTree'
import props from './modules/props'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        ide,
        code,
        nodeTree,
        props
    }
})