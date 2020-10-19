/**
 * 订单管理中间件
 */

const order = require('../model/order')

module.exports = {
    /**
     * 获取订单列表
     */
    getOrderList: (req,res,next) => {
        order.getOrderList(res.start, res.size).then(results => {
            req.orders = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取总订单数
     */
    getOrderCount: (req, res, next) => {
        order.getOrderCount().then(results => {
            req.ordersCount = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 修改订单状态
     */
    UpdateOrder: (req, res, next) => {
        let {order_id,status } = req.body
        let info = {
            order_id:order_id,
            status:status
        }
        order.UpdateOrder(info).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 删除订单
     */
    delOrder: (req, res, next) => {
        let { order_id } = req.query
        order.delOrder(order_id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 完成订单
     */
    finishOrder: (req, res, next) => {
        let { order_id,profit } = req.query
        order.finishOrder(order_id,profit).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取订单列表（包括销售员）
     */
    getOrderUsersList: (req,res,next) => {
        order.getOrderUsersList(req.query.id, res.start, res.size).then(results => {
            req.orders = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取总订单数（包括销售员）
     */
    getOrderUserCount: (req, res, next) => {
        order.getOrderUserCount(req.query.id).then(results => {
            req.ordersUsersCount = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取销售员列表
     */
    getSalesmanList: (req,res,next) => {
        order.getSalesmanList().then(results => {
            req.salesman = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}