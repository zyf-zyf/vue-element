<template>
    <div class="left-bar">
        <el-aside style="background-color: rgb(238, 241, 246); width: 100%">
            
        <div class="logo">
            <div class="block"><el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar></div>
        </div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="iss" router>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">商品管理</span>
                </template>
                <el-menu-item index="/goodsManagement/goodsList">商品资料</el-menu-item>
                <el-menu-item index="1-2">类目管理</el-menu-item>
                <el-menu-item index="1-3">属性管理</el-menu-item>
            </el-submenu>
        </el-menu>


      </el-aside>
    </div>
</template>
<script>
    export default {
        computed: {
            iss() {
                return this.$store.state.isOpen
            }
        },
        data() {
            return {
                isCollapse: this.$store.state.isOpen || false
            }
        },

        mounted() {
       
           
        },

        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style lang="less" scoped>
    .logo {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
       
    }
    
    .el-aside {
        color: #333;
        height: 100%; 
    
        overflow: hidden;
        .el-menu{
            height: 100%;
            overflow: hidden;
            overflow-y: scroll;
            .el-menu-item {
                padding-left: 60px !important;
            }
        }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
       
    }
</style>

