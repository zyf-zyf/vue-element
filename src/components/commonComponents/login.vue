<template>
    <div id="login">
        <div class="left-bg">
            <div class="bg-content">
                <img class="bg-logo" src="../../assets/login/logo.png" alt="">
                <h1>优爆名品管理系统</h1>
                <h3>让管理变得更简单</h3>
            </div>
        </div>
        <div class="right-form">
            <div class="form-content">
                <h2>管理系统登录</h2>
                <el-input type="text" placeholder="请输入用户名" :suffix-icon="yonghuming" v-model="userAccount" @change="handleChangeuserAccount"></el-input>
                <el-input type="passWord" placeholder="请输入密码" v-model="passWord" :suffix-icon="mima" @change="handleChangePassword"></el-input>
                <el-button @click="handleClickLogin">立即登录</el-button>
                <el-checkbox v-model="checked">记住密码</el-checkbox>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                checked: false,
                yonghuming: 'iconfont icon-yonghuming',
                mima: 'iconfont icon-mima',
                userAccount: '',
                passWord: ''
            }
        },
        methods: {
            handleChangeuserAccount() {
                this.yonghuming= 'iconfont icon-yonghuming-'
            },
            handleChangePassword() {
                this.mima= 'iconfont icon-mima-'
            },
            handleClickLogin() {
                this.$router.push({
                    name: 'home'
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    #login {  
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        .left-bg { 
            flex: 0.671875;
            height: 100%;
            background: url(../../assets/login/beijing.png);
            background-size: 100% 100%; 
            display: flex;
            align-items: center;
            justify-content: center;
            .bg-content {
                height: 300px;
                .bg-logo {
                    margin-bottom: 20px;
                }
                h1 {
                    font-size: 50px;
                    color: #fff;
                    font-family: PingFangSC-Semibold;
                    font-weight: normal;
                    letter-spacing: 2px;
                }
                h3 {
                    font-size: 18px;
                    color: #fff;
                    margin-top: 5px;
                    font-weight: 400;
                    letter-spacing: 1.5px;
                }
            }
        }
        .right-form {
            flex: 0.328125;
            height: 100%;
            background: #fff;
            display: flex;
            align-items: center;
            .form-content {
                width: 270px;
                min-height: 300px;
                margin: auto;
                h2 {
                    font-size: 28px;
                    margin-bottom: 30px;
                    color: #341b1c;
                    font-weight: normal;
                    font-family: PingFangSC-Semibold;
                }
                .el-input {
                    margin-bottom: 20px;
                }
                .el-button {
                    width: 100%;
                    background: #ff7068;
                    color: #fff;
                }
               
            }
        }


    }
</style>