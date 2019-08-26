<template>
    <div>
        <el-dialog
        title="上传Excel"
        :visible.sync="dialogVisible"
        class='upload-excel'
        top="2vh"
        :close-on-click-modal="false"
        :before-close="handleClose"
        >
            <el-upload
            class="upload-demo"
            :action="actionUrl"
            :multiple="multiple"
            :accept="acceptType"
            :limit="limtNum"
            :on-change="handleChange"
            :on-success="handleSuccessUpload"
            :on-error="handleErrorUplod"
            :on-progress="handleUploadProgress"
            :before-upload="handleBeforeUpload"
            :http-request="handleCustomUpload"
            :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: ['isShow'],
        data() {
            return {
                dialogVisible: this.isShow,
                actionUrl: '',
                multiple: false,
                acceptType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
                limtNum: 1,
            }
        },
        methods: {
            /**关闭弹框 */
            handleClose() {
                this.$emit('cancelShow', false)
            },
            handleChange(file, fileList) {
                console.log(file, 'file')
                console.log(fileList, 'fileList')
            },
            /**文件上传成功 */
            handleSuccessUpload(response, file, fileList) {

            },
            /**文件上传失败 */
            handleErrorUplod(err, file, fileList) {

            },
            /**文件上传时 */
            handleUploadProgress(event, file, fileList) {

            },
            /**文件上传前的处理函数 */
            handleBeforeUpload(file) {

            },
            /**自定义文件上传 */
            handleCustomUpload(params) {
                console.log(params)
                /**formdata */
                let _file= params.file
                let formData = new FormData();
                formData.append("file", _file);
                
            }

        }
    }
</script>