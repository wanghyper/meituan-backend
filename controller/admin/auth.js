class Auth {
    authUser(req, res, next) {          //验证用户
        if (!req.session.user_id) {
            res.send({
                status: 403,
                message: '未登录'
            })
        } else {
            next();
        }
    }

    authAdmin(req, res, next) {           //验证管理者
        if (!req.session.admin_id) {
            res.send({
                status: 403,
                message: '未登录'
            })
        } else {
            next();
        }
    }
}

module.exports = new Auth();