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

// 设置请求头 sessionId
service.defaults.headers.common['sessionId'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjJ9._ZUB9LlikWZknaetvmOq3-aQYKyyMY_zedd80JRYiUU';

// post请求头 application/json
// service.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//  service.defaults.headers['Content-Type'] = 'application/json';

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
       // httpLoadingStr()
        showLoading();
        return config;
    },
    error => {
        console.log(error, 'error-http')
        //httpLoadingEnd()
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
            //httpLoadingEnd()
            hideLoading();
            return Promise.resolve(data)
        }else{
            errorHandle(data.code, data.message)
            //httpLoadingEnd()
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




