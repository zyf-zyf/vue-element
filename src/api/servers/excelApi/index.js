//excel表格下载封装

import axios from 'axios'
import {showLoading, hideLoading} from '../../commonJs/loading'
import{Message} from 'element-ui'

const downLoadExcelApi= {

    downLoadExcel: (url,params, name) =>{
        let instance = axios.create({ 
            responseType: 'blob', //返回数据的格式，可选值为arraybuffer,blob,document,json,text,stream，默认值为json
            onDownloadProgress: function (progressEvent) {
            // 对原生进度事件的处理         
                //    progress = +((progressEvent.loaded/progressEvent.total)*100).toFixed(1)
                //    store.dispatch('checkProgress', progress)
                //    if(progress == 100) {
                //        store.dispatch('checkProgress', 0)
                //        store.dispatch('isProgress', false)
                //    }else {
                //        store.dispatch('checkProgress', progress)
                //        store.dispatch('isProgress', true)
                //    }
        
            },
        })
        showLoading()
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
                    window.navigator.msSaveOrOpenBlob(blob, name +'.xlsx');
                    hideLoading()
                } else {
                    var downloadElement = document.createElement('a');
                　　 var href = window.URL.createObjectURL(blob); //创建下载的链接
                　　 downloadElement.href = href;
                    downloadElement.download = name ; //下载后文件名application/ms-excel
                　　 document.body.appendChild(downloadElement);
                　　 downloadElement.click(); //点击下载
                　　 document.body.removeChild(downloadElement); //下载完成移除元素
                　　 window.URL.revokeObjectURL(href); //释放掉blo 
                    hideLoading()
                }
            }
        }).catch(err => {
            console.log(err, 'err')
            Message({
                message: err.message,
                type: 'error',
                duration: 2000,
                showClose: true
            })
            hideLoading()
        })
    }
}
export default downLoadExcelApi;
