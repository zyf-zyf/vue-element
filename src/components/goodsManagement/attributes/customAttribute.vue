<template>
    <div id="custom-attribute">
        <el-collapse v-model="activeNames" @change="handleChange" class="elcard">
            <el-collapse-item :name="index" v-for="(item, index) in tableList" :key="index">
                <template slot="title">
                   
                        <div>
                            <h3 style="margin-left: 10px;">{{item.title}}</h3>
                        </div>
                        <div class="table-search">
                            <el-input v-model="item.searchName" type="text" size="small" placeholder="请输入查询条件" suffix-icon="el-icon-search" style="width: 300px;"></el-input>
                            <el-button size="small" type="primary" @click="handleItemValue(item, index)" >添加属性值</el-button>
                        </div>
                  
                </template>
                <el-table :data="item.tableData" stripe style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="ID"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="属性值"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="修改时间">
                    </el-table-column>
                    <el-table-column
                    label="操作">
                    </el-table-column>
                </el-table>
    
            </el-collapse-item>
        </el-collapse>
        <div class="cus-btn">
            <el-button style="width: 100%;" icon="el-icon-plus" @click="handleClickTableItem">添加属性</el-button>
        </div>
        <attributeDialog :type="type" :isShow="isShow" :name="title" :labelName="labelName" @cancelShow="cancelShow" @handleClcikAddItem="handleClcikAddItem" @handleClcikAddItemValue="handleClcikAddItemValue"></attributeDialog>
    </div>
</template>
<script>
    import attributeDialog from './attributeDialog'
    export default {
        components: {
            attributeDialog
        },
        data() {
            return {
                activeNames: '',
                searchName: '',
                tableList: [
                    {
                        title: '品牌',
                        searchName: '',
                        tableData: []
                    }
                ],
                title: '',
                isShow: false,
                labelName: '',
                type: ''
            }
        },
        methods: {
            // 添加属性
            handleClickTableItem() {
                this.isShow= true
                this.type= 'item'
                this.labelName= '属性名称'
                
            },
            handleClcikAddItem(title) {
                this.tableList.push({
                    title: title,
                    searchName: '',
                    tableData: []
                })
                this.isShow= false
                this.title= ''
            },
            // 添加属性值
            handleItemValue() {
                this.isShow= true
                this.type= 'itemValue'
                this.labelName= '属性值名称'

            },
            handleClcikAddItemValue(title) {
                // 需接口创建属性值
                console.log(title)
            },
            cancelShow(file) {
                this.isShow= file
            },
            // 折叠面板
            handleChange(val) {
                console.log(val)
            }
        }
    }
</script>
<style lang="less" scoped>
    .elcard {
        margin:0 0 10px 0;
    }
    .table-search {
        box-sizing: border-box;
        padding-left: 80px;
        margin-top: 30px;
        margin-bottom: 10px;
        flex: 10;
        justify-content: space-between;
        display: flex;
        text-align: center;
        align-items: center;
    }
    .cus-btn {
        margin: 20px 0;
        .el-button {
            width: 100%;
            border: 1px dashed #999;
            color: #999;
            font-weight: 400
        }
    }
    .el-collapse-item {
        margin-bottom: 10px;
    }
 
</style>
