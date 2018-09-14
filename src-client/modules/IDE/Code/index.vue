<style scoped>
.ide-code {
    height: 30px;
    background: #fff;
}
.ide-code.spread {
    height: 100%;
}
.ide-code-header {
    height: 30px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    box-shadow: rgba(39, 54, 78, 0.11) 0px -2px 30px 0px;
    position: relative;
    border-bottom: 1px dotted #e6e6e6;
}
.ide-code-header .trigger-item {
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 0px 10px;
    height: 100%;
    align-items: center;
    cursor: pointer;
}
.ide-code-header .trigger-item:hover,
.ide-code-header .trigger-item.actived  {
    background-color: #f2f2f2;
}
.ide-code-header .trigger-item:active {
    background-color: #e1e1e1;
}
</style>


<template>
    <div :class="[`ide-code`,spread ? `spread` : ``]">
        <div class="ide-code-header">
            <div :class="[`trigger-item`,actived ==`template` ? `actived` : ``]" @click="handletToggle(`template`)">
                <Icon type="md-code-working" />
                <span class="pad-l-sm">编辑模版代码</span>
            </div>
            <div :class="[`trigger-item`,actived ==`script` ? `actived` : ``]" @click="handletToggle(`script`)">
                <Icon type="logo-javascript" />
                <span class="pad-l-sm">编辑脚本代码</span>
            </div>
            <div :class="[`trigger-item`,actived ==`style` ? `actived` : ``]" @click="handletToggle('style')">
                <Icon type="logo-css3" />
                <span class="pad-l-sm">编辑样式代码</span>
            </div>
        </div>
        <div class="ide-code-body">
            <Codemirror :value="actived" :options="editorOptions" @change="handleCodeChange"></Codemirror>
        </div>
    </div>
</template>

<script>
    import { codemirror } from 'vue-codemirror-lite'
    import { mapGetters, mapMutations } from 'vuex'
    import storeTypes from '../../../store/modules/ide/types'
    require('codemirror/mode/javascript/javascript')
    require('codemirror/mode/css/css');
    require('codemirror/mode/htmlmixed/htmlmixed');

    /**
     * @name IDECode
     * @description IDE代码控制模块
     * @property {boolean} spread true表示展开，false表示收起来
     * @event IDECode#on-code-change
     *  @property {string} code 编辑后的代码
     */
    export default {
        name: `IDECode`,
        components: {
            Codemirror: codemirror
        },
        computed: {
            ...mapGetters({
                "spread": storeTypes.state.ui[`code.spread`],
                "actived": storeTypes.state.ui[`code.actived`],
                "editorOptions": storeTypes.getters[`ui.code.editor.options`]
            })
        },
        methods: {
            ...mapMutations({
                "handletToggle": storeTypes.mutations[`toggle.ui.code.spread`]
            }),
            async handleCodeChange(code) {
                this.$emit('on-code-change',{code});
            }
        }
    }
</script>

