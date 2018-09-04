<style scoped>
.ide-box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
}



/*
 * 布局相关
 */
.ide-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.ide-layout-top {
    position: relative;
    height: 40px;
    z-index: 200;
}
.ide-layout-main {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: space-between;
}
.ide-layout-main .left-side {
    position: relative;
    color: #5B6B73;
    background: white;
    display: flex;
    font-size: 12px;
    box-shadow: 0 2px 30px 0 rgba(213,213,213,0.50);
    z-index: 4;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    flex-direction: row;
    flex-wrap:nowrap;
    width: 240px;
}
.ide-layout-main .left-side .menu-box {
    height: 100%;
}
.ide-layout-main .left-side .menu-box .menu-item {
    padding: 14px 12px;
}
.ide-layout-main .content {
    flex: 1;
    display: flex;
    position: relative;
    flex-direction: column;
}
.ide-layout-main .right-side {
    width: 240px;
    background-color: #fff;
    box-shadow: 0 2px 30px 0 rgba(213,213,213,0.50);
    z-index: 120;
}
.ide-layout-main .content .content-panel {
    flex: auto;
    position: relative;
}
.ide-layout-main .content .content-panel-view {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: scroll;
}
.ide-layout-main .content .bottom-panel {
    width: 100%;
    height: 30px;
    background-color: #f2f2f2;
}
.ide-layout-main .content .bottom-panel .panel-header {
    height: 20px;
    width: 100%;
    position: relative;
}



/*
 * 项相关
 */
.bottom-panel .panel-header .trigger-btn {
    padding: 0px 10px;

}

.props-form {
    padding: 0px 10px;
}



/*
 * 画板
 */
.ide-box .draw-board {
    position: absolute;
    /* top: 0; */
    /* left: 0; */
    /* right: 0; */
    /* bottom: 0; */
    display: -ms-flexbox;
    /* display: flex; */
    -ms-flex-pack: center;
    /* justify-content: center; */
    -ms-flex-align: center;
    /* align-items: center; */
    overflow: scroll;
    padding: 400px;
}
.ide-box .canvas-viewport {
    width: 1440px;
    height: 2440px;
    background-color: #fff;
    position: relative;
    border: 1px dashed #e1e1e1;
    /* border-color: #CDB; */
    box-shadow: 0 2px 30px 0 rgba(213,213,213,0.50);
}


/*
 * 控件列表
 */
.component-list {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
}
.component-item {
    width: 101px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid transparent;
    border: 1px solid #EEE;
    margin-top: -1px;
    margin-left: -1px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}
.component-item:hover {
    background-color: #f9f9f9;
}
.component-item:active {
    background-color: #f2f2f2;
}
</style>

