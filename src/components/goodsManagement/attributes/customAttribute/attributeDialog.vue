<template>
    <div>
        <el-dialog
        :title="valueTitle"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        >
            <el-form  label-width="100px">
                <el-form-item :label="diaLabelName +':'">
                    <el-input type="text" size="small" v-model="diaName" @change="handleChange"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="$emit('cancelShow', false)">取 消</el-button>
                <el-button size="small" type="primary" @click="handleClcikAddItem">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: ['type','valueTitle', 'name', 'labelName', 'isShow'],
        computed: {
            dialogVisible: {
                get() {
                    return this.isShow
                },
                set() {

                }
            },
            diaLabelName: {
                get() {
                    return this.labelName
                },
                set() {

                }
            }
        },
       
        data() {
            return {
                diaName: this.name || '',
            }
        },
        mounted() {
            console.log(this.name, 'name')
        },
        methods: {
            handleClcikAddItem() {
                if(this.type == 'item') {
                    this.$emit('handleClcikAddItem', this.diaName)
                    this.$emit('cancelShow', false)
                    this.diaName= ''
                }else if(this.type == 'itemValue') {
                    this.$emit('handleClcikAddItemValue', this.diaName)
                    this.$emit('cancelShow', false)
                    this.diaName= ''
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？').then(_ => {
                    this.$emit('cancelShow', false)
                }).catch(_ => {});
            },
            handleChange() {
                this.$emit('changeTitle', this.diaName)
            }
        }
    }
</script>
