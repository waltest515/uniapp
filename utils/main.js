import Request from './request.js'

class methods extends Request {

    constructor() {
        super()
    }

    post(aurl,Parma) {
        return super.request(aurl,{
            method: 'POST',
            ...Parma
        })
    }

    get(aurl,Parma) {
        return super.request(aurl,{
            ...Parma
        })
    }

    /**
     * @description 图片上传
     * @param { String } filePath 选中图片路径
     * */
    upLoad(filePath, extData = {}) {
        return super.uploadimg(filePath, extData)
    }
}

const REQ = new methods()

export default REQ
