/**
 * 首页子应用（首页路由）
 */
var express = require('express');

//首页子应用
const indexApp = express()

//加载首页页面
indexApp.get('/', (req,res)=> {
  res.render('login');
});

module.exports = indexApp;
