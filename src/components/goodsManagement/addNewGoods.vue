<template>
    <div id="add-new-goods">
        <div class="top">
            <el-form ref="form" :model="baseForm" label-width="80px">
                <el-form-item label="SPU编码:">
                    <el-input type="text" v-model="baseForm.spuNum" size="small" placeholder="不填将自动生成"></el-input>
                </el-form-item> 
                <el-form-item label="SKU编码:">
                    <el-input type="text" v-model="baseForm.skuNum" size="small" placeholder="不填将自动生成"></el-input>
                </el-form-item> 
                <el-form-item label="商品名称:">
                    <el-input type="text" v-model="baseForm.goodsName" size="small" placeholder="填写商品名称"></el-input>
                </el-form-item> 
                <el-form-item label="商品名称:">
                     <el-select v-model="baseForm.brandId" size="small" placeholder="请选择品牌">
                        <el-option
                        v-for="item in brandList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="选择类目:"></el-form-item>
                <el-form-item label="颜色:">
                    <el-select v-model="baseForm.colors" size="small" multiple placeholder="请选择颜色（可多选）">
                        <el-option
                        v-for="item in colorList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="尺码:">
                    <el-select v-model="baseForm.sizes" size="small" multiple placeholder="请选择尺码（可多选）">
                        <el-option
                        v-for="item in sizeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="采购价格:">
                    <el-input type="text" size="small" v-model="baseForm.buyPrice" placeholder="请填写采购价格"></el-input>
                </el-form-item>
                <el-form-item label="吊牌价格:">
                    <el-input type="text" size="small" v-model="baseForm.buyPrice" placeholder="请填写吊牌价格"></el-input>
                </el-form-item>
                <el-form-item label="会员价格:">
                    <el-input type="text" size="small" v-model="baseForm.buyPrice" placeholder="请填写会员价格"></el-input>
                </el-form-item>
                <el-form-item label="材质:">
                     <el-select v-model="baseForm.brandId" size="small" placeholder="请选择材质">
                        <el-option
                        v-for="item in brandList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> 
                
            </el-form>
        </div>
        <div class="bottom" style="margin: 30px 0;">
            <span style="line-height: 24px; font-size: 18px; color: #303133;">自定义属性</span>
            <el-form ref="form" :model="customForm" label-width="80px">
                <el-form-item label="选择属性:">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="风格"></el-checkbox>
                        <el-checkbox label="季节"></el-checkbox>
                        <el-checkbox label="人群"></el-checkbox>
                        <el-checkbox label="功能"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item> 
                <el-form-item v-for="(item, index) in checkList" :key="index" :label="item">
                    <el-select size="small" v-model='customForm.value1'>
                        <el-option
                        v-for="item in valueList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传图片: ">
                    <upload :materialImg="imageList" @handleDelImg="delImg"></upload>
                </el-form-item>
            </el-form>
        </div>
        <div class="add-googs-btn">
            <el-button  size="medium">生成编码</el-button>
            <el-button type="primary" size="medium">提交保存</el-button>
        </div>

    </div>
</template>
<script>
import upload from '../commonComponents/upload'
    export default {
        components: {
            upload
        },
        data() {
            return {
                baseForm: {
                    spuNum: '',
                    skuNum: '',
                    goodsName: '',
                    brandId: '',
                    colors: [],
                    sizes: [],
                    buyPrice: '',

                },
                customForm: {
                    value1: '',
                    value2: ''
                },
                brandList: [],
                colorList: [],
                sizeList: [],
                checkList: [],
                valueList: [],
                imageList: [
                    'http://akmer.aikucun.com/d208725543e98a59c0cc308cf9ca52d45da2eca3_1560271359607_60.jpg',
                    'http://akmer.aikucun.com/5e296ad27504b401215a9a1eb53445d7bab78578_1560271359721_90.jpg',
                    'http://akmer.aikucun.com/86b923981b5108d57cdb28691f922c0aa22f0ed1_1560271360018_94.jpg',
                    'http://akmer.aikucun.com/1b6e48e1b357a2ddc6df9b2bf607b2d9b7042923_1560271359977_66.jpg',
                    'http://akmer.aikucun.com/d208725543e98a59c0cc308cf9ca52d45da2eca3_1560271359607_60.jpg',
                    'http://akmer.aikucun.com/5e296ad27504b401215a9a1eb53445d7bab78578_1560271359721_90.jpg',
                    'http://akmer.aikucun.com/86b923981b5108d57cdb28691f922c0aa22f0ed1_1560271360018_94.jpg',
                    'http://akmer.aikucun.com/1b6e48e1b357a2ddc6df9b2bf607b2d9b7042923_1560271359977_66.jpg',
                    'http://akmer.aikucun.com/d208725543e98a59c0cc308cf9ca52d45da2eca3_1560271359607_60.jpg',
                ]
            }
        },
        methods: {
            delImg(idx) {
                this.imageList.splice(idx, 1)
            },
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
