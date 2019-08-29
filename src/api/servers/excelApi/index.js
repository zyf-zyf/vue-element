//excel表格下载封装

import axios from 'axios'
import{Message, Loading} from 'element-ui'
import store from '../../../store'

const downLoadExcelApi= {
    /**get请求下载 */
    downLoadExcel: (obj) =>{
        let url= obj.url
        let fileName= obj.name
        let instance = axios.create({ 
            responseType: 'blob', //返回数据的格式，可选值为arraybuffer,blob,document,json,text,stream，默认值为json
            // onDownloadProgress: function (progressEvent) {
            // // 对原生进度事件的处理         
            //     progress = +((progressEvent.loaded/progressEvent.total)*100).toFixed(1)
            //     console.log(progress, 'progress')
            //     store.dispatch('changeProgress', progress)
            // },
        })
       // instance.defaults.headers.common['sessionId'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjJ9._ZUB9LlikWZknaetvmOq3-aQYKyyMY_zedd80JRYiUU';
        const loading = Loading.service({
            lock: true,
            text: '数据下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        instance.get(url).then(res=>{
            if(res.data.size <=0 ) {
               Message({
                    message: '没有符合条件的数据，以供下载！！！！！',
                    type: 'success',
                    duration: 2000,
                    showClose: true
                })
            } else {
                var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8这里表示xlsx类型　
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob, fileName +'.xlsx');
             
                } else {
                    var downloadElement = document.createElement('a');
                　　 var href = window.URL.createObjectURL(blob); //创建下载的链接
                　　 downloadElement.href = href;
                    downloadElement.download= fileName ; //下载后文件名application/ms-excel

                　　 document.body.appendChild(downloadElement);
                　　 downloadElement.click(); //点击下载
                　　 document.body.removeChild(downloadElement); //下载完成移除元素
                　　 window.URL.revokeObjectURL(href); //释放掉blo 
                }
            }
            loading.close()
        }).catch(err => {
            console.log(err, 'err')
            Message({
                message: err.message,
                type: 'error',
                duration: 2000,
                showClose: true
            })
            loading.close()
        })
    },
    /**post请求下载 */
    downLoadExcelPost: (obj) =>{
        console.log(obj, 'post')
        let url= obj.url
        let fileName= obj.name
        let params= obj.params
        let instance = axios.create({ 
            responseType: 'blob', //返回数据的格式，可选值为arraybuffer,blob,document,json,text,stream，默认值为json
            // onDownloadProgress: function (progressEvent) {
            // // 对原生进度事件的处理         
            //     progress = +((progressEvent.loaded/progressEvent.total)*100).toFixed(1)
            //     console.log(progress, 'progress')
            //     store.dispatch('changeProgress', progress)
            // },
        })
       // instance.defaults.headers.common['sessionId'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjJ9._ZUB9LlikWZknaetvmOq3-aQYKyyMY_zedd80JRYiUU';
        const loading = Loading.service({
            lock: true,
            text: '数据下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        instance.post(url, params).then(res=>{
            if(res.data.size <=0 ) {
               Message({
                    message: '没有符合条件的数据，以供下载！！！！！',
                    type: 'success',
                    duration: 2000,
                    showClose: true
                })
            } else {
                var blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8这里表示xlsx类型　
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob, fileName +'.xlsx');
             
                } else {
                    var downloadElement = document.createElement('a');
                　　 var href = window.URL.createObjectURL(blob); //创建下载的链接
                　　 downloadElement.href = href;
                    downloadElement.download= fileName ; //下载后文件名application/ms-excel

                　　 document.body.appendChild(downloadElement);
                　　 downloadElement.click(); //点击下载
                　　 document.body.removeChild(downloadElement); //下载完成移除元素
                　　 window.URL.revokeObjectURL(href); //释放掉blo 
                }
            }
            loading.close()
        }).catch(err => {
            console.log(err, 'err')
            Message({
                message: err.message,
                type: 'error',
                duration: 2000,
                showClose: true
            })
            loading.close()
        })
    }
}
export default downLoadExcelApi;
