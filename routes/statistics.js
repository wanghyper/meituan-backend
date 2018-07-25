const express = require('express');
const Statistic = require('../controller/v1/statistic');
const Auth = require('../controller/admin/auth');

const router = express.Router();
router.get('/count/user', Auth.authAdmin, Statistic.userCount);       //获取当天新增用户数量
router.get('/count/order', Auth.authAdmin, Statistic.orderCount);     //获取当天新增订单数量

router.get('/all/user', Auth.authAdmin, Statistic.allUserCount);  //获取所有用户数量
router.get('/all/order', Auth.authAdmin, Statistic.allOrderCount);   //获取所有订单数量

router.get('/count/restaurant', Auth.authAdmin, Statistic.restaurantCount);      //餐馆数量
module.exports = router;