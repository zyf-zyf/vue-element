<template>
    <div>
        <el-card class="elcard">
            <div>
                <h3>品牌</h3>
            </div>
            <div class="table-search">
                <el-input v-model="searchName" type="text" size="small" placeholder="请输入查询条件" suffix-icon="el-icon-search" style="width: 300px;"></el-input>
                <el-button size="small" type="primary"  @click="dialogVisible=true">添加品牌</el-button>
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
                label="品牌">
                </el-table-column>
                <el-table-column
                prop="address"
                label="描述">
                </el-table-column>
                <el-table-column
                prop="address"
                label="修改时间">
                </el-table-column>
                <el-table-column
                label="操作">
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 添加品牌属性 -->
        <el-dialog
        title="品牌编辑"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
            <el-form label-width="100px">
                <el-form-item label='品牌名称:'>
                    <el-input size="small" type='text' v-model="form.brandName" ></el-input>
                    <small>创建多个类目，请用逗号分隔不同类目</small>
                </el-form-item>
                <el-form-item label="描述:">
                    <el-input type="textarea" :rows="4" v-model="form.detail"></el-input>
                </el-form-item>
                <el-form-item label="上传LOGO:">
                    <upload :materialImg="form.imageList" @handleDelImg="delImg" @changeMaterialImg="changeMaterialImg" maxLength= "1" uploadtype="less" ></upload>
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
                    brandName: '',
                    imageList: []
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
            }
        }
    }
</script>

