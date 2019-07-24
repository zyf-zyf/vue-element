/* 
    try{}catch(err){} 捕捉前端网络请求传参 错误信息封装 错误码：0000/前端错误
*/
import {Message} from 'element-ui'
const paramsError= (error) => {
    console.log(process.env.NODE_ENV, '环境')
    console.log(error, 'error')
    let type= process.env.NODE_ENV != 'production' ? 'warning' : 'error'

    let erroroading=  new Message({
        message: '0000: '+error,
        type: type,
        duration: 2000,
        showClose: true
    })
    return erroroading;
}

export default paramsError;