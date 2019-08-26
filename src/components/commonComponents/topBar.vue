<template>
    <div class="top-bar">
        <el-header style="text-align: right; font-size: 16px; height: 50px;">
            <div class="left-icon" @click="handleClickFold">
                <i style="color: #ff7068" :class="!isOpenMenu ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
            </div>
           
            <div class="right-icon">
                <i class="el-icon-search"></i>
                <el-badge :value="200" :max="99" class="item">
                    <i class="el-icon-bell"></i>
                </el-badge>
                <el-dropdown trigger='click'>
                    <div class="userInfo el-dropdown-link">
                        <div class="userInfo el-dropdown-link"  style="width: 20px; height: 20px;margin-right: 10px">
                        <el-avatar style="width: 20px; height: 20px;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  
                        </div>
                        <span>叮当科技</span>
                    </div>
                    
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> 
            </div>
        </el-header>
        <!-- <el-card> -->
            <div :class="!$route.meta.tabList ? 'istitle-box' : 'title-box'" v-if="$route.meta.title">
                <el-breadcrumb separator="/" style="line-height: 38px; margin-left: 20px">
                    
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
        <!-- </el-card> -->
 
     
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
                isOpenMenu: this.$store.state.isOpen || false,
                activeName: 'first'
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
        line-height: 50px;
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
        height: 68px;
        .title {
            font-size: 20px;
            margin-left: 20px;
            font-weight: normal;
            color:#474747;
            box-sizing: border-box;
         
        }
    }
    .istitle-box{
        border-bottom: 1px solid #eee;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
    }
    .attributeMaintenance {
        height: 50px;
        box-sizing: border-box;
        padding-top:10px;
        padding-left: 30px;
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
