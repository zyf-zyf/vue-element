<template>
    <div id='uploadFile'>
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        class='upload-excel'
        top="20vh"
        :close-on-click-modal="false"
        :before-close="handleClose"
        >
            <el-upload
            class="upload-demo"
            :action="actionUrl"
            :multiple="multiple"
            :accept="acceptType"
            :limit="limtNum"
            :before-upload="handleBeforeUpload"
            :http-request="handleCustomUpload"
            :auto-upload= "false"
            :on-exceed="handleExceed"
            ref="upload"
            :file-list="fileList">
                <el-button slot="trigger" size="small" type="primary" :disabled="isDisabled">选择文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上 传</el-button>
                <div slot="tip" class="el-upload__tip">一次最多只能上传1个文件，格式为（.xlsx）</div>
            </el-upload>
            
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        props: ['isShowUpload', 'title'],
        data() {
            return {
                dialogVisible: this.isShowUpload,
                actionUrl: '',
                multiple: false,
                acceptType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
                limtNum: 1,
                fileList: [],
                isUpload: false,
                isDisabled: false
            }
        },
        methods: {
          
             /**弹框关闭 */
            handleClose(done) {
                this.$confirm('确认关闭？').then(_ => {
                    this.$emit('cancelShow', false)
                }).catch(_ => {});
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
            handleExceed(files, fileList) {
                this.$message.warning(`一次只可选择一个文件上传`);
            },
            /**文件上传前的处理函数 */
            handleBeforeUpload(file) {
                console.log(this.fileList)
            },
            /**手动上传 */
            submitUpload() {
                this.$confirm('确定上传该文件?').then(_ => {
                    this.$refs.upload.submit();
                }).catch(err => {
                    console.log('取消上传')
                })
            },
    
            /**自定义文件上传 */
            handleCustomUpload(params) {

                /**formdata */
                let _file= params.file
                let formData = new FormData();
                formData.append("filename", _file);
                formData.append("filename", _file.name);
                console.log(_file, 'file')
                this.$server.goodsControlApi.uploadGoods(formData).then(res => {
                    this.$emit('cancelShow', false)
                }).catch()
                
            }

        }
    }
</script>