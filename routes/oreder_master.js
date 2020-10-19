/**
 * 订单管理子应用（订单管理路由）
 */
var express = require('express');
const auth = require('../middle/auth')
const order = require('../middle/order')


//首页子应用
const orderApp = express()

//加载订单管理页面
orderApp.get('/',[order.getOrderCount],(req,res,next)=>{
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

    res.render('oreder_master',{user,page})
})

//修改订单状态
orderApp.post('/edit', order.UpdateOrder, (req, res) => {
    if (req.affectedRows > 0) {
        res.render('alert', { code: true, title: '成功提示', message: '订单状态修改成功', url: '/oreder_master'})
    } else {
        res.render('alert', { code: true, title: '失败提示', message: '订单状态修改失败', url: '/oreder_master'})
    }
})

// 删除订单
orderApp.get('/del', order.delOrder, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '取消订单成功' })
    } else {
        res.json({ code: 2, msg: '取消订单失败' })
    }
})

//完成订单
orderApp.get('/finish', order.finishOrder, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '完成订单成功' })
    } else {
        res.json({ code: 2, msg: '完成订单失败' })
    }
})

module.exports = orderApp;