<template>
    <div id="space-attribute">
        <el-card class="elcard">
            <div>
                <h3>尺码</h3>
            </div>
            <div class="table-space-search">
                <el-button size="small" type="primary" >添加尺码</el-button>
            </div>
            <div class="table-box">
                <div class="left">
                    <el-table
                    :data="lefttableData"
                    :header-cell-style="getRowClass"
                    style="width: 100%">
                        <el-table-column prop="spaceName" label="全部尺码" width="100"></el-table-column>
                        <el-table-column class="btn-header" label="+" width="80">
                            <template></template>

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
                            <template></template>

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
       // justify-content: space-between;
        .left {
            flex: 1;
        }
        .right{
            flex: 4
        }
    }
</style>

