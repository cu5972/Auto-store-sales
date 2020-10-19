/**
 * 商品管理
 */
const express = require('express')
const auth = require('../middle/auth')
const User = require('../model/user')
const car = require('../middle/car')
const category = require('../middle/category')

const MastergoodsApp = express()

MastergoodsApp.use(auth.getUser)




// 加载列表页
MastergoodsApp.get('/', car.getCount, (req, res, next) => {
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

}, [car.getPage, category.getList], (req, res) => {
    let { user, pageList, page, categories } = req
    let { category_id} = req.query
    page.list = pageList

    res.render('Mastergoods', { user: user, page: page, categorys: categories, category_id: category_id})
})

// 显示添加商品页
MastergoodsApp.get('/add',category.getList, (req, res) => {
    let {user,categories} = req
    res.render('add', {code: '' ,user:user,categorys:categories})
})
// 添加商品
MastergoodsApp.post('/add', [car.add, category.getList], (req, res) => {
    let {categories } = req
    let user = req.user
    if (req.insertId) {
        res.render('add', {categorys: categories, code: 1 ,user:user})
    } else {
        res.render('add', {categorys: categories, code: 2 ,user:user})
    }
})

// 删除商品
MastergoodsApp.get('/del', car.del, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '删除成功' })
    } else {
        res.json({ code: 2, msg: '删除失败' })
    }
})

// 商品编辑
MastergoodsApp.get('/edit/:id', [category.getList, car.getCarsById], (req, res) => {
    let {categories,cars_id} = req
    let user = req.user
    res.render('edit', {categorys: categories, cars_id: cars_id, code: '', user:user})
})

MastergoodsApp.post('/edit', car.edit, (req, res) => {
    if (req.affectedRows > 0) {
        res.render('alert', { code: true, title: '成功提示', message: '商品编辑成功', url: '/Mastergoods' })
    } else {
        res.render('alert', { code: true, title: '失败提示', message: '商品编辑失败', url: '/Mastergoods/edit/' + req.body.car_id })
    }
})

module.exports = MastergoodsApp