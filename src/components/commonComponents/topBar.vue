<template>
    <div class="top-bar">
        <el-header style="text-align: right; font-size: 16px; height: 40px;">
            <div class="left-icon" @click="handleClickFold">
                <i style="color: #ff7068" :class="!isOpenMenu ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
            </div>
            <div class="right-icon">
                <el-dropdown trigger='click'>
                    <div class="userInfo el-dropdown-link">
                        <div class="userInfo el-dropdown-link"  style="width: 20px; height: 20px;margin-right: 10px">
                            <el-avatar style="width: 20px; height: 20px;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </div>
                        <span>叮当科技</span>
                    </div>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item command="a" @click.native="handleLogout" >退出登录</el-dropdown-item>
                        <el-dropdown-item command="a" @click.native="dialogVisible= true" >修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> 
            </div>
        </el-header>
        <div :class="!$route.meta.tabList ? 'istitle-box' : 'title-box'" v-if="$route.meta.title">
            <el-breadcrumb separator=">" style="line-height: 20px; margin-left: 20px">
                <el-breadcrumb-item>{{$route.meta.parentName}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.meta.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <h2 class="title" >{{$route.meta.title}}</h2>
        </div>
        <div class="attributeMaintenance" v-if="$route.meta.tabList && $route.meta.tabList.length> 0 "> 
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane v-for="item in $route.meta.tabList" :label="item.label" :name="item.id" :key="item.id"></el-tab-pane>  
            </el-tabs>
        </div>
        <!-- 用户修改密码 -->
        <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"  v-model="form">
            <el-form label-width="100px">
                <el-form-item label='用户账号:'>
                    <el-input size="small" type='text' v-model="form.userAccount" ></el-input>
                </el-form-item>
                <el-form-item label="初始密码:">
                    <el-input size="small" type='password' v-model="form.passWord" ></el-input>
                </el-form-item> 
                <el-form-item class="password" label="设置密码:">
                    <el-input size="small" type='password' v-model="form.newPassWord" ></el-input>
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
        computed: {
            isOpen() {
                return this.$store.state.isOpen
            }
        },

        data() {
            return {
                userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
                isOpenMenu: this.$store.state.isOpen || false,
                activeName: 'first',
                dialogVisible: false,
                form: {
                    userAccount: JSON.parse(sessionStorage.getItem('userInfo')).userAccount || '' ,
                    passWord: JSON.parse(sessionStorage.getItem('userInfo')).passWord || '' ,
                    newPassWord: ''
                }
            }
        },

        methods: {
            handleClickFold() {
                this.isOpenMenu= !this.isOpenMenu
                this.$store.dispatch('openMenu', this.isOpenMenu)
            },
            handleClick() {
                if(this.$route.name == 'attributeMaintenance') {
                    this.$store.dispatch('isActiviteAttribute',this.activeName)
                }else if(this.$route.name == 'uniqueCodeList'){
                    this.$store.dispatch('isActiviteUniqueCode',this.activeName)
                }
            },
            handleLogout() {
                sessionStorage.clear()
                this.$router.push({name: 'login'})
            },
             /**弹框关闭 */
            handleClose(done) {
                this.$confirm('确认关闭？').then(_ => {
                    this.dialogVisible= false
                }).catch(_ => {});
            },
            handleSubmit() {
                this.dialogVisible= false
            }
        },

        mounted() {
            console.log(this.$route, 'route')
        }
    }
</script>

<style lang="less" scoped>
    .el-header {
        background-color: #474747;
        color: #333;
        line-height: 40px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        i {
            font-size: 20px;
        }
        .left-icon {
            cursor: pointer;
        }
        .left-icon:hover {
            animation-name: scaleDraw; /*关键帧名称*/
            animation-timing-function: ease-in-out; /*动画的速度曲线*/
            animation-iteration-count: infinite;  /*动画播放的次数*/
            animation-duration: 2s; /*动画所花费的时间*/

        }
        .right-icon {
            display: flex;
            align-items: center;
            .userInfo {
                display: flex;
                align-items: center;
            }
            i, .el-avatar>img {
                margin-right: 20px;
                
            }
            .el-avatar {
                line-height: 20px;
            }
        }
    }
    .title-box, .istitle-box {
        .title {
            font-size: 14px;
            margin-left: 20px;
            font-weight: normal;
            color:#474747;
            box-sizing: border-box;  
        }
    }
    .istitle-box{
        border-bottom: 1px solid #eee;
       
    }
    .attributeMaintenance {
        height: 40px;
        box-sizing: border-box;
        //padding-top:10px;
        padding-left: 20px;
        .isactivite {
            color: #e60012;
            border-bottom: 1px solid #e60012;
        }
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        
    }
    .el-dropdown-menu {
        min-width: 80px;
    }
    .el-breadcrumb {
        font-size: 12px;
    }
    .top-bar {
        box-shadow:inset 0px -1px 3px 1px rgba(173, 14, 14, 0.1)
    }
    @keyframes scaleDraw {  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
        0%{
            transform: scale(1);  /*开始为原始大小*/
        }
    
        50%{
            transform: scale(1.3);
        }
       
        100%{
            transform: scale(1);
        }
    }
  
</style>
