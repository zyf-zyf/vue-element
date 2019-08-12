<template>
    <div id="space-attribute">
        <el-card class="elcard">
            <div>
                <h3>尺码</h3>
            </div>
            <div class="table-space-search">
                <el-button size="small" type="primary" icon="el-icon-plus" @click="handleClickCreateSpace">添加尺码</el-button>
            </div>
            <div class="table-box">
                <div class="left">
                    <el-table
                    class="render-table"
                    :data="lefttableData"
                    :header-cell-style="getRowClass"
                    style="width: 100%">
                        <el-table-column prop="spaceName" label="全部分类" width="100"></el-table-column>
                        <el-table-column >
                            <template slot="header" slot-scope="scope">
                                <span @click="handleAdd(scope.row)">
                                    <el-icon class="el-icon-plus" style="font-weight: 900; color: #fff" ></el-icon>
                                </span>
                            </template>
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
                </div>
                <div class="right">
                    <el-table
                    :data="lefttableData"
                    style="width: 100%">
                        <el-table-column prop="spaceName" label="ID"></el-table-column>
                        <el-table-column prop="spaceName" label="尺码名称"></el-table-column>
                        <el-table-column prop="spaceName" label="分组"></el-table-column>
                        <el-table-column prop="spaceName" label="修改时间"></el-table-column>
                        
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
                </div>
            </div>
        </el-card>
        <!-- 添加尺码 -->
        <el-dialog
        title="尺码编辑"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
            <el-form v-model="spaceForm" label-width="100px" label-position="left">
                <el-form-item label='颜色名称:'>
                    <el-input size="small" type='text' v-model="spaceForm.spaceName" clearable></el-input>
                    <!-- <small>创建多个颜色，请用逗号分隔不同颜色</small> -->
                </el-form-item>
                <el-form-item label="选择类别:">
                    <el-select size="small" v-model="spaceForm.categoryName" filterable placeholder="请选择类别" style="width: 100%">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogVisible = false">提交保存</el-button>
            </span>
        </el-dialog>
        <!-- 添加类别 -->
        <el-dialog
        title="分类编辑"
        :visible.sync="dialogVisibleCategory"
        width="40%"
        :before-close="handleClose">
            <el-form v-model="categoryForm" label-width="100px" label-position="left">
                <el-form-item label='类别名称:'>
                    <el-input size="small" type='text' v-model="categoryForm.categoryName" clearable></el-input>
                    <!-- <small>创建多个颜色，请用逗号分隔不同颜色</small> -->
                </el-form-item> 
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisibleCategory = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogVisibleCategory = false">提交保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            lefttableData: [
                {
                    spaceName: '上衣'
                },
                {
                    spaceName: '裤子'
                }
            ],
            dialogVisible: false, // 尺码
            spaceForm: {
                spaceName: '',
                categoryName: ''
            },
            options: [
                {
                    label: '类别一',
                    value: '1'
                }
            ],
            categoryForm: {

            },
            dialogVisibleCategory: false, // 类别
        }
    },
    methods: {
         getRowClass ({row, column, rowIndex, columnIndex}) {
             console.log(rowIndex, 'rowIndex')
             console.log(columnIndex, 'columnIndex')
            if (rowIndex === 0 && columnIndex === 1) {
                return 'color: red; cursor: pointer; '
            } else {
                return ''
            }
        },
        handleEdit() {
            alert('编辑')
        },
        handleDel() {
            alert('删除')
        },
        handleAdd(scope) {
            this.dialogVisibleCategory= true
        },
        handleClose() {
            this.$confirm('确认关闭？').then(_ => {
                this.dialogVisible= false
            }).catch(_ => {});
        },
        handleClickCreateSpace() {
            this.dialogVisible= true
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

