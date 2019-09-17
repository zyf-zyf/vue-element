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
                             <el-button type="primary" size="mini">添加用户</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="tableData" >
                <el-table-column type="index" ></el-table-column>
                <el-table-column label="ID" prop="id" width="80"></el-table-column>
                <el-table-column label="账号">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                            <el-button size="mini" type="text">{{scope.row.phone}}</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="昵称" prop="nickName"></el-table-column>
                <el-table-column label="角色ID" prop="roleId"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column  label="操作" width="80">
                    <template slot-scope="scope">
                        <el-dropdown size="small" type="text" trigger="click" placement="bottom-start">
                            <span class="el-dropdown-link" style="font-size: 12px">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item command="a" @click.native="handleDisabledUser(scope.row)" >禁用</el-dropdown-item>
                                <el-dropdown-item command="b" @click.native="handleEditUser(scope.row)" >下载</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <page :total="total" :page="page" :size="size" @handlepagechange="handlePageChange" @handleSizeChange="handleSizeChange"></page>
        </el-card>

    </div>
</template>
<script>
    import page from '../../commonComponents/page'
    export default {
        components: {page},
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
                        nickName: '管理员',
                        phone: '13240125174',
                        roleId: '01',
                        roleName: 'Admin'

                    },{
                        id: 1,
                        nickName: '管理员',
                        phone: '13240125174',
                        roleId: '01',
                        roleName: 'Admin'

                    },{
                        id: 1,
                        nickName: '管理员',
                        phone: '13240125174',
                        roleId: '01',
                        roleName: 'Admin'

                    },{
                        id: 1,
                        nickName: '管理员',
                        phone: '13240125174',
                        roleId: '01',
                        roleName: 'Admin'

                    },{
                        id: 1,
                        nickName: '管理员',
                        phone: '13240125174',
                        roleId: '01',
                        roleName: 'Admin'

                    },{
                        id: 1,
                        nickName: '管理员',
                        phone: '13240125174',
                        roleId: '01',
                        roleName: 'Admin'

                    }
                ]
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
            handleDisabledUser() {}
        }
    }
</script>