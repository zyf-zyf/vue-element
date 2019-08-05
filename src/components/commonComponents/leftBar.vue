<template>
    <div class="left-bar">
        <el-aside style="background-color: #fff; width: 100%">
            
        <div class="logo">
            <div class="block"><img :class="iss ? 'img-56' : 'img-200'" src="../../assets/logo.png"/></div>
        </div>
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="iss" router :default-active="$route.path" >
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-s-goods"></i>
                    <span slot="title">商品管理</span>
                </template>
                <el-menu-item index="/goodsManagement/goods/goodsList">商品资料</el-menu-item>
                <el-menu-item index="/goodsManagement/category/categoryList">类目管理</el-menu-item>
                <el-menu-item index="/goodsManagement/attributes/attributeMaintenance">属性维护</el-menu-item>
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
            },
            isActive() {
                if(this.$route.path.split('/')[2] == 'goods') {
                    return true
                }
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
//@import url(../../style/leftBar.less);
    .logo {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
       
    }
    
    .el-aside {
        color: #333;
        height: 100%; 
    
        overflow: hidden;
      
        .el-menu--inline{
            height: 100%;
            width: 180px;
            overflow: hidden;
            overflow-y: scroll;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            
            .is-active {
                background: #ff7068;
                border-radius: 10px;
                color: #fff;
               
            }
         
            .el-menu-item {
                box-sizing: border-box;
                width: 180px!important;
                text-align: center;
              //  padding: 0;
                padding: 0 !important;
                
            
            }
           
        }
        .el-submenu .el-menu-item{
            min-width: 180px!important;
            
        }
        .el-submenu .is-opened .el-submenu__title {
            box-shadow: 1px 10px 20px 0px 
            rgba(230, 0, 18, 0.15);
            border-radius: 10px;
        }

    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        box-sizing: border-box;
        padding:0 10px;
    }
    
</style>

