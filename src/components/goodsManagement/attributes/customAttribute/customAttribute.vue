<template>
    <div id="custom-attribute">
        <el-card class="elcard" v-for="(item, index) in tableList" :key="index">
            <el-collapse v-model="activeNames" @change="handleChange(item,index)" accordion>
                <el-collapse-item :name=index>
                    <template slot="title">
                        <h3>{{item.propertyName}}</h3>
                    </template>
                    <div style="padding-top: 10px">

               
                    <div class="table-search">
                        <el-input v-model="item.searchName" type="text" size="small" placeholder="请输入查询条件" suffix-icon="el-icon-search" style="width: 300px;"></el-input>
                        <el-button size="small" type="primary" @click="handleItemValue(item, index)" >添加属性值</el-button>
                    </div>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column
                        prop="propertyValueId"
                        label="ID"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="propertyValue"
                        label="属性值"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="gmtCreate"
                        label="创建时间">
                        </el-table-column>
                        <el-table-column
                        prop="gmtModified"
                        label="修改时间">
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        width="80">
                            <template slot-scope="scope">
                                <span @click="handleEdit(item,scope.row,index)">
                                    <el-icon class="el-icon-edit" ></el-icon>
                                </span>
                                <span @click="handleDel(scope.row, index)">
                                    <el-icon class="el-icon-delete"></el-icon>
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                         </div>
                </el-collapse-item>
  
 
            </el-collapse>
        </el-card>
        <div class="cus-btn">
            <el-button style="width: 100%;" icon="el-icon-plus" @click="handleClickTableItem">添加属性</el-button>
        </div>
        <attributeDialog v-if="isShow" :valueTitle="valueTitle" :type="type" :isShow="isShow" :name="title" :labelName="labelName" @cancelShow="cancelShow" @handleClcikAddItem="handleClcikAddItem" @handleClcikAddItemValue="handleClcikAddItemValue" @changeTitle="changeTitle"></attributeDialog>
    </div>
</template>
<script>
    import attributeDialog from './attributeDialog'
    export default {
        components: {
            attributeDialog
        },
        mounted() {
            this.getCustomPropertyList()
        },
        data() {
            return {
                searchName: '',
                tableList: [
                    {
                        title: '品牌',
                        searchName: '',
                        
                    }
                ],
                tableData: [],
                title: '',
                isShow: false,
                labelName: '',
                type: '',
                activeNames: '',
                propertyValueId: '',
                valueTitle: '',
                typetype: '',
                propertyValue: ''
            }
        },
        methods: {
            /**获取自定义属性列表 */
            getCustomPropertyList() {
                try{
                    this.$server.goodsControlApi.getCustomPropertyList().then(res => {
                        this.tableList= res.data
                    }).catch(err => {

                    })
                }catch(error) {
                    this.$paramsError(error.message)
                }
            },
            /**获取属性值列表 */
            getGroupListByPropertyId(id) {
                try {
                    let query= {
                        content: ''
                    }
                    this.$server.goodsControlApi.getAttributeVal(id, query).then(res => {
                        this.tableData= res.data
                    })

                }catch(error) {
                    this.$paramsError(error)
                }
            },
            handleChange (item, index) {
                console.log(item)
              
                this.tableData= []
                if(this.activeNames == index) {
                    this.getGroupListByPropertyId(item.propertyId)
                }
            },
            /**添加自定义属性按钮 */
            handleClickTableItem() {
                this.isShow= true
                this.type= 'item'
                this.valueTitle= '添加属性'
                this.labelName= '属性名称'
            },
            /**添加自定义属性 */
            handleClcikAddItem(title) {
                try{
                    let params= {
                        inputType: 'radio',
                        isInput: 0,
                        isMultiple: 0,
                        isRequired: 0,
                        isSku: 0,
                        propertyDesc: '属性说明',
                        propertyName: title,
                        sortNo: 0
                    }
                    this.$server.goodsControlApi.addCustomProperty(params).then(res => {
                        this.cancelShow()
                        this.getCustomPropertyList()
                        //this.title= ''
                    }).catch(err => {})
                }catch(error){
                    this.$paramsError(error)
                }
            },
            // 添加属性值
            handleItemValue(item, id) {
                console.log(item, 'fjfjfjjf')
                this.title= ''
                this.isShow= true
                this.type= 'itemValue'
                this.valueTitle= item.propertyName
                this.labelName= '属性值名称'
                this.propertyId= item.propertyId
                // this.propertyGroupId= item.propertyGroupId
                this.typetype= "add"

            },
            /**属性分组添加属性值 */
            handleClcikAddItemValue(title) {
                
                try {
                    if(this.typetype == 'add') {
                        let params= {
                            propertyId: this.propertyId,
                            propertyValue: title
                        }
                        this.$server.goodsControlApi.addAttributeVal(params).then(res => {
                            this.cancelShow()
                            this.getGroupListByPropertyId(this.propertyId)
    
                        }).catch(err => {
    
                        })
                    }else if(this.typetype == 'edit') {
                        let params= {
                            propertyValueId: this.propertyValueId,
                            propertyValue: title
                        }
                        this.$server.goodsControlApi.editAttributeVal(params).then(res => {
                            this.cancelShow()
                            this.getGroupListByPropertyId(this.propertyId)
    
                        }).catch(err => {
    
                        })
                    }
                }catch(error){
                    this.$paramsError(error)
                }
            },
            cancelShow(file) {
                this.isShow= file
            },
            changeTitle(title) {
                console.log(title, 'change')
                this.title= title
            },
            /**属性值编辑 */
            handleEdit(item,scope, id) {
                console.log(item, 'item')
                this.title= scope.groupName
                console.log(this.title)
                this.isShow= true
                this.type= 'itemValue'
                this.valueTitle= item.propertyValue
                this.labelName= '属性值名称'
                this.propertyId= scope.propertyId
                this.propertyValueId= scope.propertyValueId
                this.typetype= "edit"
            },
            /**属性值删除 */
            handleDel(scope, id){
                try{
                    let params= {
                        propertyValueId:scope.propertyValueId
                    }
                    this.$confirm('确定删除该属性值？').then(_ => {

                        this.$server.goodsControlApi.delAttributeVal(scope.propertyValueId).then(res => {
                            this.getGroupListByPropertyId(scope.propertyId)
                        }).catch(err => {
    
                        })
                    }).catch()
                }catch(error) {this.$paramsError(error)}
            }
        }
    }
</script>
<style lang="less" scoped>
    
    .cus-btn {
        margin: 20px 0;
        .el-button {
            width: 100%;
            border: 1px dashed #999;
            color: #999;
            font-weight: 400
        }
    }
    h3 {
        font-size: 16px;
        color: #474747;
    }
</style>
