<template>
    <div id="goods">
        <el-card>
            <div class="goods">
                <el-form :inline="true" :model="formData" class="demo-form-inline goos-form" label-width="80px">
                    <el-form-item label="SPU编号">
                        <el-input size="small" placeholder="商品SPU编号" v-model="formData.spuCode" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="SKU编号">
                        <el-input size="small" placeholder="商品SKU编号" v-model="formData.skuCode" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <el-input size="small" placeholder="商品名称" v-model="formData.goodsName" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="品牌名称">
                        <el-select  size="small"  v-model="formData.brandId" placeholder="请选择品牌" @change="handleChangeVal">
                            <el-option v-for="item in brandList" :key="item.brandId" :label="item.brandName" :value="item.brandId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="一级类目">
                        <el-select  size="small"  v-model="formData.categoryId1" placeholder="选择一级类目" @change="handleChangeValTop">
                            <el-option v-for="item in category1List" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId+','+item.categoryCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="二级类目">
                        <el-select  size="small"  v-model="formData.categoryId2" placeholder="选择二级类目" @change="handleChangeValNext">
                            <el-option v-for="item in category2List" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId+','+item.categoryCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="三级类目">
                        <el-select  size="small"  v-model="formData.categoryId3" placeholder="选择三级类目" @change="handleChangeVal">
                            <el-option v-for="item in category3List" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="采购价格:">
                        <div class="qjbox">
                            <el-input size="small" v-model="formData.purchasePriceFrom" placeholder="" clearable></el-input>
                            <span> - </span>
                            <el-input size="small" v-model="formData.purchasePriceTo" placeholder="" clearable></el-input>
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
                       >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="会员价格:">
                        <div class="qjbox">
                            <el-input size="small" v-model="formData.memberPriceFrom" placeholder="" clearable></el-input>
                            <span> - </span>
                            <el-input size="small" v-model="formData.memberPriceTo" placeholder="" clearable></el-input>
                        </div>
                    </el-form-item>
                    <div style="width: 100%;"></div>
                    <!-- <el-form-item label="显示字段:">
                        <el-checkbox-group v-model="formData.checkList">
                            <el-checkbox style="color: #666" v-for="(item, index) in CustomerCateGoryList" :key="index" :label="item.propertyName" @change="(checked) => handleCheckChange(checked,index)"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item> -->
                </el-form>
            </div>
            <div class="button-box">
                <div class="btn-left">
                    <el-button size="small" type="primary" icon="el-icon-plus" @click="addShow=true">新建商品</el-button>
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
                    <el-button size="small" plain @click="handleGoodsById">批量删除</el-button>
                </div>
                <div class="btn-right">
                    <el-button size="small" type="success" @click="handleClickSearch">查 询</el-button>
                    <el-button size="small" @click="handleReset">重 置</el-button>
                   
                </div>
                
            </div>
            <el-table :data="tableData"  highlight-current-row :cell-style="cellStyle" :header-cell-style="cellStyle" @selection-change="handleSelectionChange"> 
                <el-table-column type="selection" width="55" fixed></el-table-column>
                <el-table-column label="商品图"  fixed>
                    <template slot-scope="scope">
                         <el-image style="width: 40px; height: 40px;" :src="scope.row.imageUrl" fit="cover"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="SPU编号" width="120"  show-overflow-tooltip fixed>
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="editGoods(scope.row)">{{scope.row.spuCode}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="skuCode" label="SKU编号" width="120" show-overflow-tooltip fixed></el-table-column>
                <el-table-column prop="brandName" label="品牌" width="120" show-overflow-tooltip fixed></el-table-column>
                <el-table-column prop="categoryName1" label="一级类目" width="120" ></el-table-column>
                <el-table-column prop="categoryName2" label="二级类目" width="120" ></el-table-column>
                <el-table-column prop="categoryName3" label="三级类目" width="120" ></el-table-column>
                <el-table-column prop="goodsName" label="商品名称" width="150" show-overflow-tooltip ></el-table-column>
                <el-table-column prop="goodsColor" label="颜色" width="100" ></el-table-column>
                <el-table-column prop="goodsSize" label="尺码" width="100" ></el-table-column>
                <el-table-column prop="purchasePrice" label="采购价" width="100" ></el-table-column>
                <el-table-column prop="tagPrice" label="吊牌价" width="100" ></el-table-column>
                <el-table-column prop="memberPrice" label="会员价" width="100" ></el-table-column>
                <el-table-column prop="isLocked" label="状态" width="100" >
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.isLocked ===1 ? 'success' : 'danger'">
                            {{scope.row.isLocked === 1 ? '启用' : '停用'}}
                        </el-tag>
                    </template>
                    
                </el-table-column>
                <el-table-column label="创建时间" width="150" show-overflow-tooltip >
                    <template slot-scope="scope">
                        {{formate(scope.row.gmtCreate, 'yyyy/MM/dd hh:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column  label="修改时间" width="150" show-overflow-tooltip >
                    <template slot-scope="scope">
                        {{ scope.row.gmtModified ? formate(scope.row.gmtModified, 'yyyy/MM/dd hh:mm:ss') : '----'}}
                    </template>
                </el-table-column>
            </el-table>
            <page :total="total" :page="page" :size="size" @handlepagechange="handlePageChange" @handleSizeChange="handleSizeChange"></page>
        </el-card>
  
        <addNewGoods v-if="addShow" :addShow="addShow" @cancelShow="cancelShow" @getGoodsList="getGoodsList"></addNewGoods>
<!--     
        <el-dialog
        title="编辑商品"
        :visible.sync="editShow"
        class='edit-goods-dialog'
        top="2vh"
        :close-on-click-modal="false"	
        > -->
            <editGoodsDetails v-if='editShow' :editShow="editShow" :goodsId="goodsId" @cancelShow="cancelShow" @getGoodsList="getGoodsList"></editGoodsDetails>
         
        <!-- </el-dialog> -->
  
    </div>
</template>
<script>
import page from '../../commonComponents/page'
import addNewGoods from './addNewGoods'
import editGoodsDetails from './editGoodsDetails'
import goodsBarcodesGroup from './goodsBarcodesGroup'

export default {
    components: {
        page,
        addNewGoods,
        editGoodsDetails,
        goodsBarcodesGroup,
  
    },
    data() {
        return {
       
            page: 1,
            size: 10,
            total: null,
            tableData: [],
            CustomerCateGoryList: [], /**自定义属性 */
            formData: {
                spuCode: '',
                skuCode: '',
                goodsName: '',
                brandId: '',
                categoryId1: '',
                categoryId2: '',
                categoryId3: '',
                purchasePriceFrom: '',
                purchasePriceTo: '',
                memberPriceFrom: '',
                memberPriceTo: '',
                time: '',
                checkList: []
            },
            category1List: [],
            category2List: [],
            category3List: [],
            brandList: [],
            select1: '',
            select2: '',
            addShow: false,
            editShow: false,
            deleteGoodsIds: []
        }
    },
    mounted() {
        this.getCustomPropertyList()
        this.getGoodsList()
        this.getBrandList()
        this.getTopCategoryList()
    },

   
    methods: {
        /**获取商品品牌属性 */
        getBrandList() {
            try {
                let query= {
                    page: this.page,
                    size: this.size
                }
                this.$server.goodsControlApi.getBrandList(query).then(res => {
                    this.brandList= res.data
                }).catch(err => {
                    console.log(err)
                })
            }catch(error) {
                this.$paramsError(error.message)
            }
        },
        /**获取第一级类目 */
        getTopCategoryList() {
            this.$server.goodsControlApi.getTopCategoryList().then(res => {
                this.category1List= res.data
            })
        },
        handleChangeValTop() {
            this.$server.goodsControlApi.getNextCategoryList(this.formData.categoryId1.split(',')[1]).then(res => {
                this.category2List= res.data
            }).catch()
        },
        handleChangeValNext() {
            this.$server.goodsControlApi.getNextCategoryList(this.formData.categoryId2.split(',')[1]).then(res => {
                this.category3List= res.data
            }).catch()
        },

        cancelShow(title) {
            console.log(title ,'title')
            this.addShow= title
            this.editShow= title
        },
        /**获取商品自定义属性 */
        getCustomPropertyList() {
            try{
                this.$server.goodsControlApi.getCustomPropertyList().then(res => {
                    this.CustomerCateGoryList= res.data
                }).catch(err => {

                })
            }catch(error) {
                this.$paramsError(error.message)
            }
        },
        // 获取商品数据
        getGoodsList() {
            try {
                
                let params= {
                    brandId: this.formData.brandId !== '' ? +this.formData.brandId  :  '',
                    categoryId1: this.formData.categoryId1.split(',')[0] !== '' ? +this.formData.categoryId1.split(',')[0] : '',
                    categoryId2: this.formData.categoryId2.split(',')[0] !== '' ?  +this.formData.categoryId2.split(',')[0] : '',
                    categoryId3: this.formData.categoryId3 !== '' ? +this.formData.categoryId3 : '',
                    gmtCreateBegin:this.formData.time.length > 0 ? this.formate(new Date(this.formData.time[0]).getTime(), 'yyyy-MM-dd') :'',
                    gmtCreateEnd: this.formData.time.length > 0 ? this.formate(new Date(this.formData.time[1]).getTime(), 'yyyy-MM-dd') : '',
                    goodsName: this.formData.goodsName,
                    memberPriceFrom: this.formData.memberPriceFrom !== '' ? +this.formData.memberPriceFrom : '',
                    memberPriceTo: this.formData.memberPriceTo !== '' ? +this.formData.memberPriceTo : '',
                    purchasePriceFrom: this.formData.purchasePriceFrom !== '' ?  +this.formData.purchasePriceFrom : '',
                    purchasePriceTo: this.formData.purchasePriceTo !== '' ?  +this.formData.purchasePriceTo : '',
                    skuCode: this.formData.skuCode,
                    spuCode: this.formData.spuCode,
                    
                }
                let query= {
                    page: this.page,
                    size: this.size
                }
                this.$server.goodsControlApi.getGoodsList( query,params).then(res => {
                    this.tableData= res.data
                    this.total= res.total
                }).catch()
            }catch(error) {

                this.$paramsError(error.message)
            }
           
      
        },
        /**查询按钮 */
        handleClickSearch() {
            this.getGoodsList()
        },
        /**分页按钮 */
        handlePageChange(page) {
            try {
                this.page= page
                this.getGoodsList()
            }
            catch(err) {
                this.$paramsError(err.message)
            }
        },
        /**选择每页展示数量 */
        handleSizeChange(size) {
            this.size= size
            this.getGoodsList()
        },
        handleChangeVal(label, val) {
           return this.formData[label]= val
        },
        /**表格样式 */
        cellStyle({row, column, rowIndex, columnIndex}) {
     
            if(columnIndex == 4) {
                return 'border-right: 2px solid #999'
            }
        },
        /**批量选择 */
        handleSelectionChange(val) {
            let arr= []
            console.log(val)
            val.forEach(item => {
                if(arr.indexOf(item.gid) == -1) {
                    arr.push(item.gid)
                }
            })
            this.deleteGoodsIds= arr
        },
        /**批量删除商品 */
        handleGoodsById() {
            try {
                console.log(this.deleteGoodsIds)
                this.$server.goodsControlApi.delGoodsApi(this.deleteGoodsIds).then(res => {
                    this.getGoodsList()
                }).catch(err => {})
            }catch(error) {this.$paramsError(error)}
        },
        /**商品批量启用/停用操作 */

        // 批量上传/下载
        handleCommandExcel() {},
        // 批量停用/启用
        handleCommandStatus(val) {
            if(this.deleteGoodsIds.length > 0) {
                if(val =='input') {
    
                    this.$confirm('确定启用选中商品？').then(_ => {
                        let isLocked = 1
                        this.$server.goodsControlApi.changeGoodsStatisApi(isLocked, this.deleteGoodsIds).then(res => {
                            this.getGoodsList()
                        }).catch()
                    }).catch()
                }else{
                    this.$confirm('确定停用用选中商品？').then(_ => {
                        let isLocked = 0
                        this.$server.goodsControlApi.changeGoodsStatisApi(isLocked, this.deleteGoodsIds).then(res => {
                            this.getGoodsList()
                        }).catch()
                    }).catch()
                }
            }else{
                this.$paramsError('未选择商品')
            }
        },
        handleCheckChange(val,index) {
            console.log(index, val)

        },
  
        // 重置按钮
        handleReset() {
            
            this.formData = {
                spuCode: '',
                skuCode: '',
                goodsName: '',
                brandId: '',
                categoryId1: '',
                categoryId2: '',
                categoryId3: '',
                purchasePriceFrom: '',
                purchasePriceTo: '',
                memberPriceFrom: '',
                memberPriceTo: '',
                time: '',
                checkList: []
            },
            this.getGoodsList()
        },
        /**商品编辑按钮 */
        editGoods(scope) {
            this.editShow= true
            this.goodsId= scope.gid
        },
        /** */
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
