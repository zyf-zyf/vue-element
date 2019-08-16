<template>
    <div id="category">
        <el-card>
            <div style="margin-bottom: 30px;">
                <el-button type="primary" size="small" icon="el-icon-plus">新建类目</el-button>
                <el-dropdown trigger="click" @command="handleCommand">
                    <el-button plain size="small" >批量上传/下载<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command= 'input'>导入Excel</el-dropdown-item>
                        <el-dropdown-item command= 'out'>导出Excel</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        
            <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="categoryId"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                prop="categoryId"
                label="ID"
                >
                </el-table-column>
                <el-table-column
                prop="categoryName"
                label="名称"
                >
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="创建时间"
                >
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
                <el-table-column label="操作" width="80">
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
        <el-dialog
        title="类目编辑"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose" v-model="form">
            <el-form label-width="100px">
                <el-form-item label='类目名称:'>
                    <el-input size="small" type='text' v-model="form.categoryName" ></el-input>
                    <small>创建多个类目，请用逗号分隔不同类目</small>
                </el-form-item>
                <el-form-item label="上级类目:">
                    <el-cascader
                    v-model="form.parentCode"
                    :options="form.categoryList"
                    @change="handleChange"></el-cascader>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="handleSubmit">提交保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [],
            dialogVisible: false,
            form: {
                categoryName: '',
                parentCode: ''
            },
            categoryList: [],

        }
    },
    mounted() {
        this.getCategoryList()
    },
    methods: {
        handleCommand(val) {
            console.log(val)
            val == 'input' ? this.importExcel() : val == 'out' ? this.downLoadExcel() : ''
        },
        importExcel() {
            alert('导入Excel')
        },
        downLoadExcel() {
            alert('导出Excel')
        },
        /**获取商品类目列表 */
        getCategoryList() {
            this.$server.goodsControlApi.getCategoryList().then(res => {
                this.tableData= res.data
            }).catch(err => {

            })
        },
        handleEdit() {},
        handleDel() {},
        handleSubmit() {},
        handleChange() {}
    }
}
</script>

