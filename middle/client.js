const Client = require('../model/client')

/**
 * 客人信息中间件
 */
module.exports = {
    /**
     * 获取客人信息列表
     */
    getclientList: (req,res,next) => {
        let salesman_id = req.session.user.id*1
        Client.getclientList(salesman_id,res.start, res.size).then(results => {
            req.clients = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取总客人数
     */
    getCount: (req, res, next) => {
        let salesman_id = req.session.user.id*1
        Client.getCount(salesman_id).then(results => {
            req.goodsCount = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 删除商品
     */
    delClient: (req, res, next) => {
        Client.delClient(req.query.client_id).then(results => {
            req.clientRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取指定客人信息列表
     */
    getclientListByID: (req,res,next) => {
        Client.getclientListByID(req.params.id).then(results => {
            req.clientByID = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 编辑指定客人信息列表
     */
    editClient: (req,res,next) => {
        let {client_id,client_name,client_phone,client_sex} = req.body
        let client = {
            client_id:client_id*1,
            client_name:client_name,
            client_phone:client_phone,
            client_sex:client_sex
        }
        Client.editClient(client).then(results => {
            req.editClient = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 添加客人信息
     */
    addClient: (req,res,next) => {
        let {salesman_id,client_name,client_phone,client_sex} = req.body
        let client = {
            salesman_id:salesman_id*1,
            client_name:client_name,
            client_phone:client_phone,
            client_sex:client_sex
        }
        Client.addClient(client).then(results => {
            req.insertId = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}