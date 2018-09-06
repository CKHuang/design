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
    <div :class="[`ide-code`,ide_code_spread ? `spread` : ``]">
        <div class="ide-code-header">
            <div :class="[`trigger-item`,ide_code_actived_tab ==`template` ? `actived` : ``]" @click="SET_IDE_CODE_TOGGLE(`template`)">
                <Icon type="md-code-working" />
                <span class="pad-l-sm">编辑模版代码</span>
            </div>
            <div :class="[`trigger-item`,ide_code_actived_tab ==`script` ? `actived` : ``]" @click="SET_IDE_CODE_TOGGLE(`script`)">
                <Icon type="logo-javascript" />
                <span class="pad-l-sm">编辑脚本代码</span>
            </div>
            <div :class="[`trigger-item`,ide_code_actived_tab ==`style` ? `actived` : ``]" @click="SET_IDE_CODE_TOGGLE('style')">
                <Icon type="logo-css3" />
                <span class="pad-l-sm">编辑样式代码</span>
            </div>
        </div>
        <div class="ide-code-body">
            <Codemirror :value="code_actived" :options="ide_code_editor_options" @change="handleCodeChange"></Codemirror>
        </div>
    </div>
</template>

<script>
    import { codemirror } from 'vue-codemirror-lite'
    import { mapGetters, mapMutations } from 'vuex'
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
            ...mapGetters([
                `ide_code_editor_options`,
                `ide_code_actived_tab`,
                `ide_code_spread`,
                `code_actived`
            ])
        },
        methods: {
            ...mapMutations([
                `SET_IDE_CODE_TOGGLE`
            ]),
            async handleCodeChange(code) {
                this.$emit('on-code-change',{code});
            }
        }
    }
</script>

