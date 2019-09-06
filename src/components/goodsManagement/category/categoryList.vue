<template>
    <div id="category">
        <el-card>
            <div style="margin-bottom: 10px;">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd()">新建类目</el-button>
                <el-dropdown trigger="click" @command="handleCommand">
                    <el-button plain size="small" >批量上传/下载<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item command= 'input'>导入Excel</el-dropdown-item>
                        <el-dropdown-item command= 'out'>导出Excel</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="categoryId"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                prop="categoryId"
                label="ID"
                >
                </el-table-column>

                <el-table-column :label="item.labelName" v-for="(item,index) in allLevel" v-bind:key="index">
                    <template slot-scope="scope" v-if="scope.row.categoryLevel == item.level">
                       <span >{{scope.row.categoryName}}</span>
                        <span @click="handleEdit(scope.row)">
                            <el-icon class="el-icon-edit" ></el-icon>
                        </span>
                        <span @click="handleDel(scope.row)">
                            <el-icon class="el-icon-delete"></el-icon>
                        </span>
                    </template>
                </el-table-column>

                <el-table-column
                prop="gmtCreate"
                label="创建时间"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="gmtModified"
                label="修改时间"
                show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        {{ scope.row.gmtModified ? formate(scope.row.gmtModified, 'yyyy/MM/dd hh:mm:ss') : '----'}}
                    </template>
                </el-table-column>
               
            </el-table>
        </el-card>
        <el-dialog
        title="类目编辑"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"  v-model="form">
            <el-form label-width="100px">
                <el-form-item label='类目名称:'>
                    <el-input size="small" type='text' v-model="form.categoryName" ></el-input>
                    <small>创建多个类目，请用逗号分隔不同类目</small>
                </el-form-item>
               <el-form-item label="上级类目:" v-if="form.level > 1">
                    <el-cascader style="width: 100%" size="small"  v-model="form.parentCode" :options="categoryList" :props="{ checkStrictly: true ,label:'categoryName',value:'categoryCode' }" ></el-cascader>
                </el-form-item> 
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="handleSubmit">提交保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            allLevel:[
                {
                    labelName:'一级目录',
                    level:1
                },
                {
                    labelName:'二级目录',
                    level:2
                },
                {
                    labelName:'三级目录',
                    level:3
                },
            ],//标志当前等级
            tableData: [],
            dialogVisible: false,
            form: {
                categoryName: '',
                parentCode: '',
                id:'',
                level:1,
            },

            categoryList: [],
            props: {
                lazy: true,
                lazyLoad:this.getCategoryList
            }
        }
    },
    mounted() {
        this.getTableData()
    },
    methods: {
        handleCommand(val) {
            if(val == 'out') {

                let obj= {
                    url: process.env.BASE_API + '/product/api/goods/category/export',
                    name: '类目列表' + this.formate(new Date().getTime(), 'yyyy-MM-dd hh:mm:ss'),
                }
                this.$server.excelApi.downLoadExcel(obj)
            }else{
                alert('上传')
            }
        },
        
        /**获取商品类目列表 */
        getTableData() {
            let that = this
            this.$server.goodsControlApi.getCategoryList().then(res => {
                that.tableData= res.data
            }).catch(err => {})
        },
        /* 配置*/
         getCategoryList() {
            const levelEnd = this.form.level;
            const allLevelLen = this.allLevel.length;
            let tableData = this.tableData;
            let categoryList = JSON.parse(JSON.stringify(tableData));
            
            function getFormatList(list){
                    //三级及以上
                    for(let i = 0 ; i< list.length; i++){
                        if(list[i]['children'] && (list[i]["categoryLevel"] < (levelEnd-1) && list[i]["categoryLevel"] < allLevelLen)){
                            getFormatList(list[i]['children']);
                        }else{
                            delete list[i]['children'];
                        }
                    }
                return list;
            }
            this.categoryList = getFormatList(categoryList);
            
        },
        /*  修改类目 */
        handleEdit(data) {
            let  form = {
                categoryName: data.categoryName,
                parentCode: data.parentCode,
                id: data.categoryId,
                level: data.categoryLevel
            }
            this.form = form;
            if(data.categoryLevel > 1){
                this.getCategoryList();
            }
            this.dialogVisible = true;
        },
        /** 删除类目 */
        handleDel(data) {
            let id = data.categoryId
            this.$confirm('此操作将永久删除该类目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$server.goodsControlApi.delCategory(id).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getTableData();
                })
            }).catch(() => {
                    
            });
        },
        //新增类目
        handleAdd(){
              let  form = {
                categoryName: '',
                parentCode: '',
                id:'',
                level:this.allLevel.length
            }
            this.form = form;
            this.getCategoryList();
            this.dialogVisible = true;
        },
        //提交类目
        handleSubmit() {
            let form = this.form;
            let that = this;
            let  id = form.id;
            let params = {
                "categoryName": form.categoryName,
            }

            if(form.parentCode && form.parentCode != ''){
                params["parentCode"]= typeof(form.parentCode) == 'object' ? form.parentCode.pop() :form.parentCode;
            }

            if(params['categoryName'] == ''){
                 this.$message({
                    message: '请填写类目名称',
                    type: 'warning'
                });
                return false;
            }


            if(id && id != ''){
                this.$server.goodsControlApi.editCategory(id,params).then(res => {
                    this.$message({
                            message: '修改成功',
                            type: 'success'
                        });

                        this.getTableData();
                        this.dialogVisible = false;

                    }).catch(err => {

                    })
            }else{
                let regex = /\，/ig;
                params['categoryName'] = params['categoryName'].replace(/\，/ig,',');
                this.$server.goodsControlApi.addCategory(params).then(res => {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });

                    this.getTableData();
                    this.dialogVisible = false;

                }).catch(err => {

                })
            } 
        },
        handleClose(){
            this.dialogVisible = false;
        }
    }
}
</script>
