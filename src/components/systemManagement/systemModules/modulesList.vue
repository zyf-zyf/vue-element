<template>
    <div id="modules-list">
        <el-card>
            <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="moduleId"
                :indent= 'indent'
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                prop="moduleId"
                label="ID"
                width="180"
                >
                </el-table-column>
                <el-table-column :label="item.labelName" v-for="(item,index) in allLevel" v-bind:key="index" width="180">
                    <template slot-scope="scope" v-if="scope.row.moduleLevel == item.level">
                       <span >{{scope.row.moduleName}}</span>
                        <span v-if="scope.row.moduleLevel != 3" @click="handleCreateModule(scope.row)">
                            <el-icon class="el-icon-plus" ></el-icon>
                        </span>
                        <span @click="handleEdit(scope.row)">
                            <el-icon class="el-icon-edit" ></el-icon>
                        </span>
                        <span v-if="scope.row.moduleLevel !== 1" @click="handleDel(scope.row)">
                            <el-icon class="el-icon-delete"></el-icon>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="moduleUrl"
                label="菜单地址"
                show-overflow-tooltip
                >  
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="创建时间"
                width="120"
                show-overflow-tooltip
                >
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
        title="模块编辑"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"  >
            <el-form label-width="100px" v-model="form">
                <el-form-item label='上级模块:' v-if="type == 'add'">
                    <el-input disabled size="small" type='text' v-model="form.parentModule" class="red"></el-input>
                </el-form-item>
                <el-form-item label='模块名称:'>
                    <el-input size="small" type='text' v-model="form.moduleName" ></el-input>
                </el-form-item>
                <el-form-item label='模块编码:'>
                    <el-input size="small" type='text' v-model="form.moduleCode" ></el-input>
                </el-form-item>
                <el-form-item label='模块路径:' v-if="form.moduleLevel ==2 && type == 'add' || form.moduleLevel ==3">
                    <el-input size="small" type='text' v-model="form.moduleUrl" ></el-input>
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
import Modules from '../../../api/json/modules'
export default {
    created() {
        this.tableData= Modules
    },
    data() {
        return {
            indent: 32,
            allLevel:[
                {
                    labelName:'一级菜单',
                    level:1
                },
                {
                    labelName:'二级菜单',
                    level:2
                },
                {
                    labelName:'三级菜单',
                    level:3
                },
            ],//标志当前等级
            tableData: [],
            dialogVisible: false,
            form: {
                parentModuleId: '',
                parentModule: '',
                moduleName: '',
                moduleCode: '',
                moduleUrl: '',
                moduleLevel: ''
            },
            type: 'add'
        }
    },
    mounted() {
      
    },
    methods: {
        /*  修改模块 */
        handleEdit(data) {
            this.type= 'edit'
            this.form= data
             this.dialogVisible = true;
        },
        /** 删除模块 */
        handleDel(data) {
            this.$confirm('此操作不可恢复！确定删除？').then(_ => {
                alert('删除操作')
            }).catch()
        },
        //新增模块
        handleCreateModule(scope){
            this.type= 'add'
            this.form.parentModule= scope.moduleName
            this.form.parentModuleId= scope.moduleId
            this.form.moduleLevel= scope.moduleLevel
            this.isParentModuleShow= true
            this.dialogVisible = true;
        },
        //新建模块
        handleSubmit() {
           
        },
        handleClose(){
            this.dialogVisible = false;
            this.form = {
                parentModuleId: '',
                parentModule: '',
                moduleName: '',
                moduleCode: '',
                moduleUrl: '',
                moduleLevel: ''
            }
        }
    }
}
</script>