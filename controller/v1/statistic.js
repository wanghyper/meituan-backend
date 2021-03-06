const AdminModel = require('../../models/admin/admin');
const OrderModel = require('../../models/v1/order');
const RestaurantModel = require('../../models/v1/restaurant');
const moment = require('moment');

class Statistic {
    constructor() {
        this.userCount = this.userCount.bind(this);
        this.orderCount = this.orderCount.bind(this);
    }
    
    //获取全部用户数量
    async allUserCount(req, res, next) {
        let status = req.query.status || 1;
        let message = status === 1 ? '获取全部用户数量' : '获取全部管理员数量';
        try {
            let count = await AdminModel.find({status}).count();
            res.send({
                status: 200,
                message: message + '成功',
                data: count
            });
        } catch (err) {
            console.log(`${message}失败${err}`);
            res.send({
                status: -1,
                message: message + '失败'
            });
        }
    }
    
    //获取当天新增用户数量或管理员数量
    async userCount(req, res, next) {
        let date = req.query.date ? new Date(req.query.date) : new Date();
        let dateFormat = this.dateFormat(date);
        let status = req.query.status ? req.query.status : 1;
        let message = status === 1 ? '获取当天新增用户数量成功' : '获取当天新增管理员数量成功';
        
        try {
            let count = await AdminModel.find({$and: [{create_time: {$gt: dateFormat.today}}, {create_time: {$lt: dateFormat.nextDay}}, {status}]}).count();
            res.send({
                status: 200,
                message,
                data: count
            });
        } catch (err) {
            console.log('获取用户数量失败', err);
            res.send({
                status: -1,
                message: '获取用户数量失败'
            });
        }
    }
    
    //获取订单数量
    async orderCount(req, res, next) {
        let date = req.query.date ? new Date(req.query.date) : new Date();
        let dateFormat = this.dateFormat(date);
        try {
            let count = await OrderModel.find({$and: [{create_time: {$gt: dateFormat.today}}, {create_time: {$lt: dateFormat.nextDay}}]}).count();
            res.send({
                status: 200,
                message: '获取订单数量成功',
                data: count
            });
        } catch (err) {
            console.log('获取订单数量失败', err);
            res.send({
                status: -1,
                message: '获取订单数量失败'
            });
        }
    }
    
    //获取所有订单数量
    async allOrderCount(req, res, next) {
        try {
            let count = await OrderModel.find({code: 200}).count();
            res.send({
                status: 200,
                message: '获取所有完成订单数量成功',
                data: count
            });
        } catch (err) {
            console.log('获取所有完成订单数量失败', err);
            res.send({
                status: -1,
                message: '获取所有完成订单数量失败'
            });
        }
    }
    
    //餐馆数量
    async restaurantCount(req, res, next) {
        try {
            let count = await RestaurantModel.find({}).count();
            res.send({
                status: 200,
                message: '获取餐馆数量成功',
                data: count
            });
        } catch (err) {
            console.log('获取餐馆数量失败');
            res.send({
                status: -1,
                message: '获取餐馆数量失败'
            });
        }
    }
    
    
    dateFormat(date) {
        let obj = {};
        let time = moment(date).format('YYYY-MM-DD');
        time = time.replace(/-/g, '/');  //转换 如2017-08-29 转为 2017/08/29
        obj.today = new Date(time);     //转为 Tue Aug 29 2017 00:00:00 GMT+0800 (中国标准时间) 完整的时间
        obj.nextDay = new Date(obj.today.getTime() + 24 * 60 * 60 * 1000);  //第二天
        return obj;
    }
}

module.exports = new Statistic();