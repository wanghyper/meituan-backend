const express = require('express');
const Cites = require('../controller/v1/cites');
const Restaurant = require('../controller/v1/restaurant');
const Order = require('../controller/v1/order');
const Comment = require('../controller/v1/comment');
const Foods = require('../controller/v1/foods');
const Pay = require('../controller/v1/pay');
const Auth = require('../controller/admin/auth');

const router = express.Router();
router.get("/suggestion", Cites.suggestion);               //地址位置搜索
router.get("/location", Cites.location);                 //定位

router.get('/restaurants', Restaurant.getRestaurants);       //获取多家餐馆
router.get('/restaurant/:restaurant_id', Restaurant.getRestaurant);          //获取指定餐馆信息
router.post('/restaurant', Restaurant.addRestaurant);          //添加商家
router.get('/search/restaurant', Restaurant.searchRestaurant);  //搜索商家
router.get('/my_restaurant', Auth.authAdmin, Restaurant.myRestaurant);      //获取我的餐馆

router.post('/category', Foods.addCategory);         //添加食物分类
router.get('/category/:restaurant_id', Restaurant.getCategory);    //获取指定餐馆食物分类
router.post('/food', Auth.authAdmin, Foods.addFood);         //添加食物
router.get('/food/:restaurant_id', Restaurant.getFoods);         //获取指定餐馆食物列表
router.delete('/food/:food_id', Auth.authAdmin, Foods.deleteFood);      //删除食物

//评价
router.get('/comment', Comment.getComment);     //获取餐馆评论
router.post('/comment', Auth.authUser, Comment.makeComment);        //评论
router.get('/my_comment', Auth.authUser, Comment.myComment);        //获取我的评论
router.get('/comment_count', Comment.commentCount);      //获取评论数量
router.get('/my_restaurant_comment', Auth.authAdmin, Comment.myRestaurantComment);     //获取我的餐馆评论
router.delete('/comment', Auth.authUser, Comment.deleteComment);              //删除评论

//订单
router.post('/order', Auth.authUser, Order.makeOrder);         //下订单
router.get('/orders', Auth.authUser, Order.getOrders);             //获取订单列表
router.get('/order/:order_id', Auth.authUser, Order.getOrder);             //获取指定订单

//支付
router.post('/pay', Auth.authUser, Pay.initPay);                    //初始化支付
router.post('/notify_url', Pay.payNotice);            //支付异步通知
router.get('/listen_status', Auth.authUser, Pay.listenStatus);          //监听扫描结果
module.exports = router;
