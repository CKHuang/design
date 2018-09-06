<style scoped>
.ide-sidermenu-bottom {
    position: absolute;
    bottom: 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
}
</style>

<template>
    <Menu :width="width" :active-name="value_" @on-select="handleChangeActived">
        <MenuItem v-for="(item,index) in this.config_" :key="index" :name="item.name" class="menu-item" style="padding:14px 12px;" >
            <Tooltip 
                :content="item.label"
                transfer
                placement="right"
            >
                <Icon :type="item.icon" size="18" />
            </Tooltip>
        </MenuItem>
        <div v-if="slotBottom" class="ide-sidermenu-bottom">
            <slot name="bottom" ></slot>
        </div>
       
    </Menu>
</template>

<script>
    export default {
        name: `IDESideMenu`,
        props: {
            value: {
                type: String,
                default: ``
            },
            config: {
                type: Array,
                default: () => ([])
            },
            width: {
                type: String,
                default: `40px`
            }
        },
        data() {
            return {
                value_: this.value,
                config_: this.config,
                slotBottom: false,
            }
        },
        mounted() {
            this.slotBottom =  this.$slots.bottom !== undefined;
        },
        methods: {
            handleChangeActived(name) {
                this.value_ = name;
                this.$emit('input',this.value_)
            }
        }
    }
</script>

