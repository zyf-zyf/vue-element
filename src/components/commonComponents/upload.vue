<template>
    <div v-if="isClear">
        <div class="img-box" v-if="imgArr.length > 0">
            <div class="img" v-for="(item, index) in imgArr" :key="index">
                <el-avatar shape="square" :size="150" fit="cover" :src="item"></el-avatar>
                <i class="el-icon-close" @click="handleDelImg(index)"></i>
            </div>   
        </div>
        <template v-if="imgArr.length < maxlength && uploadType== 'more'">
            <div class="upload-box">
                <div class="upload">
                    <div>
                        <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" multiple @change="upload($event)" />
                        <i class="el-icon-plus"></i>
                        <small>选择文件</small>
                    </div>
                </div>
                <span v-if="uploadimgsize && uploadimgsize != ''">文件大小不超过{{uploadimgsize}}</span>
            </div>
                <span>支持扩展名: .png/ .jpg ....</span>
        </template>
        <template v-if="uploadType== 'less'">
            <div class="upload-box">
                <div class="upload">
                    <div>
                        <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg"  @change="upload($event)" />
                        <i class="el-icon-plus"></i>
                        <small>{{imgArr.length == 0 ? '选择文件' : '点击更换'}}</small>
                    </div>
                </div>
                <span v-if="uploadimgsize && uploadimgsize != ''">文件大小不超过{{uploadimgsize}}</span>
            </div>
                <span>支持扩展名: .png/ .jpg ....</span>
        </template>
    </div>
</template>
<script>
    export default {
        props: ['materialImg', 'maxLength', 'uploadtype', 'imgsize', 'isClear'],
        computed: {
            isCleared() {
                if(!this.isClear) {
                    this.imgArr= []
                }
            },
        },
        
        data() {
            return {
                imgArr: this.materialImg,
                maxlength: this.maxLength,
                uploadType: this.uploadtype,
                uploadimgsize: this.imgsize,
            }
        },

        methods: {
            handleDelImg(idx) {
                this.$emit('handleDelImg', idx)
            },
            upload(e) {  
                if(this.uploadtype == 'less') {
                    var file= e.target.files[0]
                    if(this.uploadimgsize && this.uploadimgsize !== '') {
                        if(this.limtSize(file)) {
                            this.imgArr= this.$server.uploadApi.uploadImgToQiniu(file, this.uploadType)
                        }
                    }else{
                        this.imgArr= this.$server.uploadApi.uploadImgToQiniu(file, this.uploadType)
                        
                    }
                }else{
                    let files= e.target.files
                    for(var i=0; i < files.length; i++) {
                        if(this.uploadimgsize && this.uploadimgsize !== '') {
                            if(this.limtSize(files[i])) {
                                this.$server.uploadApi.uploadImgToQiniu(files[i], this.uploadType).then(res => {
                                    this.imgArr.push(res[0])
                                })
                            }
                        }else{
                            this.$server.uploadApi.uploadImgToQiniu(files[i], this.uploadType).then(res => {
                                console.log(res, 'data')
                                this.imgArr.push(res[0])
                            })
                            
                        }
                    }
                }
                console.log(this.imgArr, 'await')
                this.changeMaterialImg()
            },
            limtSize(file) {
                if(file.size/1024/1024 > this.uploadimgsize) {
                    this.$message({
                        message: '所选文件超出限制大小',
                        type: 'error',
                        duration: 1000
                    })
                    return false;
                }else{
                    return true;
                }
                
            },
            // 改变父组件
            changeMaterialImg () {
                console.log(this.imgArr, 'imgArr')
                this.$emit('changeMaterialImg', this.imgArr)
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
