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
                <el-table-column prop="brandName"  label="品牌"></el-table-column>
                <el-table-column prop="goodsName"  label="商品名称"></el-table-column>
                <el-table-column prop="specName" label="规格"></el-table-column>
                <el-table-column prop="goodsPrice" label="吊牌价"></el-table-column>
                <el-table-column prop="barCode" label="商品条码" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="productCode" label="产品编码"></el-table-column> -->
                <el-table-column prop="skuCode" label="SKU编码" show-overflow-tooltip></el-table-column>
                <el-table-column prop='goodsQty' label="商品数量" width="100"></el-table-column>
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
        props: ['isShow', 'stockinId'],
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
        mounted() {
            this.getStockInDetail()
        },
        methods: {
            /**获取入库单详情 */
            getStockInDetail() {
                this.$server.stockControlApi.getStockInDeatil(this.stockinId).then(async res => {
                    console.log(res, 'res')
                    this.total= res.total
                    this.tableData= res.data
                })
            },
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
            /**下载 */
            handleClcikDownLoad() {}
        }
    }
</script>
