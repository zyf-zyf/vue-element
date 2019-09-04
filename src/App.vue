<template>
  <div id="app" style="min-width: 1200px">
   
    <el-container v-if="$route.path.search('login')<0 && $route.path.search('register')<0" style="height: 100%; border: 1px solid #eee">
      <leftBar></leftBar>
      <el-container style="flex-direction: column;">
        <topBar></topBar>
        <el-main>

          <div :class="$route.name != 'home' ? 'out-div' : 'index-home'" >
            <div class="routerview">
              <router-view class="fixed"></router-view>
            </div>
            <!-- <div id="footer">
              <p class="a-box">
                <a href="/">条款</a>
                <a href="/">帮助</a>
                <a href="/">隐私</a>
              </p>
              <p class="text">copyright 2019叮当科技产品设计部出品</p>
            </div> -->
          </div>
        </el-main>
   
      </el-container>
    </el-container>
    <login v-if="$route.path.search('login') > 0"></login> 
  </div>
</template>

<script>
 
  import leftBar from './components/commonComponents/leftBar'
  import topBar from './components/commonComponents/topBar'
  import login from './components/commonComponents/login'
  export default {
    components: {
      leftBar, topBar, login
    },
    computed: {
      isddd() {
       
      }
    },
    data() {
      return {
        screenWidth: document.body.clientWidth,
        timer: false,
        isLogin: this.$route.path
      }
    },
    watch: {
      screenWidth (val) {
        if (!this.timer) {
            this.screenWidth = val
            if(this.screenWidth < 760) {
              this.$store.dispatch('openMenu', true)
            }else{
              this.$store.dispatch('openMenu', false)
            }
        }
      },
      isLogin(val) {
        console.log(val)
      }
    },
    mounted() {
      console.log('app', '------------------------------------')
      if(this.screenWidth < 760) {
        this.$store.dispatch('openMenu', true)
      }
      const that = this;
      window.addEventListener("resize", function() {
        return (() => {
          window.screenWidth= document.body.clientWidth;
          that.screenWidth= window.screenWidth;
          
        })();
      });
    },
    methods: {
  
    }
  };
</script>

<style lang="less">
  @import url('./style/index.less');
  #app {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .el-main {
       background: #f4f4f4;
       position: relative;
       .out-div {
         overflow: auto;
         position: absolute;
         top: 0px;
         left: 0;
         right: 0;
         bottom: 0;
       }
       .index-home {
         overflow: auto;
         position: absolute;
         top: 0px;
         left: 0;
         right: 0;
         bottom: 0;
       }
       .routerview {
           min-height: calc(100% - 65px);
           box-sizing: border-box;
           padding: 20px;
       }
       #footer {
         height: 60px;
         text-align: center;
         box-sizing: border-box;
         padding: 10px 0;
         p a {
           font-size: 16px;
           line-height: 16px;
           width: 32px;
           margin:0 20px;
           font-weight: normal;
           color: #999;
    
         }
         .text{
 
           font-size: 12px;
           color: #999;
         }
       }
    }
  }
</style>

