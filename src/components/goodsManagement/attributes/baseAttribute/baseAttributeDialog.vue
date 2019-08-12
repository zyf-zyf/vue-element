<template>
    <div id="base-attribute-dialog">
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="dialogForm" label-width="80px" label-position="left">
                <el-form-item v-for="(item, index) in labelList" :key="index" :label="item.label">
                    <el-input v-model="item.value" clearable @change="handleChangeValue"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: ['title', 'isShow', 'labelList'],
        data() {
            return {
                dialogFormVisible: this.props.isShow,
                dialogForm: {
                    name: ''
                },
                labelList: this.props.labelList
            }
        },
        methods: {
            handleChangeValue() {

            }
        }
    }
</script>
<style lang="less" scoped>

</style>
