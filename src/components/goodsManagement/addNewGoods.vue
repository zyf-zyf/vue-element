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
                <el-form-item label="选择类目:">
                    <el-cascader size="small" v-model="baseForm.catvalue" :options="options" @change="handleChange"></el-cascader>
                </el-form-item>
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
                    <upload :materialImg="imageList" @handleDelImg="delImg" @changeMaterialImg="changeMaterialImg" :maxLength= "9" :imgsize="imgsize" :uploadtype="uploadtype"></upload>
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
                    catvalue: ''

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
                 
                ],
                uploadtype: 'more', // less 仅一张、 more 多张
                imgsize: '2M', // 上传图片限制大小
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                        value: 'yizhi',
                        label: '一致'
                        }, {
                        value: 'fankui',
                        label: '反馈'
                        }, {
                        value: 'xiaolv',
                        label: '效率'
                        }, {
                        value: 'kekong',
                        label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                        }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                        }]
                    }]
                    }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                        }, {
                        value: 'color',
                        label: 'Color 色彩'
                        }, {
                        value: 'typography',
                        label: 'Typography 字体'
                        }, {
                        value: 'icon',
                        label: 'Icon 图标'
                        }, {
                        value: 'button',
                        label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                        }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                        }, {
                        value: 'input',
                        label: 'Input 输入框'
                        }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                        }, {
                        value: 'select',
                        label: 'Select 选择器'
                        }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                        }, {
                        value: 'switch',
                        label: 'Switch 开关'
                        }, {
                        value: 'slider',
                        label: 'Slider 滑块'
                        }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                        }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                        }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                        }, {
                        value: 'upload',
                        label: 'Upload 上传'
                        }, {
                        value: 'rate',
                        label: 'Rate 评分'
                        }, {
                        value: 'form',
                        label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                        value: 'table',
                        label: 'Table 表格'
                        }, {
                        value: 'tag',
                        label: 'Tag 标签'
                        }, {
                        value: 'progress',
                        label: 'Progress 进度条'
                        }, {
                        value: 'tree',
                        label: 'Tree 树形控件'
                        }, {
                        value: 'pagination',
                        label: 'Pagination 分页'
                        }, {
                        value: 'badge',
                        label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                        }, {
                        value: 'loading',
                        label: 'Loading 加载'
                        }, {
                        value: 'message',
                        label: 'Message 消息提示'
                        }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                        }, {
                        value: 'notification',
                        label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                        }, {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                        }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                        }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                        }, {
                        value: 'steps',
                        label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                        }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                        }, {
                        value: 'popover',
                        label: 'Popover 弹出框'
                        }, {
                        value: 'card',
                        label: 'Card 卡片'
                        }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                        }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                        }]
                    }]
                    }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                    }]
            }
        },
        methods: {
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
