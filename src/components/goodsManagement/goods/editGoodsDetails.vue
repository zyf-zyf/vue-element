<template>
    <!-- <div class="edit-goods-detail-box" > -->
    <el-dialog
    title="编辑商品"
    :visible.sync="dialogVisible"
    class='edit-goods-dialog'
    top="2vh"
    :close-on-click-modal="false"	
    :before-close="handleClose"
    v-if="isReady"
    >
        <div class="edit-goods-detail-box" > 
            <div class="edit-goods-left" >
                <div class="top">
                    <el-form ref="form" :model="baseForm" label-width="100px" label-position="left">
                        <el-form-item label="商品名称:">
                            <el-input type="text" v-model="baseForm.goodsName" size="small" placeholder="请填写商品名称" clearable></el-input>
                        </el-form-item> 
                        <el-form-item label="SPU编码:">
                            <el-input type="text" disabled v-model="baseForm.spuCode" size="small" placeholder="不填将自动生成" clearable></el-input>
                        </el-form-item> 
                        <el-form-item label="商品编码:">
                            <el-input type="text" v-model="baseForm.goodsCode" size="small" placeholder="请填写商品编码" clearable></el-input>
                        </el-form-item> 
                        <el-form-item label="品牌名称:">
                            <el-select style="width: 100%" v-model="baseForm.brandId" size="small" placeholder="请选择品牌" filterable>
                                <el-option
                                v-for="item in brandList"
                                :key="item.brandId"
                                :label="item.brandName"
                                :value="item.brandId">
                                </el-option>
                            </el-select>
                        </el-form-item> 
                        <el-form-item label="选择类目:">
                            <el-cascader style="width: 100%" size="small" v-model="baseForm.categoryId" :options="categoryList" :props='pro' @change="handleChange" placeholder="请选择类目"></el-cascader>
                        </el-form-item>
                        <el-form-item label="选择颜色:">
                            <el-select style="width: 100%" v-model="baseForm.colors" size="small" filterable  multiple placeholder="请选择颜色（可多选）">
                                <el-option-group
                                v-for="group in colorList"
                                :key="group.label"
                                :label="group.label">
                                    <el-option
                                        v-for="(item, index) in group.child"
                                        :key="index + 'c'"
                                        :label="item.propertyValue"
                                        :value="item.propertyValueId+ ',' +item.propertyId">
                                    </el-option>
                                </el-option-group>
                            
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择尺码:">
                            <el-select style="width: 100%" v-model="baseForm.sizes" filterable size="small" multiple placeholder="请选择尺码（可多选）">
                                <el-option-group
                                v-for="group in sizeList"
                                :key="group.label"
                                :label="group.label">
                                    <el-option
                                        v-for="(item, index) in group.child"
                                        :key="index + 'm'"
                                        :label="item.propertyValue"
                                        :value="item.propertyValueId+ ',' +item.propertyId">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="采购价格:">
                            <el-input type="text" size="small" v-model="baseForm.purchasePrice" placeholder="请填写采购价格" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="吊牌价格:">
                            <el-input type="text" size="small" v-model="baseForm.tagPrice" placeholder="请填写吊牌价格" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="会员价格:">
                            <el-input type="text" size="small" v-model="baseForm.memberPrice" placeholder="请填写会员价格" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="折扣价格:">
                            <el-input type="text" size="small" v-model="baseForm.discountPrice" placeholder="请填写折扣价格" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="选择材质:">
                            <el-select style="width: 100%" v-model="baseForm.caizhiId" filterable size="small" placeholder="请选择材质">
                                <el-option-group
                                v-for="group in caizhiList"
                                :key="group.label"
                                :label="group.label">
                                    <el-option
                                        v-for="(item, index) in group.child"
                                        :key="index + 'z'"
                                        :label="item.propertyValue"
                                        :value="item.propertyValueId+ ',' +item.propertyId">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </el-form-item> 
                    </el-form>
                </div>
                <div class="bottom" style="margin: 30px 0;">
                    <span style="line-height: 24px; font-size: 18px; color: #303133; margin-left: -20px">自定义属性</span>
                    <el-form ref="form" :model="customForm" label-width="80px">
                        <el-form-item label="选择属性:">
                            <el-checkbox-group v-model="checkList"  @change="handleCheckedCuctomerAttribute">
                                <el-checkbox  v-for="(item, index) in customerAttributeList" :label="JSON.stringify({propertyName:item.propertyName , propertyId:item.propertyId})" :key="index + 's'">{{item.propertyName}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item> 
                        <section v-if="customerAttribute.length >0" > 
                            <el-form-item  :label="item.propertyName" v-for="(item, index) in customerAttribute" :key="index + 'zs'">
                                <el-select style="width: 100%" v-if="item.valueList" filterable size="small" v-model='item.propertyValueId' >
                                    <el-option
                                    v-for="itemo in item.valueList"
                                    :key="itemo.propertyValueId"
                                    :label="itemo.propertyValue"
                                    :value="itemo.propertyValueId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </section>
                        <el-form-item label="上传图片: ">
                            <upload :isClear="editShow" :materialImg="imageList" @handleDelImg="delImg" @changeMaterialImg="changeMaterialImg" :maxLength= "9" :imgsize="imgsize" :uploadtype="uploadtype"></upload>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="add-googs-btn">
                    <el-button type="primary" size="medium" @click="handleSubmitEditGoods">提交保存</el-button>
                </div>
            </div>
            <div class="middle"></div>
            <div class="edit-goods-right">
                <el-button size="small" @click="handleCreateGoodsCode">生成编码</el-button>
                <el-table :data="tableData">
                    <el-table-column prop="skuCode" label="SKU编号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="specName" label="规格" width="120" show-overflow-tooltip></el-table-column>  
                </el-table>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import upload from '../../commonComponents/upload'
    export default {
        components: {
            upload
        },
        computed: {
             dialogVisible: {
                get() {
                    return this.editShow
                },
                set() {

                }
            },
        },
        props: ['goodsId' , 'editShow'],
        data() {
            return {
                page: 1,
                size: 10,
                baseForm: {
                    spuCode: '',
                    goodsName: '',
                    goodsCode: '',
                    brandId: '',
                    categoryId: [],
                    colors: [],
                    sizes: [],
                    caizhiId: [],
                    purchasePrice: '',
                    memberPrice: '',
                    tagPrice: '',
                    goodsDesc: '',
                    discountPrice: ''
                },
                customForm: {},
                tableData:[],
                brandList: [],
                categoryList: [],
                pro: {
                    value: 'categoryId',
                    label: 'categoryName',
                },
                colorList: [],
                sizeList: [],
                caizhiList: [],
                customerAttributeList: [],
                checkList: [],
                customerAttribute: [],
                imageList: [],
                uploadtype: 'more', // less 仅一张、 more 多张
                imgsize: '2M', // 上传图片限制大小   
                isShow: true  ,
                colorId: '',
                sizeId: '',
                caizhiId: '',
                newCustomerList: [],
                isReady: false, 
                isStart: false,
                searchName: ''
            }
        },
        mounted() {
            Promise.all([ this.getBrandList(), this.getCategoryList(), this.getCustomPropertyList(),this.getBasicAttribute()]).then(() => {
                this.getGoodsDetailByGoodsId()
            })
        },
        methods: {
            /**获取商品属性分组列表 */
            async getAtttributeValueGroupList(id, obj) {
                let query= {
                    content: ''
                }
                await this.$server.goodsControlApi.getAtttributeValueGroupList(id, query).then(res => {
                    res.data.forEach(item => {
                       obj.push({
                           label: item[0].groupName ? item[0].groupName : '无分组',
                           child: item
                       })
                    })
                    this.isStart= true
                })
            },
            /**弹框关闭 */
            handleClose(done) {
                this.$confirm('确认关闭？').then(_ => {
                    this.$emit('cancelShow', false)
                    
                }).catch(_ => {});
            },
            /**获取商品详情 */
            getGoodsDetailByGoodsId() {
                this.isReady= false
                this.$server.goodsControlApi.detailGoodsApi(this.goodsId).then( res => {
                    console.log('获取详情')
                    this.baseForm.spuCode= res.data.spuCode
                    this.baseForm.goodsName= res.data.goodsName
                    this.baseForm.goodsCode= res.data.goodsCode
                    this.baseForm.brandId= res.data.brandId
                    this.baseForm.purchasePrice= res.data.purchasePrice
                    this.baseForm.memberPrice= res.data.memberPrice
                    this.baseForm.tagPrice= res.data.tagPrice
                    this.baseForm.categoryId= [res.data.categoryId,res.data.categoryId2,res.data.categoryId3]
                    this.baseForm.purchasePrice= res.data.purchasePrice
                    this.baseForm.memberPrice= res.data.memberPrice
                    this.baseForm.tagPrice= res.data.tagPrice
                    this.goodsId= res.data.goodsId
                    this.tableData= res.data.goodsSkus
                    this.goodsSpecValues= res.data.goodsSpecValues
                    this.baseForm.discountPrice= res.data.discountPrice

                    if(res.data.goodsImages.length > 0) {
                        res.data.goodsImages.forEach( (item, index) => {
                            this.imageList.push(item.imageUrl)
                        })
                    }else{
                        this.imageList= []
                    }
                    if(res.data.goodsSpecValues.length > 0) {
                        res.data.goodsSpecValues.forEach(  (item, index) => {
                            if(item.propertyId == this.colorId) {
                                if(item.valueIds.indexOf(',') == -1) {
                                    this.baseForm.colors.push(item.valueIds + ',' + item.propertyId)
                                   
                                }else{
                                    item.valueIds.split(',').forEach( (itemo, indexo) => {
                                       this.baseForm.colors.push(itemo+ ',' + item.propertyId)
                                    })
                                }

                            }else if(item.propertyId == this.sizeId) {
                                if(item.valueIds.indexOf(',') == -1) {
                                    this.baseForm.sizes.push(item.valueIds + ',' + item.propertyId)
                                }else{
                                    item.valueIds.split(',').forEach( (itemo, indexo) => {
                                        this.baseForm.sizes.push(itemo+ ',' + item.propertyId)
                                    })
                                }
                                this.isReady= true
                            }else if(item.propertyId == this.caizhiId) {
                                this.baseForm.caizhiId =  (item.valueIds + ',' + item.propertyId)
                            }
                            let arr= []
                            /**循环查询匹配自定义属性 */
                            for(var i=0; i < this.customerAttributeList.length; i++) {
                                if(this.customerAttributeList[i].propertyId == item.propertyId ) {                                 
                                    let names=  this.customerAttributeList[i].propertyName;
                                    let params= {
                                            propertyName: this.customerAttributeList[i].propertyName,
                                            propertyId: item.propertyId
                                        }
                                    this.checkList.push(JSON.stringify(params))
                                    let propertyValueId= item.valueIds
                                    let query={
                                        content: ''
                                    }

                                    this.$server.goodsControlApi.getAttributeVal(item.propertyId,query).then( res => { 
                                        this.customerAttribute.push({
                                            propertyId: item.propertyId,
                                            propertyName: names,
                                            valueList: res.data,
                                            propertyValueId: +item.valueIds
                                        })
                                    }).catch()
                                }
                            }
                        })
                    }
                  
                    this.isReady= true

                }).catch()
            },
            /**获取商品品牌属性 */
            getBrandList() {
                try {
                    let query= {
                        page: this.page,
                        size: 10000,
                        keyword: this.searchName
                    }
                    this.$server.goodsControlApi.getBrandList(query).then(async res => {
                        this.brandList= await res.data
                    }).catch(err => {
                        console.log(err)
                    })
                }catch(error) {
                    this.$paramsError(error.message)
                }
            },
            /**获取商品类目 */
            async getCategoryList() {
                await this.$server.goodsControlApi.getCategoryList().then( res => {
                    this.categoryList= res.data
                }).catch()
            },
            /**获取商品属性值 */
            async getBasicAttribute() {
                await this.$server.goodsControlApi.getBasicAttribute().then(res => {
                    res.data.forEach( item => {
                        if(item.propertyName == '颜色') {
                            this.colorId= item.propertyId
                            this.getAtttributeValueGroupList(item.propertyId, this.colorList)
                        }else if(item.propertyName == '尺码') {
                            this.sizeId= item.propertyId
                            this.getAtttributeValueGroupList(item.propertyId, this.sizeList) 
                        }else if(item.propertyName == '材料') {
                            this.caizhiId= item.propertyId
                            this.getAtttributeValueGroupList(item.propertyId, this.caizhiList)
                        }
                    })
                }).catch(err => {})
            },
            /**获取商品自定义属性 */
            getCustomPropertyList() {
                try{
                    this.$server.goodsControlApi.getCustomPropertyList().then(res => {
                        this.customerAttributeList= res.data
                    }).catch(err => {

                    })
                }catch(error) {
                    this.$paramsError(error.message)
                }
            },
            /**选择自定义属性 */
            handleCheckedCuctomerAttribute() {
                if(this.checkList.length == 0) {
                    this.customerAttribute= []
                }else{
                    var isAdd= false
                    if(this.checkList.length >= this.customerAttribute.length) {
                        this.checkList.forEach(async item => {
                            if(this.customerAttribute.length > 0) {
                                for(var i =0;  i < this.customerAttribute.length; i ++ ) {
                                    if(this.customerAttribute[i].propertyId != JSON.parse(item).propertyId) {
                                        isAdd= true  
                                    }else{
                                        isAdd= false
                                        break;
                                    }
                                }
                                if(isAdd) {
                                    let query={
                                         content: ''
                                    }
                                    let data= await this.$server.goodsControlApi.getAttributeVal(JSON.parse(item).propertyId,query).then( res => {
                                            return  res.data
                                    })
                                    this.customerAttribute.push({
                                        propertyId: JSON.parse(item).propertyId,
                                        propertyName: JSON.parse(item).propertyName,
                                        valueList:  data
                                    })
                                }
                            }else{
                                isAdd= true
                                let query={
                                    content: ''
                                }
                                let data= await this.$server.goodsControlApi.getAttributeVal(JSON.parse(item).propertyId,query).then(res => {
                                    return res.data
                                })
                                this.customerAttribute.push({
                                    propertyId: JSON.parse(item).propertyId,
                                    propertyName: JSON.parse(item).propertyName,
                                    valueList: data
                                })
                            }
                        })
                    }else {  
                        var delArr= []
                        let isDel= false
                        this.checkList.forEach(item => {
                            for(var i=0; i < this.customerAttribute.length; i++) {
                                if(JSON.parse(item).propertyId == this.customerAttribute[i].propertyId) {
                                    delArr.push(this.customerAttribute[i])
                                }
                            }
                        })
                        this.customerAttribute= delArr
                    }
                }
            },
            delImg(idx) {
                this.imageList.splice(idx, 1)
            },
            changeMaterialImg(file) {
                this.imageList= file
            },
            handleChange(value) {
                console.log(value);
            },
            
            /**编辑商品提交 */
            handleSubmitEditGoods() {
                try {
                    let colors= [],
                        sizes= [];
                    let goodsPropertyVo= [];
                    if(this.baseForm.colors.length > 0) {
                        this.baseForm.colors.forEach(async item => {
                           await colors.push(+item.split(',')[0])
                        })
                    }
                    if(this.baseForm.sizes.length > 0) {
                        this.baseForm.sizes.forEach(async item => {
                           await sizes.push(+item.split(',')[0])
                        })
                    }
                    let goodsCodeVo= {
                        brandId: this.baseForm.brandId,
                        categoryId: this.baseForm.categoryId[2],
                        colorIds: colors,
                        sizeIds: sizes,
                        spuCode: ''+this.baseForm.spuCode
                    }
                    
                    if(this.customerAttribute.length > 0) {
                        this.customerAttribute.forEach(async item => {
                            if(item.propertyValueId && item.propertyValueId !== '') {
                                await goodsPropertyVo.push({
                                    propertyId: +item.propertyId,
                                    propertyValueIds: [item.propertyValueId]
                                })
                            }
                        })
                    }
                    if(this.baseForm.colors.length > 0) {
                       this.baseForm.colors.forEach(async item => {
                            await goodsPropertyVo.push({
                                propertyId: +item.split(',')[1],
                                propertyValueIds: [+item.split(',')[0],]
                            })
                       }) 
                    }
                    if(this.baseForm.sizes.length > 0) {
                       this.baseForm.sizes.forEach(async item => {
                           await goodsPropertyVo.push({
                                propertyId: +item.split(',')[1],
                                propertyValueIds: [+item.split(',')[0],]
                            })
                       }) 
                    }
                    if(this.baseForm.caizhiId !== '') {
                        goodsPropertyVo.push({
                            propertyId: +this.baseForm.caizhiId.split(',')[1],
                            propertyValueIds: [+this.baseForm.caizhiId.split(',')[0],]
                        })
                    }
                    let goodsImageVo=[]
                    if(this.imageList.length > 0) {
                        this.imageList.forEach((item, index) => {
                            if(index == 0) {
                                goodsImageVo.push({
                                    imageUrl: item,
                                    isHeadImage: 1
                                })
                            }else{
                                goodsImageVo.push({
                                    imageUrl: item,
                                    isHeadImage: 0
                                })
                            }
                        }) 
                    }
                    
                    var params= {
                        brandId: this.baseForm.brandId,
                        categoryId: this.baseForm.categoryId[0],
                        categoryId2: this.baseForm.categoryId[1],
                        categoryId3: this.baseForm.categoryId[2],
                        goodsName: this.baseForm.goodsName,
                        goodsDesc: this.baseForm.goodsDesc,
                        memberPrice: +this.baseForm.memberPrice,
                        goodsCode: this.baseForm.goodsCode,
                        purchasePrice: +this.baseForm.purchasePrice,
                        tagPrice: +this.baseForm.tagPrice,
                        goodsCodeVo: goodsCodeVo,
                        goodsPropertyVo: goodsPropertyVo,
                        goodsImageVo: goodsImageVo,
                        discountPrice: + this.baseForm.discountPrice
                    }
                    console.log(params, 'params')
                    this.$server.goodsControlApi.editGoodsApi(this.goodsId, params).then(res => {
                        this.imageList= []
                        this.$emit('cancelShow', false)
                        this.$emit('getGoodsList')
                        this.isShow= false
                        this.isClear= true
                    }).catch(err => {})
                }catch(error) {this.$paramsError(error)}
            },
            /**生成商品编码 */
            handleCreateGoodsCode() {
                try{
                    let colors= [],
                        sizes= [];
                    if(this.baseForm.colors.length > 0) {
                        this.baseForm.colors.forEach(item => {
                            colors.push(+item.split(',')[0])
                        })
                    }
                    if(this.baseForm.sizes.length > 0) {
                        this.baseForm.sizes.forEach(item => {
                            sizes.push(+item.split(',')[0])
                        })
                    }
                    let params= {
                        brandId: this.baseForm.brandId,
                        categoryId: this.baseForm.categoryId.length > 0 ? +this.baseForm.categoryId[2]  : '',
                        colorIds: colors,
                        sizeIds: sizes,
                        spuCode: ''+this.baseForm.spuCode
                    }
                    this.$server.goodsControlApi.generatingCommodityCode(params).then(res => {
                        res.data.skuCodes.forEach(item => {
                            item.specName= item.colorName+ ',' +item.sizeName
                        })
                        this.tableData= res.data.skuCodes
                    }).catch()
                }catch(error) {this.$paramsError(error)}
            }
        }
    }
</script>
<style lang="less" scoped>
    .edit-goods-detail-box {
        display: flex;
        flex-direction: row;
        .edit-goods-left {
            width: 650px;
            box-sizing: border-box;
        }
        .middle{
            width: 2px;
            background: #eee;
            position: absolute;
            top: -90px;
            bottom: -60px;
            left: 700px;
        }
        .edit-goods-right {
            width: 367px;
            box-sizing: border-box;
            position: relative;
            left: 20px;
            .el-button {
                position: absolute;
                top: -40px;
                left: 0;
            }
        }
    }
    .add-googs-btn {
        margin-top: 20px;
        text-align: right;
    }
    .top {
        padding-bottom: 30px;
        border-bottom: 1px solid #eee;
    }
    .img-box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .img {
            width: 30%;
            margin: 1%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            border: 1px solid #eee;;
            img {
                width: 100%;
            }
            i {
                position: absolute;
                top: 0;
                right: 0;
                color: red;
                font-weight: 800;
                font-size: 20px;
            }
        }
    }

</style>
