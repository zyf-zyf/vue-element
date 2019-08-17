<template>
    <div id="add-new-goods" v-if="addShow">
        <div class="top">
            <el-form ref="form" :model="baseForm" label-width="100px" label-position="left">
                <el-form-item label="商品名称:">
                    <el-input type="text" v-model="baseForm.goodsName" size="small" placeholder="填写商品名称"></el-input>
                </el-form-item> 
                <el-form-item label="商品编码:">
                    <el-input type="text" v-model="baseForm.goodsCode" size="small" placeholder="不填将自动生成"></el-input>
                </el-form-item> 
                <el-form-item label="选择品牌:">
                     <el-select v-model="baseForm.brandId" size="small" placeholder="请选择品牌">
                        <el-option
                        v-for="item in brandList"
                        :key="item.brandId"
                        :label="item.brandName"
                        :value="item.brandId">
                        </el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="选择类目:">
                    <el-cascader size="small" v-model="baseForm.categoryId" :options="categoryList" :props='pro' @change="handleChange"></el-cascader>
                </el-form-item>
                <el-form-item label="选择颜色:">
                    <el-select v-model="baseForm.colors" size="small" multiple placeholder="请选择颜色（可多选）">
                        <el-option
                        v-for="item in colorList"
                        :key="item.propertyValueId"
                        :label="item.propertyValue"
                        :value="item.propertyValueId+ '/' +item.propertyId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择尺码:">
                    <el-select v-model="baseForm.sizes" size="small" multiple placeholder="请选择尺码（可多选）">
                        <el-option
                        v-for="item in sizeList"
                        :key="item.propertyValueId"
                        :label="item.propertyValue"
                        :value="item.propertyValueId+ '/' +item.propertyId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="采购价格:">
                    <el-input type="text" size="small" v-model="baseForm.purchasePrice" placeholder="请填写采购价格"></el-input>
                </el-form-item>
                <el-form-item label="吊牌价格:">
                    <el-input type="text" size="small" v-model="baseForm.tagPrice" placeholder="请填写吊牌价格"></el-input>
                </el-form-item>
                <el-form-item label="会员价格:">
                    <el-input type="text" size="small" v-model="baseForm.memberPrice" placeholder="请填写会员价格"></el-input>
                </el-form-item>
                <el-form-item label="选择材质:">
                     <el-select v-model="baseForm.caizhiId" size="small" placeholder="请选择材质">
                        <el-option
                        v-for="item in caizhiList"
                        :key="item.propertyValueId"
                        :label="item.propertyValue"
                        :value="item.propertyValueId+ '/' +item.propertyId">
                        </el-option>
                    </el-select>
                </el-form-item> 
                
            </el-form>
        </div>
        <div class="bottom" style="margin: 30px 0;">
            <span style="line-height: 24px; font-size: 18px; color: #303133;">自定义属性</span>
            <el-form ref="form" :model="customForm" label-width="80px">
                <el-form-item label="选择属性:">
                    <el-checkbox-group v-model="checkList"  @change="handleCheckedCuctomerAttribute">
                        <el-checkbox  v-for="(item, index) in customerAttributeList" :label="JSON.stringify({propertyName:item.propertyName , propertyId:item.propertyId})" :key="index">{{item.propertyName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item> 
                <section v-if="customerAttribute.length >0" > 
                    <el-form-item  :label="item.propertyName" v-for="(item, index) in customerAttribute" :key="index">
                        <el-select v-if="item.valueList" size="small" v-model='item.propertyValueId' >
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
                    <upload v-if="isShow" :materialImg="imageList" @handleDelImg="delImg" @changeMaterialImg="changeMaterialImg" :maxLength= "9" :imgsize="imgsize" :uploadtype="uploadtype"></upload>
                </el-form-item>
            </el-form>
        </div>
        <div class="add-googs-btn">
            <el-button  size="medium">生成编码</el-button>
            <el-button type="primary" size="medium" @click="handleAddGoodsSubmit">提交保存</el-button>
        </div>

    </div>
</template>
<script>
import upload from '../../commonComponents/upload'
    export default {
        components: {
            upload
        },
        props: ['addShow'],
        data() {
            return {
                page: 1,
                size: 10,
                baseForm: {
                    goodsCode: '',
                    goodsName: '',
                    goodsDesc: '',
                    brandId: '',
                    categoryId: [],
                    colors: [],
                    sizes: [],
                    purchasePrice: '',
                    memberPrice: '',
                    tagPrice: ''
                },
                pro: {
                    value: 'categoryId',
                    label: 'categoryName',

                },
               
                customForm: {
                    
                },
                brandList: [],
                categoryList: [],
                colorList: [],
                sizeList: [],
                caizhiList: [],
                customerAttributeList: [],
                checkList: [],
                valueList: [],
                imageList: [],
                customerAttribute: [],
                uploadtype: 'more', // less 仅一张、 more 多张
                imgsize: '2M', // 上传图片限制大小
                options: [],
                isShow: true
            }
        },
        
        mounted() {
            this.getBrandList()
            this.getCategoryList()
            this.getBasicAttribute(),
            this.getCustomPropertyList()
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
            /**获取商品类目 */
            getCategoryList() {
                this.$server.goodsControlApi.getCategoryList().then(res => {
                    this.categoryList= res.data
                }).catch()
            },
            /**获取商品属性值 */
            getBasicAttribute() {
                this.$server.goodsControlApi.getBasicAttribute().then(res => {
                    console.log(res.data)
                    res.data.forEach(item => {
                        if(item.propertyName == '颜色') {
                            let query= {
                                content: ''
                            }
                            this.$server.goodsControlApi.getAttributeVal(item.propertyId, query).then(res => {
                                this.colorList= res.data
                            })
                        }else if(item.propertyName == '尺码') {
                       
                            let query= {
                                content: ''
                            }
                            console.log(item.propertyId)
                            this.$server.goodsControlApi.getAttributeVal(item.propertyId, query).then(res => {
                                this.sizeList= res.data
                            })
                        }else if(item.propertyName == '材料') {
                            let query= {
                                content: ''
                            }
                            this.$server.goodsControlApi.getAttributeVal(item.propertyId, query).then(res => {
                                this.caizhiList= res.data
                            })
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
             handleCheckedCuctomerAttribute() {
                this.customerAttribute= []
                var arr=[]
                this.checkList.forEach(item => {
                    arr.push(JSON.parse(item))
                })
                arr.forEach( async(item) => {
                    let params= {
                        propertyId: item.propertyId
                    }
                    let query={
                        content: ''
                    }
                    item.valueList = await this.$server.goodsControlApi.getAttributeVal(item.propertyId,query).then( res => {
                        return res.data
                    })
                })
                console.log(arr)
                setTimeout(() => {
                    this.customerAttribute= arr
                },100)
             
            },
            handleAddGoodsSubmit() {
                //this.$emit('cancelShow', false)
                try {
                    let colors= [],
                        sizes= [];
                    if(this.baseForm.colors.length > 0) {
                        this.baseForm.colors.forEach(item => {
                            colors.push(item.split('/')[0])
                        })
                    }
                    if(this.baseForm.sizes.length > 0) {
                        this.baseForm.sizes.forEach(item => {
                            sizes.push(item.split('/')[0])
                        })
                    }
                    let goodsCodeVo= {
                        brandId: this.baseForm.brandId,
                        categoryId: this.baseForm.categoryId[2],
                        colorIds: colors,
                        sizeIds: sizes
                    }
                    let goodsPropertyVo= [];
                    if(this.customerAttribute.length > 0) {
                        this.customerAttribute.forEach(item => {
                            if(item.propertyGroupId && item.propertyValueId !== '') {
                                goodsPropertyVo.push({
                                    propertyId: item.propertyId,
                                    propertyValueIds: [item.propertyValueId]
                                })
                            }
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
                        goodsImageVo: goodsImageVo
                    }
                    console.log(params, 'params')
                    this.$server.goodsControlApi.addGoodsApi(params).then(res => {
                        console.log(res, '添加商品')
                        this.imageList= []
                        this.$emit('cancelShow', false)
                        this.$emit('getGoodsList')
                        this.isShow= false
                    }).catch(err => {})
                }catch(error) {this.$paramsError(error)}

            },
     

            delImg(idx) {
                this.imageList.splice(idx, 1)
            },
            changeMaterialImg(file) {
                this.imageList= file
            },
            handleChange(value) {
                console.log(value);
            }
      
        }
    }
</script>
<style lang="less" scoped>

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
