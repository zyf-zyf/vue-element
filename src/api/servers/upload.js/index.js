import httpRequest from '../../commonJs/http'
import axios from 'axios'
import {Message} from 'element-ui'
const qiniuBaseUrl=  'https://goods.dingdian.xin/' 
const getQiniuToken= '/ddaigo-platform/multiMedia/uploadImg'

const uploadApi= {
    
    getQiniuToken() {
        httpRequest.get(getQiniuToken, {
            params: {
                wxUid: "",
                wxSid: ""
            }
        })
        .then(res => {
            console.log(res, 'res')
            return res.uptoken
        }).catch(err => {
            console.log(err, 'err')
        })
    }, 
    imagesList: [],

    uploadImgToQiniu(filetext, type) {
        console.log(filetext, 'filetext')
        if(type == 'less') {
            this.imagesList= []
        }
        let axiosd= axios.create({
            baseURL: process.env.BASE_API,
        })
        axiosd.defaults.headers.common['sessionId'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjJ9._ZUB9LlikWZknaetvmOq3-aQYKyyMY_zedd80JRYiUU';
        httpRequest.get(getQiniuToken, {
            params: {
                wxUid: "",
                wxSid: ""
            }
        }).then(res => {
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            let formdata = new FormData(); //创建form对象
            formdata.append("file", filetext, filetext.name);
            formdata.append("chunk", "0"); //断点传输
            formdata.append("chunks", "1");
            formdata.append("token", res.uptoken );
            //  let token = 
            httpRequest.post("http://up-z1.qiniup.com", formdata, config).then(res2 => {
                console.log(res2, 'res2')
                if (res2.key != "") {
                    Message.success("图片上传成功");
                    this.imagesList.push(qiniuBaseUrl + res2.key + "?imageMogr2/thumbnail/400000@")   
                }
            })

        })
        
        return this.imagesList;

    }
}
export default uploadApi;