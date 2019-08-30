<template>
    <div id="space-attribute">
        <div class="table-search">
             <el-input v-model="searchName" type="text" size="small" placeholder="请输入查询条件" suffix-icon="el-icon-search" style="width: 300px;" @keyup.enter.native="handleChangeSearch" @input="handleChangeSearch" clearable></el-input>
            <el-button size="small" type="primary" icon="el-icon-plus" @click="handleClickCreateSpace">添加尺码</el-button>
        </div>
        <div class="table-box">
            <!-- <div class="left">
                <el-table
                class="render-table"
                :data="lefttableData"
                :header-cell-style="getRowClass"
                highlight-current-row
                style="width: 100%">
                    <el-table-column prop="groupName" label="全部分类" show-overflow-tooltip ></el-table-column>
                    <el-table-column width="80" >
                        <template slot="header" slot-scope="scope">
                            <span @click="handleAddAttributeGroup(scope.row)">
                                <el-icon class="el-icon-plus" style="font-weight: 900; color: #fff" ></el-icon>
                            </span>
                        </template>
                        <template slot-scope="scope">
                            <span @click="handleEditAttributeGroup(scope.row)">
                                <el-icon class="el-icon-edit" ></el-icon>
                            </span>
                            <span @click="handleDelAttributeGroup(scope.row)">
                                <el-icon class="el-icon-delete"></el-icon>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div> -->
            <div class="right">
                <el-table
                :data="righttableData"
                style="width: 100%">
                    <el-table-column prop="propertyValueId" label="ID"></el-table-column>
                    <el-table-column prop="valueCode" label="编码"></el-table-column>
                    <el-table-column prop="propertyValue" label="尺码名称"></el-table-column>
                    <el-table-column prop="groupName" label="分组"></el-table-column>
                    <el-table-column prop="gmtCreate" label="创建时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="gmtModified" label="修改时间" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <span @click="handleEditAttributeValBtn(scope.row)">
                                <el-icon class="el-icon-edit" ></el-icon>
                            </span>
                            <span @click="handleDelAttributeVal(scope.row)">
                                <el-icon class="el-icon-delete"></el-icon>
                            </span>
                        </template>

                    </el-table-column>
                </el-table>
            </div>
        </div>
       
        <!-- 添加尺码 -->
        <el-dialog
        title="尺码编辑"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
            <el-form v-model="spaceForm" label-width="100px" label-position="left">
                <el-form-item label='尺码名称:'>
                    <el-input size="small" type='text' v-model="spaceForm.propertyValue" clearable></el-input>
                </el-form-item>
                <el-form-item label="选择类别:" v-if="type == 'add'">
                    <el-select size="small" v-model="spaceForm.propertyGroupId" filterable placeholder="请选择类别" style="width: 100%">
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
                <el-button size="small" type="primary" @click="handleAddAttributeVal">提交保存</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
    props: ['propertyId'],
    data() {
        return {
            righttableData: [],
            dialogVisible: false, // 尺码
            spaceForm: {
                propertyValue: '',
                propertyGroupId: ''
            },
            categoryForm: {
                groupName: ''
            },
            category1List: [],
            dialogVisibleCategory: false, // 类别
            type: '', // 操作类型 add添加、edit编辑
            propertyGroupId: '',
            propertyValueId: '',
            searchName: ''
        }
    },
    mounted() {
        this.getAttributeVal()
        this.getTopCategoryList()
    },
    methods: {
        /**查询 */
        handleChangeSearch() {
            this.getAttributeVal()
        },
        /**获取类目第一级 */
        getTopCategoryList() {
            this.$server.goodsControlApi.getTopCategoryList().then(res => {
                this.category1List= res.data
            })
        },
        getAttributeVal() {
            try{
                let query= {
                    content: this.searchName
                }
                this.$server.goodsControlApi.getAttributeVal(this.propertyId, query).then(res => {
                    this.righttableData= res.data
                }).catch(err => {})
            }catch(error){this.$paramsError(error)}
        },
        handleClickCreateSpace() {
            this.dialogVisible= true
            this.type= 'add'
            this.spaceForm= {}
        },
        /**编辑尺码 */
        handleEditAttributeValBtn(scope) {
            this.propertyValueId= scope.propertyValueId
            this.spaceForm=scope
            this.dialogVisible= true
            this.type= 'edit'
        },
        /**删除尺码 */
        handleDelAttributeVal(scope) {
            try{
                this.$confirm('确定删除该尺码？').then(_ => {
                    this.$server.goodsControlApi.delAttributeVal(scope.propertyValueId).then(res => {
                        this.getAttributeVal()
                    }).catch()
                }).catch()
            }catch(error){this.$paramsError(error)}
        },
        /**添加尺码 */
        handleAddAttributeVal() {
            try{    
                if(this.type== 'add') {
                    let params= {
                        propertyGroupId: this.spaceForm.propertyGroupId,
                        propertyValue: this.spaceForm.propertyValue,
                        propertyId: this.propertyId
                    }
                    this.$server.goodsControlApi.addAttributeVal(params).then(res => {
                        this.dialogVisible= false
                        this.getAttributeVal()
                       
                    }).catch(err=> {})
                }else  {
                    let params= {
                        propertyValue: this.spaceForm.propertyValue,
                        propertyValueId: this.propertyValueId
                    }
                    this.$server.goodsControlApi.editAttributeVal(params).then(res => {
                        this.dialogVisible= false
                        this.getAttributeVal()
                    }).catch(err=> {})
                }
            }catch(error){this.$paramsError(error)}
        },
        getRowClass ({row, column, rowIndex, columnIndex}) {
            if (rowIndex === 0 && columnIndex === 1) {
                return 'color: red; cursor: pointer; '
            } else {
                return ''
            }
        },
        handleClose() {
            this.$confirm('确认关闭？').then(_ => {
                this.dialogVisible= false
                this.dialogVisibleCategory= false
            }).catch(_ => {});
        }
    }
}
</script>
<style lang="less" scoped>
    .table-space-search {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }
    .table-th-msg {
        height: 23px;
        line-height: 23px;
    }
    .table-box {
        display: flex;
        .left {
            flex: 1;
            margin-right: 10px;
        }
        .right{
            flex: 4
        }
        .el-icon-edit, .el-icon-delete {
            font-weight: 600;
            cursor: pointer;
            padding-right: 10px;
        }
        .el-icon-edit:hover, .el-icon-delete:hover{
            color: #ff7068;
        }
    }
</style>