<template>
    <div class="ide-box">
        <div class="ide-layout">
            <div class="ide-layout-top">
                <Toolbar></Toolbar>
            </div>
            <div class="ide-layout-main">
                
                <div class="left-side">
                        <Menu 
                            width="40px"
                            active-name="1-2"
                            mode="vertical"
                            class="menu-box"
                            :active-name="menuActived"
                            
                        >   
                            <MenuItem name="1" class="menu-item">
                                <Tooltip 
                                    content="控件"
                                    transfer
                                    placement="right"
                                >
                                    <Icon type="ios-apps-outline" size="18" />
                                </Tooltip>
                            </MenuItem>
                            <MenuItem name="2" class="menu-item">
                                <Tooltip 
                                    content="页面"
                                    transfer
                                    placement="right"
                                >
                                    <Icon type="ios-paper-outline" size="18" />
                                </Tooltip>
                            </MenuItem>
                            <MenuItem name="3" class="menu-item">
                                <Tooltip 
                                    content="组件树"
                                    transfer
                                    placement="right"
                                >
                                    <Icon type="ios-list" size="18" />
                                </Tooltip>
                            </MenuItem>
                        </Menu>
                    <div class="component-box" v-if="menuActived == '1'">
                        <h5>布局</h5>
                        <div class="component-list">
                            <div class="component-item">
                                <Row>Row</Row>
                            </div>
                            <div class="component-item">
                                <Col>Col</Col>
                            </div>
                           
                        </div>
                        <h5>表单</h5>
                        <div class="component-list">
                            <div class="component-item">
                                <Button size="small">按钮</Button>
                            </div>
                            <div class="component-item">
                                <Switch />
                            </div>
                            <div class="component-item">
                                <Select size="small">
                                    <Option>option 1</Option>
                                    <Option>option 2</Option>
                                </Select>
                            </div>
                            <div class="component-item">
                                <Checkbox>选项框</Checkbox>
                            </div>
                            <div class="component-item">
                                <CheckboxGroup>
                                    <Checkbox label="twitter">
                                        <Icon type="logo-twitter"></Icon>
                                       
                                    </Checkbox>
                                    <Checkbox label="facebook">
                                        <Icon type="logo-facebook"></Icon>
                                        
                                    </Checkbox>
                                </CheckboxGroup>
                            </div>
                            <div class="component-item">
                                <Button size="small">按钮</Button>
                            </div>
                            <div class="component-item">
                                <Switch />
                            </div>
                            <div class="component-item">
                                <Select size="small">
                                    <Option>option 1</Option>
                                    <Option>option 2</Option>
                                </Select>
                            </div>
                            <div class="component-item">
                                <Checkbox>选项框</Checkbox>
                            </div>
                            <div class="component-item">
                                <CheckboxGroup>
                                    <Checkbox label="twitter">
                                        <Icon type="logo-twitter"></Icon>
                                       
                                    </Checkbox>
                                    <Checkbox label="facebook">
                                        <Icon type="logo-facebook"></Icon>
                                        
                                    </Checkbox>
                                </CheckboxGroup>
                            </div>
                            <div class="component-item">
                                <Button size="small">按钮</Button>
                            </div>
                            <div class="component-item">
                                <Switch />
                            </div>
                            <div class="component-item">
                                <Select size="small">
                                    <Option>option 1</Option>
                                    <Option>option 2</Option>
                                </Select>
                            </div>
                            <div class="component-item">
                                <Checkbox>选项框</Checkbox>
                            </div>
                            <div class="component-item">
                                <CheckboxGroup>
                                    <Checkbox label="twitter">
                                        <Icon type="logo-twitter"></Icon>
                                       
                                    </Checkbox>
                                    <Checkbox label="facebook">
                                        <Icon type="logo-facebook"></Icon>
                                        
                                    </Checkbox>
                                </CheckboxGroup>
                            </div>
                            <div class="component-item">
                                <Button size="small">按钮</Button>
                            </div>
                            <div class="component-item">
                                <Switch />
                            </div>
                            <div class="component-item">
                                <Select size="small">
                                    <Option>option 1</Option>
                                    <Option>option 2</Option>
                                </Select>
                            </div>
                            <div class="component-item">
                                <Checkbox>选项框</Checkbox>
                            </div>
                            <div class="component-item">
                                <CheckboxGroup>
                                    <Checkbox label="twitter">
                                        <Icon type="logo-twitter"></Icon>
                                       
                                    </Checkbox>
                                    <Checkbox label="facebook">
                                        <Icon type="logo-facebook"></Icon>
                                        
                                    </Checkbox>
                                </CheckboxGroup>
                            </div>
                            
                        </div>
                        <!-- <Tabs 
                            value="name1"
                            size="small"
                        >
                            <TabPane label="内容" name="name1">
                                <h5>基础</h5>
                                <ul class="components-list">
                                    <li class="componet-item">
                                        <Button>按钮</Button>
                                    </li>
                                    <li class="componet-item">
                                        <Input placeholder="输入框"></Input>
                                    </li>
                                    <li class="componet-item">
                                        <Switch />
                                    </li>
                                </ul>
                               
                            </TabPane>
                            <TabPane label="内容2" name="name2">内容2</TabPane>
                            <TabPane label="内容3" name="name3">内容3</TabPane>
                        </Tabs> -->

                    </div>
                </div>
                <div class="content">
                    <div class="content-panel">
                        <div class="content-panel-view">
                            <div class="draw-board">
                                <div class="canvas-viewport"></div>
                            </div>
                        </div>
                    </div>
                    <div class="bottom-panel">
                        <div class="panel-header">
                            <span class="trigger-item">
                                <Icon type="ios-code-working" />
                                编辑代码
                            </span>
                            
                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <Tabs 
                        value="name1"
                        size="small"
                    >
                        <TabPane label="属性" name="props">
                            <Form class="props-form">
                                <FormItem >
                                   <Select
                                        transfer
                                        placeholder="样式"
                                        size="small"
                                   >
                                        <Option value="beijing">New York</Option>
                                        <Option value="shanghai">London</Option>
                                        <Option value="shenzhen">Sydney</Option>
                                    </Select>
                                    
                                </FormItem>
                                <FormItem label="禁用">
                                    <Switch size="small" placeholder="样式" />
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane label="样式" name="styles">样式</TabPane>
                        <TabPane label="事件" name="events">事件</TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Toolbar from './Toolbar/index.vue'

    export default {
        name: `IDE`,
        components: {
            Toolbar: Toolbar
        },
        data() {
            return {
                menuActived: '1'
            }
        }
    }
</script>