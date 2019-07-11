<template>
  <div id="app">
   
    <el-container style="height: 100%; border: 1px solid #eee">
      <leftBar></leftBar>
      <el-container style="flex-direction: column;">
        <topBar></topBar>
        <el-main>
           <router-view class="fixed"></router-view>
           <div class="fotter-bg">
             <div class="help">
               <el-button type="text">帮助</el-button>
               <el-button type="text">帮助</el-button>
               <el-button type="text">帮助</el-button>
             </div>
             <h3>2019 叮当科技产品设计部出品</h3>
           </div>
        </el-main>
   
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import leftBar from './components/commonComponents/leftBar'
  import topBar from './components/commonComponents/topBar'
  export default {
    components: {
      leftBar, topBar
    },
    computed: {
      
    },
    data() {
      return {
        screenWidth: document.body.clientWidth,
        timer: false
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
      }
    },

    mounted() {
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
       background: rgb(238, 241, 246);
       position: relative;
       .fixed {
         position: absolute;
         top: 20px;
         bottom: 60px;
         left: 10px;
         right: 10px;
         overflow: auto;
       }
       .fotter-bg {
         position: absolute;
         bottom: 0;
         left: 0;
         right: 0;
         .help {
           display: flex;
           justify-content: center;
         }
         h3 {
           text-align: center
         }

       }
    }
  }
</style>
