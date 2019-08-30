/** 网络请求封装 包含请求成功失败拦截 loading加载关闭 */

import axios from 'axios'
import{Message} from 'element-ui'
import {showLoading, hideLoading} from './loading'

console.log(process.env.BASE_API, 'process.env.BASE_API')
/** axios 封装 */
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    //baseURL: '/youbao',
    headers: {
        'Content-Type': 'application/json'
    },
   
    timeout: 30000, // 网络请求超时 30s
    onUploadProgress: function (progressEvent) {  // `onUploadProgress` 允许为上传处理进度事件
        //console.log(progressEvent, 'progressEvent')
        // Do whatever you want with the native progress event
    },
    onDownloadProgress: function (progressEvent) { // `onDownloadProgress` 允许为下载处理进度事件
       // console.log(progressEvent, 'progressEvent')
        // 对原生进度事件的处理
    },
})

// 请求拦截器
service.interceptors.request.use(
    config => {
 
        showLoading();
        return config;
    },
    error => {
        console.log(error, 'error-http')

        hideLoading();
        return Promise.error(error);
    }
)

// 请求成功信息
const successHandle= (msg) => {
    if(msg && msg != undefined) {
        Message({
            message: msg,
            type: 'success',
            duration: 2000,
            showClose: true
        })
    }
}

// 错误信息
const errorHandle = (code, other) => {
    // 状态码判断
    switch (code) {
        case '404':
            Message({
                message: '请求资源不存在',
                type: 'error',
                duration: 2000,
                showClose: true
            })
            break;
        // 500 sessionID 认证错误
        case '500':
            Message({
                message: '认证失败',
                duration: 2000,
                type: 'error',
                showClose: true
            });
            
            break;
        
        // 其他错误，直接抛出错误提示
        default:
            console.log(other, 'other')
            Message({
                message: other,
                duration: 2000,
                type: 'error',
                showClose: true
            });
    }
}

// 响应拦截器
service.interceptors.response.use(
    // 请求成功
    res => {
        let data= res.data
        if(data.code == 200 ||(data.hash && data.key)) {
           // successHandle(data.message) 成功提示暂时关闭

            hideLoading();
            return Promise.resolve(data)
        }else{
            errorHandle(data.code, data.message)
     
            hideLoading();
            return Promise.reject(data)
        }
      
        
    },
    // 请求失败
    error => {
        console.log(error, 'error')
        const { response } = error;
        if (response) {
            console.log(response, 'response')
            // 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data.message);
            hideLoading()
            return Promise.reject(response);
        } else {
            Message({
                message: '请求服务失败',
                type: 'error',
                duration: 2000,
                showClose: true
            })
            hideLoading()
        }
    });
export default service;




