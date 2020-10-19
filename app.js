/**
 * 入口模块
 */
const express = require('express')
const session = require('cookie-session')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

//创建主应用
const app = express()

// 上传配置
const upload = multer({
    dest: './public/upload', // 上传文件的存储目录
    limits: {
        fileSize: 1024 * 1024 * 2 // 单个文件大小限制在2M以内
    }
})

// 模板引擎的设置
// 在使用模板时可以使用后缀为html的文件
app.set('view engine', 'html')
app.set('views',`${__dirname}/views`)
app.engine('html',require('ejs').renderFile)

// 静态资源配置
app.use(express.static('public'))

//post请求处理
app.use(express.urlencoded({extended:true}))

//SESSION配置
app.use(session({
    keys: ['secret'],
    maxAge: 1000*60*30
}))

// SESSION延期
app.use((req, res, next) => {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    next()
})

// 上传操作
app.post('/Mastergoods/add', upload.single('upload'), (req, res, next) => {
    // 上传成功后的文件对象
    let { file } = req
    if (file) {
        //  file.originalname ==> 文件的原名称
        let extname = path.extname(file.originalname)
        // file.path ==> 上传后的文件路径
        fs.renameSync(file.path, file.path + extname)
        // file.filename ==> 上传后的文件名
        req.uploadUrl = '/upload/' + file.filename + extname
    }
    next()
})
app.post('/Mastergoods/edit', upload.single('upload'), (req, res, next) => {
    // 上传成功后的文件对象
    let { file } = req
    if (file) {
        //  file.originalname ==> 文件的原名称
        let extname = path.extname(file.originalname)
        // file.path ==> 上传后的文件路径
        fs.renameSync(file.path, file.path + extname)
        // file.filename ==> 上传后的文件名
        req.uploadUrl = '/upload/' + file.filename + extname
    }
    next()
})

//调用首页子应用
app.use('/',require('./routes/login'))
//调用客人信息管理子应用
app.use('/Usermessage_master',require('./routes/Usermessage_master'))
//调用个人中心页面子应用
app.use('/persion_center',require('./routes/persion_center'))
//调用汽车商品子应用
app.use('/list',require('./routes/car'))
//调用搜索商品子应用
app.use('/search',require('./routes/search'))
//调用个人中心页面子应用
app.use('/Mastergoods',require('./routes/Mastergoods'))
//调用订单管理页面子应用
app.use('/oreder_master',require('./routes/oreder_master'))
//调用订单利润页面子应用
app.use('/goods_caiwu',require('./routes/goods_caiwu'))
//调用员工业绩页面子应用
app.use('/user_caiwu',require('./routes/user_caiwu'))

//调用登录子应用
app.use('/login',require('./routes/login'))
//调用注册子应用
app.use('/register',require('./routes/register'))

//监听服务器  
app.listen(8080)
console.log('项目启动成功，请访问：http://localhost:8080')