<template>
    <div>
        
          
            <div class="table-search">
                <el-input v-model="searchName" type="text" size="small" placeholder="请输入查询条件" suffix-icon="el-icon-search" style="width: 300px;"></el-input>
                <el-button size="small" type="primary"  @click="dialogVisible=true" icon="el-icon-plus">添加品牌</el-button>
            </div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column
                prop="brandId"
                label="ID"
                >
                </el-table-column>
                <el-table-column
                prop="logoUrl"
                label="LOGO"
                >
                    <template slot-scope="scope">
                        <el-image
                        style="width: 50px; height: 50px"
                        :src="scope.row.logoUrl"
                        fit="fill"></el-image>
                    </template>
                        
                </el-table-column>
                <el-table-column
                prop="brandName"
                label="品牌">
                </el-table-column>
                <el-table-column
                prop="brandDesc"
                label="描述">
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="修改时间">
                </el-table-column>
                <el-table-column
                label="操作"
                width="80"
                >
                    <template slot-scope="scope">
                        <span @click="handleEdit(scope.row)">
                            <el-icon class="el-icon-edit" ></el-icon>
                        </span>
                        <span @click="handleDel(scope.row)">
                            <el-icon class="el-icon-delete"></el-icon>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <page :total="total" :page="page" :size="size" @handlepagechange="handlePageChange" @handleSizeChange="handleSizeChange"></page>
     
        <!-- 添加品牌属性 -->
        <el-dialog
        title="品牌编辑"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
            <el-form label-width="100px">
                <el-form-item label='品牌名称:'>
                    <el-input size="small" type='text' v-model="form.brandName" ></el-input>
                    <small>创建多个类目，请用逗号分隔不同类目</small>
                </el-form-item>
                <el-form-item label="描述:">
                    <el-input type="textarea" :rows="4" v-model="form.detail"></el-input>
                </el-form-item>
                <el-form-item label="上传LOGO:">
                    <upload :materialImg="form.imageList" @handleDelImg="delImg" @changeMaterialImg="changeMaterialImg" maxLength= "1" uploadtype="less" ></upload>
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
    import upload from '../../../commonComponents/upload'
    import page from '../../../commonComponents/page'
 
    export default {
        components: {
            upload,
            page
        },
        mounted() {
            this.getBrandList()
        },
        data() {
            return {
                searchName: '',
                tableData: [],
                dialogVisible: false,
                form: {
                    brandName: '',
                    detail: '',
                    imageList: []
                },
                uploadtype: 'less',
                page: 1,
                size: 10,
                total: null

            }
        },
        methods: {
            /** 获取品牌列表 */
            getBrandList() {
             
                try {
                    let query= {
                        page: this.page,
                        size: this.size
                    }
                    this.$server.goodsControlApi.getBrandList(query).then(res => {
                        this.total= res.total
                        this.tableData= res.data
                    }).catch(err => {
                        console.log(err)
                    })
                }catch(error) {
                    this.$paramsError(error.message)
                }
            },
            handleSubmit() {
               
                
                try {
                    var params= {
                        "brandDesc": this.form.brandName,
                        "brandName": this.form.detail,
                        "logoUrl": this.form.imageList[0]
                    }
                    console.log(params, 'params')
                    this.$server.goodsControlApi.addBrandApi(params).then(res => {
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                }catch(error) {
                    this.$paramsError(error.message)
                }
            },
            handleClose() {
                this.$confirm('确认关闭？').then(_ => {
                    this.dialogVisible= false
                }).catch(_ => {});
            },
            changeMaterialImg(val) {
                this.form.imageList= val
            },
            delImg(idx){
                this.form.imageList.splice(idx, 1)
            },
            /**品牌编辑 */
            handleEdit(scope) {

            },
             /**品牌删除 */
            handleDel(scope) {
                try {
                    let params= {
                        goodsBrandId: scope.brandId
                    }
                    this.$server.goodsControlApi.delBrandApi(params).then(res => {
                        this.getBrandList()
                    }).catch(err => {

                    })
                }catch(err) {
                    this.$paramsError(error.message)
                }
            },
            handlePageChange(page) {
                try {
                    this.page= page
                    this.getBrandList()
                }
                catch(err) {
                    this.$paramsError(err.message)
                }
            },
            handleSizeChange(size) {
                try{
                    this.size= size
                    this.getBrandList()
                }catch(err) {
                    this.$paramsError(err.message)
                }
                
            },
        }
    }
</script>

<style lang="less" scoped>
    
</style>