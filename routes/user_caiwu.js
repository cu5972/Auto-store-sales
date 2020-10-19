/**
 * 员工业绩子应用（员工业绩路由）
 */
var express = require('express');
const order = require('../middle/order')


//首页子应用
const UsersPerformanceApp = express()

//加载搜索页面
UsersPerformanceApp.get('/',[order.getOrderCount],(req,res,next)=>{
    user = req.session.user
    let { ordersCount } = req

    let size = 5 // 每页显示3条
    req.page = {}
    req.page.count = ordersCount
    req.page.total = Math.ceil(req.page.count / size)
    req.page.p = req.query.p ? req.query.p : 1
    req.page.p = req.page.p > req.page.total ? req.page.total : req.page.p
    req.page.p = req.page.p < 1 ? 1 : req.page.p

    res.start = (req.page.p - 1) * size
    res.size = size

    next()
},order.getOrderList,(req,res)=>{

    let { orders, page} = req
    page.list = orders

    res.render('goods_caiwu',{user,page})
})

module.exports = UsersPerformanceApp;