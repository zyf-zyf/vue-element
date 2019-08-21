<template>
    <div id="unique-list">
        <el-card>
            <div style="margin: 10px 0;">
                <el-form v-model="form" label-width="80px" label-position="left" class="demo-form-inline" inline>
                    <el-form-item label="入库单号">
                        <el-input style="min-width: 200px;" size="small" clearable v-model="form.stockinOrderId" placeholder="请输入出库单号"></el-input>
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
                        <el-button size="small" type="primary" icon="el-icon-search" @click="handleClcikSearch">查询</el-button>
                        <el-button size="small" type="primary" icon="el-icon-refresh" @click="handleClickReset">重置</el-button>
                    </el-form-item>
                </el-form>
   
            </div>
            <el-table :data="tableData" style="width:100%">
                <el-table-column prop="stockinOrderId" label="入库单号" show-overflow-tooltip></el-table-column>
                <el-table-column label="入库类型">
                    <template slot-scope="scope">
                        <el-tag size="small" :type="scope.row.stockinType == 1 ? 'info' : scope.row.stockinType == 2 ? '' : scope.row.stockinType == 3 ? 'success' : scope.row.stockinType == 4 ? 'danger' : scope.row.stockinType == 9 ? 'warning' : ''   ">
                            {{scope.row.stockinType == 1 ? '采购入库' : scope.row.stockinType == 2 ? '调拨入库' : scope.row.stockinType == 3 ? '盘点入库' : scope.row.stockinType == 4 ? '退货入库' : scope.row.stockinType == 9 ? '其他入库' : '' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="supplierId" label="供应商"></el-table-column>
                <el-table-column prop="gmtStockin" label="入库时间"></el-table-column>
                <el-table-column prop="totalSku" label="SKU数量"></el-table-column>
                <el-table-column prop="totalGoods" label="入库数量"></el-table-column>
                <el-table-column prop="warehouseId" label="仓库名称"></el-table-column>
                <el-table-column label="入库单状态">
                    <template slot-scope="scope">
                        <el-tag size="small" :type="scope.row.isCompleted == 1 ? 'success' : 'danger'">
                            {{scope.row.isCompleted == 1 ? '已完成' : scope.row.isCompleted ==  0 ? '未完成' : '其他'}}
                        </el-tag>
                    </template>
                </el-table-column>
                
                <el-table-column  label="操作" width="80">
                    <template slot-scope="scope">
                       
                        <el-dropdown size="small" type="text" trigger="click" placement="bottom-start">
                            <span class="el-dropdown-link" style="font-size: 12px">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item command="a" @click.native="handleClickCheck(scope.row)" >查看</el-dropdown-item>
                                <el-dropdown-item command="b" @click.native="handleClickDownload(scope.row)" >下载</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <page :total="total" :page="page" :size="size" @handlepagechange="handlePageChange" @handleSizeChange="handleSizeChange"></page>
        </el-card>
        <uniqueCodeDetail v-if="isShow" :stockinId="stockinId" :isShow="isShow" @cancelShow="cancelShow"></uniqueCodeDetail>
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
                    stockinOrderId: '',
                    storeNo: '',
                    time: []
                },
                stockinId: '',
                isShow: false
            }
        },
        mounted() {
            this.getStockInList()
        },
        methods: {
            /**获取入库单列表 */
            getStockInList() {
                try {
                    let params= {
                        page: this.page,
                        size: this.size,
                        dateFrom: this.form.time.length > 0 ? this.formate(this.form.time[0], 'yyyy-MM-dd') : '',
                        dateTo: this.form.time.length > 0 ? this.formate(this.form.time[1], 'yyyy-MM-dd') : '',
                        stockinOrderId: this.form.stockinOrderId
                    }
                    this.$server.stockControlApi.getStockInList(params).then(res => {
                        this.tableData= res.data
                        this.total= res.total
                    })
                }catch(error) {this.$paramsError(error)}
            },
            /**条件查询 */
            handleClcikSearch() {
                this.getStockInList()
            },
            /**查看 */
            handleClickCheck(scope) {
                this.stockinId= scope.stockinId
                this.isShow= true
            },
            /**重置 */
            handleClickReset() {
                this.form.stockinOrderId= ''
                this.form.time= []
                this.getStockInList()
            },
            /**下载 */
            handleClickDownload(scope) {
                this.$server.stockControlApi.downLoadStockInBystockInId(scope.stockinId).then(res => {
                    console.log(res)
                })
            },
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
