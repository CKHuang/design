<template>
    <Form ref="form" :model="form" :rules="validator" :label-width="120">
        <FormItem label="项目名称" prop="name">
            <Input v-model="form.name" placeholder="请填写项目名称，只能是英文和数组的组合"></Input>
        </FormItem>
        <FormItem label="项目说明" prop="desc">
            <Input v-model="form.desc" placeholder="请说明这是什么项目"></Input>
        </FormItem>
        <FormItem label="项目类型">
            <Select v-model="form.type">
                <Option :value="1" :key="1">PC</Option>
            </Select>
        </FormItem>
        <FormItem>
            <Button type="primary" :loading="submiting" @click="handleSubmit">{{ submiting ? `提交中...`: `提交`}}</Button>
        </FormItem>
    </Form>
</template>

<script>
    
    /**
     * @description 项目的表单
     */
    export default {
        name: `ProjectForm`,
        props: {
            projectKey: {
                type: String,
                default: ``
            }
        },
        data() {
            return {
                form: {},
                type: this.projectKey == ``
                    ? this.types.ADD
                    : this.types.EDIT,
                submiting: false,
                validator: {
                    name: [this.util.validator.project.name()],
                    desc: [this.util.validator.project.desc()]
                }
            }
        },
        async created() {
            if (this.type === this.types.ADD) {
                this.resetForm();
            } else {
                try {
                    const project = await this.models.project.queryProject(this.projectKey);
                    console.log('--->project',project);
                } catch (e) {
                    this.$Message.error(`获取key为${this.key}的项目信息失败`);
                }
            }
        },
        methods: {
            async handleSubmit() {
                console.log('-->this',this.validator,this.util.validator.project.name())
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        await this.handleSend();
                    } else {
                        this.$Message.error(`表单填写有误`);
                    }
                });
            },
            async handleSend() {
                this.submiting = true;
                try {
                    await this.models.project.insert({
                        name: this.form.name,
                        type: this.form.type,
                        desc: this.form.desc
                    })
                    this.$Message.success(`成功创建项目`);
                    this.submiting = false;
                    this.resetForm();
                } catch (e) {
                    this.submiting = false;
                    this.models.showErrorMessage(e,this)
                }
            },
            resetForm() {
                Object.assign(this.form,{
                    name: ``,
                    type: 1,
                    desc: ``
                })
            }
        }
    }
</script>