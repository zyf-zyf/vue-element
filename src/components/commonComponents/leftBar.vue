<template>
    <div class="left-bar">
        <el-aside style="background-color: #fff; width: 100%">
            
        <div class="logo">
            <div class="block"><img :class="iss ? 'img-56' : 'img-200'" src="../../assets/logo.png"/></div>
        </div>
        <el-menu :unique-opened	="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="iss" router :default-active="$route.path" v-if="Menu">
            <el-submenu  v-for="(item) in Menu" :key="item.id" :index="item.path">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
                </template>
                <el-menu-item v-for="itemo in item.children" :key="itemo.id" :index="itemo.path">{{itemo.title}}</el-menu-item>
            </el-submenu>
        </el-menu>
      </el-aside>
    </div>
</template>
<script>
    import Menu from '../../api/menu'
    export default {
        computed: {
            iss() {
                return this.$store.state.isOpen
            }
        },
        created() {
            this.Menu= Menu
        },
        data() {
            return {
                isCollapse: this.$store.state.isOpen || false,
                index: '',
                Menu: []
            }
        },

        mounted() {
            console.log(Menu, 'menu')
           
        },

        methods: {
            handleOpen(key, keyPath) {
                this.index= key
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
                text-align: left;
            }
           
        }
        .el-submenu .el-menu-item{
            min-width: 180px!important;
            
        }
        .el-submenu .is-opened .el-submenu__title {
            box-shadow: 1px 10px 20px 0px 
            rgba(230, 0, 18, 0.15);
            border-radius: 10px;
            i {
                color: red !important;
            }
        }
      

    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        box-sizing: border-box;
        padding:0 10px;
    }
    
</style>

