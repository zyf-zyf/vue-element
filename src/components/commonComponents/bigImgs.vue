<template>
    <div>
        <div class="common-bigImage">
            <el-dialog
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            @close="handleClose"
            >
                <el-carousel trigger="click" :autoplay="false"  height='100%'>
                    <el-carousel-item v-for="(item, index) in imageList" :key="index">
                        <el-image style="width: 600px; height: 600px;" :src="item" fit="contain"  :style="{transform:'rotateZ('+deg+'deg)'}"></el-image>
                        <i class="el-icon-refresh-right rotateRight" @click.prevent.stop="rotateRight"></i>   
                        <i class="el-icon-refresh-left rotateLeft" @click.prevent.stop="rotateLeft"></i> 
                    </el-carousel-item>
                </el-carousel>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['imageList', 'isdialogVisible'],
        computed: {
            dialogVisible: {
                get:function() {
                    return this.isdialogVisible
                },
                set: function() {
                    
                }
            }
        },
        data() {
            return {
                deg: 0
            }
        },
        methods: {
            handleClose() {
                this.$emit('cancelShow', false)
            },
            rotateRight() {
                this.deg += 90;
            },
            rotateLeft() {
                this.deg -= 90;
            }
        }
    }
</script>
<style lang="less" scoped>
    .common-bigImage {
        .el-dialog__header {
            padding: 0;
        }
        img {
            width: 100%;
         
        }
        .rotateRight, .rotateLeft {
            height: 23px;
            line-height: 23px;
            position: absolute;
            top: 0;
            color: red;
            font-size: 20px;
            cursor: pointer;
        }
        .rotateRight {
            right: 30px;
        }
        .rotateLeft {
            right: 60px;
        }

    }
</style>

