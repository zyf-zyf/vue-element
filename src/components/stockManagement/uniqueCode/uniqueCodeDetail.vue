<template>
    <div>
        <el-dialog
        title="唯一码详情"
        :visible.sync="dialogVisible"
        id="unique-dialog"
        :before-close="handleClose">
            <div style="display: flex; justify-content: flex-end; margin: 10px 0;">
                <el-button size="small" type="primary" icon="el-icon-download" @click="handleClcikDownLoad">下载</el-button>
            </div>
            <el-table :data="tableData" style="width:100%">
                <el-table-column  label="品牌"></el-table-column>
                <el-table-column  label="商品名称"></el-table-column>
                <el-table-column  label="颜色"></el-table-column>
                <el-table-column  label="尺码"></el-table-column>
                <el-table-column  label="款号"></el-table-column>
                <el-table-column  label="吊牌价"></el-table-column>
                <el-table-column  label="商品条码"></el-table-column>
                <el-table-column  label="产品等级"></el-table-column>
                <el-table-column  label="检验员"></el-table-column>
            </el-table>
            <page :total="total" :page="page" :size="size" @handlepagechange="handlePageChange" @handleSizeChange="handleSizeChange"></page>
        </el-dialog>
    </div>
</template>
<script>
    import page from '../../commonComponents/page'
    export default {
        components: {
            page
        },
        props: ['isShow'],
        computed: {
            dialogVisible: {
                get() {
                    return this.isShow
                },
                set() {

                }
            },
        },
        data() {
            return {
                page: 1,
                size: 10,
                total: null,
                tableData: [],
                
            }
        },
        methods: {
            handlePageChange(page) {
                this.page= page
            },
            handleSizeChange(size) {
                this.size= size
            },
            handleClose(done) {
                this.$confirm('确认关闭？').then(_ => {
                    this.$emit('cancelShow', false)
                }).catch(_ => {});
            },
        }
    }
</script>
