<template>
    <div id="goods">
        <el-card>
            <div class="goods">
                <el-form :inline="true" :model="formData" class="demo-form-inline goos-form" label-width="75px">
                    <el-form-item v-for="(item, index) in labelItem" :key="index" :label="item.label">
                        <el-input v-if="item.type == 'input'" size="small" v-model="item.value" placeholder="请填写" @input="handleChangeVal(Object.keys(formData)[index],item.value)"></el-input>
                        <el-select size="small" v-if="item.type=='select'" v-model="item.value" placeholder="请选择" @change="handleChangeVal(Object.keys(formData)[index],item.value)">
                            <el-option v-for="itemo in item.list" :key="itemo.value" :label="itemo.label" :value="itemo.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="采购价格:">
                        <div class="qjbox">
                            <el-input size="small" v-model="formData.buyPrice1" placeholder=""></el-input>
                            <span> - </span>
                            <el-input size="small" v-model="formData.buyPrice2" placeholder=""></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="创建日期:">
                        <el-date-picker
                        size="small"
                        v-model="formData.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="width: 465px">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="采购价格:">
                        <div class="qjbox">
                            <el-input size="small" v-model="formData.buyPrice1" placeholder=""></el-input>
                            <span> - </span>
                            <el-input size="small" v-model="formData.buyPrice2" placeholder=""></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="显示字段:">
                        <el-checkbox-group v-model="formData.checkList"  @change="handleChengeGroup">
                            <el-checkbox style="color: #666" v-for="(item, index) in checkLabel" :key="index" :label="item" @change="(checked) => handleCheckChange(checked,index)"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
            </div>
            <div class="button-box">
                <div class="btn-left">
                    <el-button size="small" type="primary" icon="el-icon-plus" @click="addShow= true">新建商品</el-button>
                    <el-dropdown trigger="click" @command="handleCommandExcel">
                        <el-button plain size="small" >批量上传/下载
                            <i class="el-icon-arrow-down el-icon--right"></i>
                            <el-tooltip class="item" effect="dark" placement="top">
                                <span slot="content">
                                    上传前下载
                                    <a href="" style='color: red' download="模版文件">模版</a>
                                </span>
                                <i class="el-icon-warning-outline waring" style="color: red"></i>
                            </el-tooltip>
                        </el-button>
                        
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command= 'input'>导入Excel</el-dropdown-item>
                            <el-dropdown-item command= 'out'>导出Excel</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown trigger="click" @command="handleCommandStatus">
                        <el-button plain size="small" >批量启用/停用
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command= 'input'>启用</el-dropdown-item>
                            <el-dropdown-item command= 'out'>停用</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button size="small" plain>批量删除</el-button>
                </div>
                <div class="btn-right">
                    <el-button size="small" type="primary">查 询</el-button>
                    <el-button size="small" @click="handleReset">重 置</el-button>
                </div>
                
            </div>
            <el-table :data="tableData"  highlight-current-row :cell-style="cellStyle" :header-cell-style="cellStyle"> 
                <el-table-column type="selection" width="55" fixed></el-table-column>
                <el-table-column label="商品图"  fixed>
                    <template slot-scope="scope">
                         <el-image style="width: 40px; height: 40px;" :src="scope.row.goods_pic" fit="cover"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="brandName" label="SPU编号" width="120" show-overflow-tooltip fixed></el-table-column>
                <el-table-column prop="brandName" label="SKU编号" width="120" show-overflow-tooltip fixed></el-table-column>
                <el-table-column prop="brandName" label="品牌" width="120" show-overflow-tooltip fixed></el-table-column>
                <el-table-column v-for="(item, index) in tableLabel" :key="index" :prop="item.prop" :label="item.label" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="brandName" label="状态" width="100" ></el-table-column>
                <el-table-column prop="brandName" label="创建时间" width="150" show-overflow-tooltip ></el-table-column>
                <el-table-column prop="brandName" label="修改时间" width="150" show-overflow-tooltip ></el-table-column>
            </el-table>
            <page :total="total" :page="page" :size="size" @handlepagechange="handlePageChange" @handleSizeChange="handleSizeChange"></page>
        </el-card>
        <el-dialog
        title="基本属性"
        :visible.sync="addShow"
        width="50%"
        top="2vh"
        >
            <addNewGoods></addNewGoods>
        </el-dialog>
    </div>
