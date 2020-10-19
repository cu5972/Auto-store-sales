/**
 * 订单利润子应用（订单利润路由）
 */
var express = require('express');
const order = require('../middle/order')


//首页子应用
const orderProfitApp = express()

//加载统计利润页面
orderProfitApp.get('/',[order.getOrderUserCount],(req,res,next)=>{
    user = req.session.user
    let { ordersUsersCount } = req

    let size = 5 // 每页显示3条
    req.page = {}
    req.page.count = ordersUsersCount
    req.page.total = Math.ceil(req.page.count / size)
    req.page.p = req.query.p ? req.query.p : 1
    req.page.p = req.page.p > req.page.total ? req.page.total : req.page.p
    req.page.p = req.page.p < 1 ? 1 : req.page.p

    res.start = (req.page.p - 1) * size
    res.size = size

    next()
},[order.getOrderUsersList,order.getSalesmanList],(req,res)=>{

    let { orders, page, salesman} = req
    let { id } = req.query
    page.list = orders
    res.render('goods_caiwu',{user,page,salesman,id})
})

module.exports = orderProfitApp;