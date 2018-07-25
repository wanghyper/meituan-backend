//七牛云上传token
const Config = require('../../config');
const qiniu = require('qiniu');

class Qiniu {
    constructor() {
        this.uploadToken = this.uploadToken.bind(this);
        this.mac = new qiniu.auth.digest.Mac(Config.AccessKey, Config.SecretKey);
        let options = {
            scope: Config.Bucket
        };
        this.putPolicy = new qiniu.rs.PutPolicy(options);
    }
    
    uploadToken(req, res, next) {
        let token = this.putPolicy.uploadToken(this.mac);
        if (token) {
            res.send({
                uptoken: token,
                message: '获取上传凭证成功',
                status: 200
            });
        } else {
            res.send({
                status: -1,
                message: '获取上传凭证失败'
            });
        }
    }
}

module.exports = new Qiniu();
