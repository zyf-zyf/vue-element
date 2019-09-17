<template>
    <div id="editPowers">
         <!-- 角色权限分配 -->
        <el-dialog
        title="权限编辑"
        :visible.sync="dialogVisible"
        class=''
        top="10vh"
        :close-on-click-modal="false"
        :before-close="handleClose"
        >
            <el-table
                :data="tableData"
                style="margin-bottom: 20px;"
                row-key="moduleId"
                @selection-change="handleSelectionChange"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                prop="moduleId"
                label="ID"
                width="120"
                >
                </el-table-column>
                <el-table-column :label="item.labelName" v-for="(item,index) in allLevel" v-bind:key="index" width="150">
                    <template slot-scope="scope" v-if="scope.row.moduleLevel == item.level">
                       <span >{{scope.row.moduleName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="moduleUrl"
                label="菜单地址"
                show-overflow-tooltip
                >
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleCancel">取 消</el-button>
                <el-button type="primary" size="small" @click="handleSubmit">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import Modules from '../../../api/json/modules'
    export default {
        props: ['editPower', 'roleId'],
        created() {
            this.tableData= Modules
        },
        data() {
            return {
                multipleSelection: [],
                tableData: [],
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
            }
        },
        computed: {
            dialogVisible: {
                get() {
                    return this.editPower
                },
                set() {

                }
            },
        },
        methods: {
            handleClose() {
                this.$confirm('确认关闭？').then(_ => {
                   this.$emit('cancelShow', false)
                }).catch(_ => {});
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCancel() {
                this.handleClose()
            },
            handleSubmit() {
                alert('save')
                this.$emit('cancelShow', false)
            }
        }
    }
</script>