</template>
<script>
import page from '../../commonComponents/page'
import addNewGoods from './addNewGoods'
export default {
    components: {
        page,
        addNewGoods
    },
    data() {
        return {
            page: 1,
            size: 10,
            total: null,
            tableData: [],
            tableLabel: [
                {prop: 'name', label: '一级类目'},
                {prop: 'name', label: '二级类目'},
                {prop: 'name', label: '三级类目'},
                {prop: 'name', label: '商品名称'},
                {prop: 'name', label: '颜色'},
                {prop: 'name', label: '尺码'},
                {prop: 'name', label: '采购价'},
                {prop: 'name', label: '吊牌价'},
                {prop: 'name', label: '会员价'},
                {prop: 'name', label: '状态'},
                {prop: 'name', label: '创建时间'},
                {prop: 'name', label: '修改时间'},
            ],
            formData: {
                spuNum: '',
                skuNum: '',
                goodsName: '',
                brandName: '',
                category1: '',
                category2: '',
                category3: '',
                buyPrice1: '',
                buyPrice2: '',
                time: '',
                checkList: []
            },
            checkLabel: ['风格', '季节', '人群', '功能', '版型', '图案', '流行', '上市时间'],
            select1: '',
            select2: '',
            labelItem: [
                {label: 'SPU编号:', value: '', type: 'input'},
                {label: 'SKU编号:', value: '', type: 'input'},
                {label: '商品名称:', value: '', type: 'input'},
                {label: '品牌名称:', value: '', list: [{label: '品牌1', value: 'pin1'}], type: 'select'},
                {label: '一级类目:', value: '', list: [{label: '品牌1', value: 'pin1'}], type: 'select'},
                {label: '二级类目:', value: '', list: [{label: '品牌1', value: 'pin1'}], type: 'select'},
                {label: '三级类目:', value: '', list: [{label: '品牌1', value: 'pin1'}], type: 'select'},
       
            ],
            addShow: false
        }
    },
    mounted() {
        console.log(this.$server, 'hell')
        console.log(this.formate(1562653376639, 'yyyy/MM/dd hh:mm:ss'))
        
        console.log(this.$server.goodsControlApi.getGoodsList)
        this.getGoodsList()
    },
    render(createElement) {
        return createElement('i', {
            class: '123'
        }, '123')
    },
    methods: {
        // 获取商品数据
        getGoodsList() {
            try {
                let params= {
                    "data":{"page":this.page,
                        "size":10,
                        "condition":"1",
                        "orderby":"1",
                        "soldout":"",
                        "storeNo":"S00000001",
                        "searchName":"",
                        "relationUnify":"1",
                        "barCode":"",
                        "isTemp":""
                    }
                }

                this.$server.goodsControlApi.getGoodsList(params).then(res => {
                    this.total= res.total
                    this.tableData= res.data
                }).catch(err => {
                    console.log(err)
                })
            }catch(error) {

                this.$paramsError(error.message)
            }
           
      
        },
        handlePageChange(page) {
            try {
                this.page= page
                this.getGoodsList()
            }
            catch(err) {
                this.$paramsError(err.message)
            }
        },
        handleSizeChange(size) {
            this.size= size
            this.getGoodsList()
        },
        handleChangeVal(label, val) {
           return this.formData[label]= val
        },
        cellStyle({row, column, rowIndex, columnIndex}) {
     
            if(columnIndex == 4) {
                return 'border-right: 2px solid #999'
            }
        },
        // 批量上传/下载
        handleCommandExcel() {},
        // 批量停用/启用
        handleCommandStatus() {},
        handleCheckChange(val,index) {
            console.log(index, val)

        },
        handleChengeGroup(val) {
            this.tableLabel=[
                {prop: 'name', label: '一级类目'},
                {prop: 'name', label: '二级类目'},
                {prop: 'name', label: '三级类目'},
                {prop: 'name', label: '商品名称'},
                {prop: 'name', label: '颜色'},
                {prop: 'name', label: '尺码'},
                {prop: 'name', label: '采购价'},
                {prop: 'name', label: '吊牌价'},
                {prop: 'name', label: '会员价'},
               
            ]
            var arr=[], arr1=[];
            console.log(val)
            val.forEach(item => {
               arr1.push({
                   prop: 'brandName',
                   label: item
               })
            })
            console.log(val)
            arr=this.tableLabel.concat(arr1)
            this.tableLabel= arr
        },
        // 重置按钮
        handleReset() {
            this.formData.checkList= []
            this.handleChengeGroup()
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
        .qjbox {
            width: 150%;
            display: flex;
            flex-wrap: nowrap;
            span {
                width: 20px;  
                text-align: center;
            }
            .el-input {
                width: 80px
            }
        }
        .el-input , .el-select{
            width: 180px;
        }
        .el-form-item {
            margin-right: 20px;
            margin-bottom: 20px;
        }
    }
    
    .button-box,.btn-left, .btn-right {
        height: 32px;
        display: flex;
        align-items: center;
       
        .el-button, .el-select {
            margin-right: 10px;
        }
        
    }
    .button-box {
        justify-content: space-between;
        margin: 10px 0;
    }
    .warning-select {
        position: relative;
        .waring {
            position: absolute;
            right: 20px;
            top: 8px;
        }
    }
 
</style>
