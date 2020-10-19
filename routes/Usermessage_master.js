/**
 * 客人信息管理子应用
 */
const express = require('express')
const client = require('../middle/client')
const auth = require('../middle/auth')

//客人信息管理子应用
const Usermessage_masterapp = express()

//加载客人信息管理页面
Usermessage_masterapp.get('/',[client.getCount],(req,res,next)=>{
    user = req.session.user
    let { goodsCount } = req

    let size = 5 // 每页显示3条
    req.page = {}
    req.page.count = goodsCount
    req.page.total = Math.ceil(req.page.count / size)
    req.page.p = req.query.p ? req.query.p : 1
    req.page.p = req.page.p > req.page.total ? req.page.total : req.page.p
    req.page.p = req.page.p < 1 ? 1 : req.page.p

    res.start = (req.page.p - 1) * size
    res.size = size

    next()
},[client.getclientList],(req,res)=>{
    let { clients, page} = req
    page.list = clients

    res.render('Usermessage_master',{user,page})
})

//删除客人信息
Usermessage_masterapp.get('/del',[client.delClient],(req,res)=>{
    if (req.clientRows > 0) {
        res.json({ code: 1, msg: '删除成功' })
    } else {
        res.json({ code: 2, msg: '删除失败' })
    }
})

// 显示编辑客人信息的页面
Usermessage_masterapp.get('/edit/:id',[auth.getUser,client.getclientListByID],(req,res)=>{
    let {user,clientByID} = req
    res.render('edit_user',{user,clientByID})
})
//保存编辑后的客人信息
Usermessage_masterapp.post('/edit',[client.editClient],(req,res)=>{
    if (req.editClient > 0) {
        res.render('alert', { code: true, title: '成功提示', message: '客人信息编辑成功', url: '/Usermessage_master' })
    } else {
        res.render('alert', { code: true, title: '失败提示', message: '客人信息编辑失败', url: '/Usermessage_master/edit/' + req.body.client_id })
    }
})

//显示添加客户信息的页面
Usermessage_masterapp.get('/add',auth.getUser,(req,res)=>{
    let user = req.user
    res.render('add_user',{user,code:''})
})
//添加客人信息
Usermessage_masterapp.post('/add', [auth.getUser,client.addClient], (req, res) => {
    let user = req.user
    if (req.insertId) {
        res.render('add_user', {code: 1 ,user:user})
    } else {
        res.render('add_user', {code: 2 ,user:user})
    }
})


module.exports = Usermessage_masterapp