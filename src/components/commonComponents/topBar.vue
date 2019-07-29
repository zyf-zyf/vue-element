<template>
    <div class="top-bar">
        <el-header style="text-align: right; font-size: 16px; height: 50px;">
            <div class="left-icon" @click="handleClickFold">
                <i :class="!isOpenMenu ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
            </div>
           
            <div class="right-icon">
                <i class="el-icon-search"></i>
                <el-badge :value="200" :max="99" class="item">
                    <i class="el-icon-bell"></i>
                </el-badge>
                <el-dropdown>
                    <div class="userInfo el-dropdown-link">
                        <div class="userInfo el-dropdown-link"  style="width: 20px; height: 20px;margin-right: 10px">
                        <!-- <el-avatar style="width: 20px; height: 20px;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar> -->
                        <span class="iconfont icon-icon_addperson"></span>

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
       
        <div class="title-box" v-if="$route.meta.title">
            <el-breadcrumb separator="/" style="height: 40px; line-height: 40px; margin-left: 20px">
                
                <el-breadcrumb-item>{{$route.meta.parentName}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.meta.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <h2 class="title">{{$route.meta.title}}</h2>
        </div>
        <div class="attributeMaintenance" v-if="$route.name == 'attributeMaintenance'"> 
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基础属性" name="first"></el-tab-pane>
                <el-tab-pane label="自定义属性" name="second"></el-tab-pane>
                
            </el-tabs>
        </div>
     
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
                this.$store.dispatch('isActivite',this.activeName)
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
    .title-box {
        .title {
            margin-left: 20px;
            line-height: 40px;
        }
    }
    .attributeMaintenance {
        padding-left: 30px;
        button {
            border: none ;
            height: 32px;
            font-size: 16px;
            box-sizing: border-box;
            padding: 5px 10px;
        }
        .isactivite {
            color: red;
            border-bottom: 1px solid blue;
        }
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
