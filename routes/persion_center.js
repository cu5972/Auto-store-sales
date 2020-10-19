/**
 * 个人信息管理子应用
 */
const express = require('express')
const client = require('../middle/client')
const users = require('../model/user')
const category = require('../middle/category')
const auth = require('../middle/auth')

//个人信息管理子应用
const persion_centerapp = express()

//加载个人中心页面
persion_centerapp.get('/',(req,res)=>{
    user = req.session.user
    res.render('persion_center',{user})
})

//保存修改过后的个人信息
persion_centerapp.post('/update',[auth.getUser,category.getList],(req,res)=>{
    let { name,username, password,id,status} = req.body
    let info = {
        name,name,
        username: username,
        password: password,
        status:status,
        id: id*1
    }
    users.update(info).then(results => {
        let {user} = req
        if (results) {
            res.render('login')
        }else{
            res.render('persion_center',{user})
        }
    }).catch(err => {
        next(err)
    })
})
module.exports = persion_centerapp