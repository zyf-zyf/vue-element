<template>
    <div>
        
          
            <div class="table-search">
                <el-input v-model="searchName" type="text" size="small" placeholder="请输入查询条件" suffix-icon="el-icon-search" style="width: 300px;"></el-input>
                <el-button size="small" type="primary"  @click="handleAddBrand" icon="el-icon-plus">添加品牌</el-button>
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
        :title="type == 'add' ? '品牌新建' : '品牌编辑'"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose" v-model="form">
            <el-form label-width="100px">
                <el-form-item label='品牌名称:'>
                    <el-input size="small" type='text' v-model="form.brandName" ></el-input>
                    <small>创建多个类目，请用逗号分隔不同类目</small>
                </el-form-item>
                <el-form-item label="描述:">
                    <el-input type="textarea" :rows="4" v-model="form.brandDesc"></el-input>
                </el-form-item>
                <el-form-item label="上传LOGO:">
                    <upload :materialImg="imageList" @handleDelImg="delImg" @changeMaterialImg="changeMaterialImg" maxLength= "1" uploadtype="less" ></upload>
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
                    brandDesc: '',
                    
                },
                imageList: [],
                uploadtype: 'less', /**图片张数类型 */
                page: 1,
                size: 10,
                total: null,
                type: '', /**区分编辑、新增 */
                brandId: ''

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
                    if(this.type == 'add') {
                        
                        let params= {
                            "brandDesc": this.form.brandDesc,
                            "brandName": this.form.brandName,
                            "logoUrl": this.imageList[0]
                        }
                        console.log(params, 'params')
                        this.$server.goodsControlApi.addBrandApi(params).then(res => {
                            this.dialogVisible= false
                            this.getBrandList()
                        }).catch(err => {
                            console.log(err)
                        })
                    }else if(this.type == 'edit') {
                        let params= {
                            "brandDesc": this.form.brandDesc,
                            "brandName": this.form.brandName,
                            "logoUrl": this.imageList[0]
                        }
                        this.$server.goodsControlApi.editBrandApi(this.brandId, params).then(res => {
                            this.$message({
                                messgae: res.messgae,
                                type :'success',
                                duration: 1000
                            })
                            this.dialogVisible= false
                            this.getBrandList()
                        }).catch()
                    }
                }catch(error) {
                    this.$paramsError(error.message)
                }
            },
            /** 弹框关闭*/
            handleClose() {
                this.$confirm('确认关闭？').then(_ => {
                    this.dialogVisible= false
                }).catch(_ => {});
            },
            /**更换图片 */
            changeMaterialImg(val) {
                this.imageList= val
            },
            /**删除图片 */
            delImg(idx){
                this.imageList.splice(idx, 1)
            },
            /**品牌添加按钮 */

            handleAddBrand() {
                this.type= 'add'
                this.form= {}
                this.imageList= []
                this.dialogVisible= true
            },
            /**品牌编辑按钮 */
            handleEdit(scope) {
                this.type= 'edit'
                this.brandId= scope.brandId
                this.dialogVisible= true
                /**获取品牌信息 */
                try{
                    this.$server.goodsControlApi.detailBrandApi(scope.brandId).then(res => {
                        this.form= res.data
                        this.imageList.push(res.data.logoUrl)
                    }).catch()
                }catch(error) {this.$paramsError(error)}
            },
             /**品牌删除 */
            handleDel(scope) {
                try {
                    let params= {
                        goodsBrandId: scope.brandId
                    }
                    this.$confirm('确定删除该品牌？').then(_ => {
                        this.$server.goodsControlApi.delBrandApi(params).then(res => {
                            this.getBrandList()
                        }).catch(err => {
    
                        })
                    }).catch()
                }catch(err) {
                    this.$paramsError(error.message)
                }
            },
            /**分页 */
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