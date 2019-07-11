<template>
  <div id="app">
   
    <el-container style="height: 100%; border: 1px solid #eee">
      <leftBar></leftBar>
      <el-container style="flex-direction: column">
        <topBar></topBar>
        <el-main>
           <router-view></router-view>
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
    }
  }
</style>
