<template>
    <div id="space-attribute">
        <el-card class="elcard">
            <div>
                <h3>尺码</h3>
            </div>
            <div class="table-space-search">
                <el-button size="small" type="primary" icon="el-icon-plus">添加尺码</el-button>
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
            ]
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
            alert('添加')
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

