<template>
    <div>
        <div class="img-box" v-if="imgArr.length > 0">
            <div class="img" v-for="(item, index) in imgArr" :key="index">
                <el-avatar shape="square" :size="150" fit="cover" :src="item"></el-avatar>
                <i class="el-icon-close" @click="handleDelImg(index)"></i>
            </div>   
        </div>
        <template v-if="imgArr.length < 9">
            <div class="upload-box">
                <div class="upload" style="">
                    <div>
                        <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" multiple @change="upload($event)" />
                        <i class="el-icon-plus"></i>
                        <small>选择文件</small>
                    </div>
                </div>
                <span>文件大小不超过5M</span>
            </div>
                <!-- <br/> -->
                <span>支持扩展名: .png/ .jpg ....</span>
        </template>
    </div>
</template>
<script>
    export default {
        props: ['materialImg', ],
        data() {
            return {
                imgArr: this.materialImg
            }
        },
        methods: {
            handleDelImg(idx) {
                this.$emit('handleDelImg', idx)
            },
            upload() {

            }
        }
    }
</script>
<style lang="less" scoped>
span {
    font-size: 12px;
    color: #666;
}
.upload-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
        font-size: 12px;
        color: #666;
    }
    .upload {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 32px;
        border: 1px solid #ccc;
        border-radius: 5px;
        position: relative;
        margin-right: 20px;
        input {
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 999;
            cursor: pointer;
        }
        i , small{
            font-size: 12px;
           // color: #ccc;
        }
    }
}
.img-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .img {
        margin: 5px;
        position: relative;
        i {
            position: absolute;
            top: 0; 
            right: 0;
            color: red;
            cursor: pointer;
        }
    }
}
</style>
