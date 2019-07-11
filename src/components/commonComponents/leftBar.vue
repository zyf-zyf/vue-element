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
                <el-menu-item-group>
              
                <el-menu-item index="/goodsManagement/goodsList">商品列表</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
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
        }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
       
    }
</style>

