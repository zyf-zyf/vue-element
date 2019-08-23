import httpRequest from '../../commonJs/http'
import {Message} from 'element-ui'
const qiniuBaseUrl=  'https://goods.dingdian.xin/' 
const getQiniuToken= '/product/api/qiniu/token/img' /**上传图片获取七牛token */


const uploadApi= {
    imagesList: [],
    async uploadImgToQiniu(filetext, type) {
        console.log('123')
        var that= this
        if(type == 'less') {
            this.imagesList= []
        }
        
        await httpRequest.get(getQiniuToken).then(async res => {
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            let formdata = new FormData(); //创建form对象
            formdata.append("file", filetext, filetext.name);
            formdata.append("chunk", "0"); //断点传输
            formdata.append("chunks", "1");
            formdata.append("token", res.data );
            await httpRequest.post("http://up-z1.qiniup.com", formdata, config).then( res2 => {
                that.imagesList= []
                if (res2.key != "") {
                    Message.success("图片上传成功");
                    that.imagesList.push(qiniuBaseUrl + res2.key + "?imageMogr2/thumbnail/400000@")   
                }
            }).catch((err) => {
                console.log(err)
            })
        })
        console.log(this.imagesList, 'imagelist')
        return  this.imagesList;
    }
}
export default uploadApi;