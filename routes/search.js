/**
 * 首页子应用（首页路由）
 */
var express = require('express');
const auth = require('../middle/auth')
const car = require('../middle/car')
const category = require('../middle/category')

//首页子应用
const searchApp = express()

//加载搜索页面
searchApp.get('/',[auth.getUser,car.getListByKeyword,category.getList],(req,res)=>{
    let {user,cars_select,categories}=req
    res.render('search',{user,cars_select,keyword:req.query.keyword,categorys:categories});
})

//添加进订单
searchApp.post('/order',[car.addOrders,category.getList,auth.getUser],(req,res)=>{
    let {categories,user} = req
    if (req.insertId > 0) {
        res.render('alert', { code: true, title: '成功提示', message: '添加订单成功', url: '/index', user,categories})
    } else {
        res.render('alert', { code: true, title: '失败提示', message: '添加订单失败', url: '/index',user,categories })
    }
})
module.exports = searchApp;