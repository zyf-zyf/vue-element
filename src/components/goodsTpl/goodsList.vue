<template>
    <div>
        <el-card>
            <div class="goods">
                <el-form :inline="true" :model="formData" class="demo-form-inline goos-form">
                    <el-form-item v-for="(item, index) in labelItem" :key="index" :label="item.label">
                        <el-input v-if="item.type == 'input'" size="small" v-model="item.value" placeholder="请填写" @input="handleChangeVal(Object.keys(formData)[index],item.value)"></el-input>
                        <el-select size="small" v-if="item.type=='select'" v-model="item.value" placeholder="请选择" @change="handleChangeVal(Object.keys(formData)[index],item.value)">
                            <el-option
                            v-for="itemo in item.list"
                            :key="itemo.value"
                            :label="itemo.label"
                            :value="itemo.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
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
            tableData: [],
            formData: {
                spuNum: '',
                skuNum: '',
                goodsName: '',
                brandName: '',
                category1: '',
                category2: '',
                category3: '',
            },
            labelItem: [
                {label: 'SPU编号:', value: '', type: 'input'},
                {label: 'SKU编号:', value: '', type: 'input'},
                {label: '商品名称:', value: '', type: 'input'},
                {label: '品牌名称:', value: '', list: [{label: '品牌1', value: 'pin1'}], type: 'select'},
                {label: '一级类目:', value: '', list: [{label: '品牌1', value: 'pin1'}], type: 'select'},
                {label: '二级类目:', value: '', list: [{label: '品牌1', value: 'pin1'}], type: 'select'},
                {label: '三级类目:', value: '', list: [{label: '品牌1', value: 'pin1'}], type: 'select'},
       
            ]
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
        },
        handleChangeVal(label, val) {
            console.log(label, 'label')
            console.log(val)
           return this.formData[label]= val
        }
    }
}
</script>

<style lang="less" scoped>
    .goos-form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .el-input--suffix .el-input__inner {
            padding-right: 15px !important;
        }
    }
</style>
