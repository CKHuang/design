

const state = {
    code_style: `.header{color:#ccc}\r\nbody{background:#eee}`,
    code_template: `<h1>H1的标签</h1>`,
    code_script: `export default {\r\n}`,
    code_nodetree: []
}

const getters = {
    code_actived(state,getters,rootState,rootGetters) {
        return state[`code_${rootGetters.ide_code_actived_tab}`] 
    }
}

export default {
    state,
    getters
}