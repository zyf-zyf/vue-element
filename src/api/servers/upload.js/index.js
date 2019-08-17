import httpRequest from '../../commonJs/http'
import axios from 'axios'
import {Message} from 'element-ui'
const qiniuBaseUrl=  'https://goods.dingdian.xin/' 
const getQiniuToken= '/product/api/qiniu/token/img' /**上传图片获取七牛token */

const uploadApi= {
    
   /*async getQiniuToken() {
    return await httpRequest.get(getQiniuToken, {
            params: {
                wxUid: "",
                wxSid: ""
            }
        }).then(res => {
            console.log(res, 'res-token')
            return res;
        }).catch(err => {
            console.log(err, 'err-token')
            return err
        })
    }, */
    imagesList: [],
    uploadImgToQiniu(filetext, type) {
        //let token = await this.getQiniuToken()
        console.log(filetext, 'filetext')
        if(type == 'less') {
            this.imagesList= []
        }
        // let axiosd= axios.create({
        //     baseURL: process.env.BASE_API,
        // })
        // axiosd.defaults.headers.common['sessionId'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjJ9._ZUB9LlikWZknaetvmOq3-aQYKyyMY_zedd80JRYiUU';
        httpRequest.get(getQiniuToken).then(res => {
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            let formdata = new FormData(); //创建form对象
            formdata.append("file", filetext, filetext.name);
            formdata.append("chunk", "0"); //断点传输
            formdata.append("chunks", "1");
            formdata.append("token", res.data );
            //  let token = 
            httpRequest.post("http://up-z1.qiniup.com", formdata, config).then(res2 => {
                console.log(res2, 'res2')
                if (res2.key != "") {
                    Message.success("图片上传成功");
                    this.imagesList.push(qiniuBaseUrl + res2.key + "?imageMogr2/thumbnail/400000@")   
                }
            }).catch((err) => {
                console.log(err)
            })

        })
        
        return this.imagesList;

    }
}
export default uploadApi;