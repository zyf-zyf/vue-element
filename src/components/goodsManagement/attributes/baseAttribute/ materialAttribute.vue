<template>
    <div>
       
        <div class="table-search">
            <el-input v-model="searchName" type="text" size="small" placeholder="请输入查询条件" suffix-icon="el-icon-search" style="width: 300px;" @keyup.enter.native="handleChangeSearch" @input="handleChangeSearch"></el-input>
            <el-button size="small" type="primary"  @click="handleAddBtn" icon="el-icon-plus">添加材料</el-button>
        </div>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column
            prop="propertyValueId"
            label="ID"
            >
            </el-table-column>
            <el-table-column prop="valueCode" label="编码"></el-table-column>
            <el-table-column
            prop="propertyValue"
            label="材料">
            </el-table-column>
            <el-table-column
            prop="gmtCreate"
            label="创建时间">
            </el-table-column>
             <el-table-column
            prop="gmtModified"
            label="修改时间">
            </el-table-column>
            <el-table-column
            label="操作" width="80">
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
    
        <!-- 添加颜色属性 -->
        <el-dialog
        title="材料编辑"
        :visible.sync="dialogVisible"
        width="400px"
        :before-close="handleClose">
            <el-form label-width="100px">
                <el-form-item label='材料名称:'>
                    <el-input size="small" type='text' v-model="form.propertyValue" ></el-input>
                    <small>创建多个材料，请用逗号分隔不同材料</small>
                </el-form-item>
                <el-form-item label="选择类别:" v-if="type == 'add'">
                    <el-select size="small" v-model="form.propertyGroupId" filterable placeholder="请选择类别" style="width: 100%">
                        <el-option
                        v-for="item in category1List"
                        :key="item.categoryId"
                        :label="item.categoryName"
                        :value="item.categoryId">
                        </el-option>
                    </el-select>
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
        props: ['propertyId'],

        data() {
            return {
                searchName: '',
                tableData: [],
                dialogVisible: false,
                form: {
                    propertyValue: '',
                    propertyGroupId: ''
                },
                type: '',
                category1List: []
             

            }
        },
        mounted() {
            this.getGroupListByPropertyId()
            this.getTopCategoryList()
        },
        methods: {
            handleChangeSearch() {
                this.getGroupListByPropertyId()
            },
            /**获取类目第一级 */
            getTopCategoryList() {
                this.$server.goodsControlApi.getTopCategoryList().then(res => {
                    this.category1List= res.data
                })
            },
            /**获取属性值 */
            getGroupListByPropertyId() {
                try{
                    let query= {
                        content: this.searchName
                    }
                    this.$server.goodsControlApi.getAttributeVal(this.propertyId, query).then(res => {
                        this.tableData= res.data
                    })
                }catch(error){this.$paramsError(error)}
            },
            handleClose() {
                this.$confirm('确认关闭？').then(_ => {
                    this.dialogVisible= false
                }).catch(_ => {});
            },
            handleAddBtn() {
                this.type="add"
                this.form= {}
                this.dialogVisible= true
            },
            handleSubmit() {
                try{
                    if(this.type == 'add') {
                        let params={
                            propertyId: this.propertyId,
                            propertyValue: this.form.propertyValue,
                            propertyGroupId: this.form.propertyGroupId,
                        }
                        this.$server.goodsControlApi.addAttributeVal(params).then(res => {
                            this.dialogVisible= false
                            this.getGroupListByPropertyId(this.propertyId)
                            this.form= {}
                        }).catch()
                    }else if(this.type == 'edit') {
                        let params={
                            propertyValueId: this.form.propertyValueId,
                            propertyValue: this.form.propertyValue
                        }
                        this.$server.goodsControlApi.editAttributeVal(params).then(res => {
                            this.dialogVisible= false
                          
                            this.getGroupListByPropertyId(this.propertyId)
                        }).catch()
                    }
                    
                }catch(error) {this.$paramsError(error)}
            },
            handleEdit(scope) {
                this.form= {}
                this.type= 'edit'
                this.form= scope
                this.dialogVisible= true
            },
            handleDel(scope) {
                try{
               
                    this.$confirm('确定删除该材料？').then(_ => {
                        this.$server.goodsControlApi.delAttributeVal(scope.propertyValueId).then(res => {
                            this.getGroupListByPropertyId()
                        }).catch()
                    }).catch()
                }catch(error){this.$paramsError(error)}
            }
        }
    }
</script>

