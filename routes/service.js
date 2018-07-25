const express = require('express');
const Qiniu = require('../controller/v1/qiniu');
const Auth = require('../controller/admin/auth');

const router = express.Router();

//七牛云上次凭证
router.get('/uploadtoken', Auth.authUser, Qiniu.uploadToken);
module.exports = router;