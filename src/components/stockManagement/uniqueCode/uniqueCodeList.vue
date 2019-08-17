<template>
    <div id="unique-list">
        <el-card>
            <div style="margin: 10px 0;">
                <el-form v-model="form" label-width="80px" label-position="left" class="demo-form-inline" inline>
                    <el-form-item label="入库单号">
                        <el-input size="small" v-model="form.list" placeholder="请输入出库单号"></el-input>
                    </el-form-item>
                    <el-form-item label="仓库名称">
                        <el-select size="small">
                            <option value="1">仓库一</option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='创建时间'>
                        <el-date-picker
                        size="small"
                        v-model="form.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                       >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary" icon="el-icon-download" @click="handleClcikDownLoad">查询</el-button>
                        <el-button size="small" type="primary" icon="el-icon-download" @click="isShow=true">重置</el-button>
                    </el-form-item>
                </el-form>
   
            </div>
            <el-table :data="tableData" style="width:100%">
                <el-table-column  label="入库单号"></el-table-column>
                <el-table-column  label="供应商"></el-table-column>
                <el-table-column  label="入库时间"></el-table-column>
                <el-table-column  label="SKU数"></el-table-column>
                <el-table-column  label="入库数量"></el-table-column>
                <el-table-column  label="仓库名称"></el-table-column>
                
                <el-table-column  label="操作" width="80"></el-table-column>
            </el-table>
            <page :total="total" :page="page" :size="size" @handlepagechange="handlePageChange" @handleSizeChange="handleSizeChange"></page>
        </el-card>
        <uniqueCodeDetail v-if="isShow" :isShow="isShow" @cancelShow="cancelShow"></uniqueCodeDetail>
    </div>
</template>
<script>
    import page from '../../commonComponents/page'
    import uniqueCodeDetail from './uniqueCodeDetail'
    export default {
        components: {
            page,
            uniqueCodeDetail
        },
        data() {
            return {
                page: 1,
                size: 10,
                total: null,
                tableData: [],
                form: {
                    list: '',
                    storeNo: '',
                    time: []
                },
                isShow: false
            }
        },
        methods: {
            handlePageChange(page) {
                this.page= page
            },
            handleSizeChange(size) {
                this.size= size
            },
            cancelShow(title) {
                this.isShow= title
            }
        }
    }
</script>
<style lang="less" scoped>
     .demo-form-inline {
        display: flex;
        justify-content: space-between;
        .el-input__inner {
            padding: 0 5px!important; 
        }
        .el-form-item  {
            margin-right: 0 !important;

        }
    }
</style>
