<template>
    <div id="roleList">
        <el-card>
            <div class="layout-top">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-input size="mini" type="text" v-model="searchName" placeholder="请输入查询条件" suffix-icon="el-icon-search"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            <el-select size="mini" v-model="status">
                                <el-option value="0" label="全部"></el-option>
                                <el-option value="1" label="有效"></el-option>
                                <el-option value="2" label="无效"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content layout-right">
                             <el-button type="primary" size="mini" @click="dialogVisible= true">添加角色</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="tableData" >
                <el-table-column type="index" ></el-table-column>
                <el-table-column label="ID" prop="id" width="100"></el-table-column>
                <el-table-column label="名称" prop="roleName" width="150"></el-table-column>
                <el-table-column label="状态" width="150">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status" :type="scope.row.status == 1 ? 'success' : 'damger'" size="mini">
                            {{scope.row.status == 1 ? '有效' : scope.row.status == 0 ? '无效' : ''}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="权限" prop="power">
                    <template slot-scope="scope">
                        <span style="margin-right: 5px;" v-for="(item, index) in scope.row.power" :key="''+index">{{index == scope.row.power.length-1 ? item : item+'、'}}</span>
                        <span @click="handleEditPowers(scope.row)">
                            <el-icon class="el-icon-edit" ></el-icon>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column  label="操作" width="80">
                    <template slot-scope="scope">
                        <el-dropdown size="small" type="text" trigger="click" placement="bottom-start">
                            <span class="el-dropdown-link" style="font-size: 12px">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item command="a" @click.native="handleDisabledUser(scope.row)">禁用</el-dropdown-item>
                                <el-dropdown-item command="b" @click.native="handleEditRole(scope.row)" >编辑</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <page :total="total" :page="page" :size="size" @handlepagechange="handlePageChange" @handleSizeChange="handleSizeChange"></page>
        </el-card>
        <editRolePowers :editPower="editPower" :roleId="roleId" @cancelShow="cancelShow"></editRolePowers>
        <!-- 添加编辑角色 -->
        <el-dialog
        title="角色编辑"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"  >
            <el-form label-width="80px" v-model="form" label-position="left">
                <el-form-item label='角色名称:'>
                    <el-input size="small" type='text' v-model="form.roleName" clearable placeholder="请填写角色名称" ></el-input>
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
    import page from '../../commonComponents/page'
    import editRolePowers from './editRolePowers'
    export default {
        components: {page, editRolePowers},
        data() {
            return {
                page: 1,
                size: 10,
                total: 10,
                status: '0',
                searchName: '',
                tableData: [
                    {
                        id: 1,
                        roleName: '管理员',
                        status: 1,
                        power: ['全部'],
                    },
                    {
                        id: 2,
                        roleName: '运营',
                        status: 1,
                        power: ['商品管理'],
                    },
                    {
                        id: 3,
                        roleName: '库管',
                        status: 1,
                        power: ['库存管理'],
                    },
                ],
                editPower: false,
                roleId: '',
                dialogVisible: false,
                form: {
                    roleName: ''
                }
            }
        },
        mounted() {

        },
        methods: {
            handlePageChange(page) {

            },
            handleSizeChange(size) {

            },
            /** 禁用用户 */
            handleDisabledUser() {},
            handleEditPowers(scope) {
                this.editPower= true
                this.roleId= scope.id
            },
            cancelShow(title) {
                this.editPower= title
            },
            handleClose() {
                this.roleId= ''
                this.form.roleName= ''
                this.dialogVisible= false
            },
            handleSubmit() {},
            handleEditRole(scope) {
                this.roleId= scope.id
                this.form.roleName= scope.roleName
                this.dialogVisible= true
            }
           
        }
    }
</script>