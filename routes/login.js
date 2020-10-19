/**
 * 登录子应用
 */
const express = require('express')
const User = require('../model/user')
const category = require('../middle/category')


//登录子应用
const loginApp = express()

//加载登录页面
loginApp.get('/',(req,res)=>{
    res.render('login',{msg:''})
})

//实现登录操作
loginApp.post('/index',[category.getList],(req,res,next) => {
    let {username,password} = req.body
    User.login(username,password).then(results => {
        if (results) {
            //session存储（key=value）
            req.session.user = results
            if (req.session.user.status==0) {
                user = req.session.user
                let {categories} = req
                res.render('index',{user,categories})
            } 
            if(req.session.user.status==1) {
                res.render('alert',{ code: true, title: '进入提示', message: '即将进入商品管理页面', url: '/Mastergoods' })
            }
            if (req.session.user.status==2) {
                res.render('alert',{ code: true, title: '进入提示', message: '即将进入财务管理页面', url: '/goods_caiwu' })
            }
            
        }else{
            res.render('login')
        }
    }).catch(err => {
        next(err)
    })
})

//加载销售员首页页面
loginApp.get('/index',[category.getList],(req,res)=>{
    user = req.session.user
    let {categories} = req
    res.render('index',{user,categories})
})



module.exports = loginApp
