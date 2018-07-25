const express = require('express');
const Auth = require('../controller/admin/auth');
const Admin = require('../controller/admin/admin');

const router = express.Router();

router.post('/user_login', Admin.userLogin);     //用户登录
router.get('/user_info', Auth.authUser, Admin.userInfo);           //获取用户信息
router.post('/change_avatar', Auth.authUser, Admin.changeAvatar);  //改头像
router.post('/logout', Admin.logout);   //退出
router.post('/address', Auth.authUser, Admin.addAddress);      //添加收货地址
router.get('/all_address', Auth.authUser, Admin.getAllAddress);        //获取用户所有地址
router.get('/address', Auth.authAdmin, Admin.getAddress);             //管理端获取所有地址
router.post('/update_address', Auth.authUser, Admin.updateAddress);   //更新地址
router.delete('/address', Auth.authUser, Admin.deleteAddress);      //删除收获地址
router.get('/user_statistic', Auth.authAdmin, Admin.userStatistic);      //用户信息
module.exports = router;