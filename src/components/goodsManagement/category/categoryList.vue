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
                row-key="id"
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                prop="id"
                label="ID"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="date"
                label="一级类目"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="children.date1"
                label="二级类目"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="date2"
                label="三级类目"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="创建时间"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="修改时间">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [
                {
                    id: 1,
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    id: 2,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    id: 3,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    children: [
                        {
                            id: 31,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }, {
                            id: 32,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }
                    ]
                }, {
                    id: 4,
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ]

        }
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
           


        }
    }
}
</script>

