<template>
    <div>
        <el-card class="elcard">
            <div>
                <h3>材料</h3>
            </div>
            <div class="table-search">
                <el-input v-model="searchName" type="text" size="small" placeholder="请输入查询条件" suffix-icon="el-icon-search" style="width: 300px;"></el-input>
                <el-button size="small" type="primary"  @click="dialogVisible=true" icon="el-icon-plus">添加材料</el-button>
            </div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column
                prop="date"
                label="ID"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="LOGO"
                >
                </el-table-column>
                <el-table-column
                prop="address"
                label="材料">
                </el-table-column>
                <el-table-column
                prop="address"
                label="修改时间">
                </el-table-column>
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <span @click="handleEdit(scope.row)">
                            <el-icon class="el-icon-edit" ></el-icon>
                        </span>
                        <span @click="handleDel(scope.row)">
                            <el-icon class="el-icon-delete"></el-icon>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 添加颜色属性 -->
        <el-dialog
        title="材料编辑"
        :visible.sync="dialogVisible"
        width="400px"
        :before-close="handleClose">
            <el-form label-width="100px">
                <el-form-item label='材料名称:'>
                    <el-input size="small" type='text' v-model="form.colorName" ></el-input>
                    <small>创建多个材料，请用逗号分隔不同材料</small>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogVisible = false">提交保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import upload from '../../../commonComponents/upload'
    export default {
        components: {
            upload
        },
        data() {
            return {
                searchName: '',
                tableData: [],
                dialogVisible: false,
                form: {
                    colorName: ''
               
                },
                uploadtype: 'less',

            }
        },
        methods: {
            handleClose() {
                this.$confirm('确认关闭？').then(_ => {
                    this.dialogVisible= false
                }).catch(_ => {});
            },
            changeMaterialImg(val) {
                this.form.imageList= val
            },
            delImg(idx){
                this.form.imageList.splice(idx, 1)
            },
            handleEdit(scope) {
                this.dialogVisible= true
            },
            handleDel() {

            }
        }
    }
</script>

