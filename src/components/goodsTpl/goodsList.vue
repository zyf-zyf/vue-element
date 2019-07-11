<template>
    <div>
        <el-card>
            <el-table :data="tableData"  highlight-current-row>
                <el-table-column prop="goods_name" label="名称" width="140" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="brandName" label="品牌" width="120">
                </el-table-column>
                <el-table-column prop="goods_color" label="颜色">
                </el-table-column>
            </el-table>
            <page :total="total" :page="page" :size="size" @handlepagechange="handlePageChange" @handleSizeChange="handleSizeChange"></page>
        </el-card>
    </div>
</template>
<script>
import page from '../commonComponents/page'
export default {
    components: {
        page
    },
    data() {
        return {
            page: 1,
            size: 10,
            total: null,
            tableData: []
        }
    },
    mounted() {
        console.log(this.$server, 'hell')
        console.log(this.formate(1562653376639, 'yyyy/MM/dd hh:mm:ss'))
        console.log(this.$server.goodsControlApi.getGoodsList)
        this.getGoodsList()
    },
    methods: {
        // 获取商品数据
        getGoodsList() {
            var params= {"data":{"page":this.page,"size":this.size,"condition":"1","orderby":"1","soldout":"","storeNo":"S00000001","searchName":"","relationUnify":"1","barCode":"","isTemp":""}}
            this.$server.goodsControlApi.getGoodsList(params).then(res => {
                this.total= res.total
                this.tableData= res.data
            })
            // .catch(err => {
            //     console.log(err)
            // })
        },
        handlePageChange(page) {
            this.page= page
            this.getGoodsList()
        },
        handleSizeChange(size) {
            this.size= size
            this.getGoodsList()
        }
    }
}
</script>

