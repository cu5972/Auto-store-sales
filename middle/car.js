/**
 * 汽车商品模型中间件
 */

const car = require('../model/car')

module.exports = {
    /**
     * 获取指定导航下的商品列表
     */
    getListByCategoryId: (req,res,next) => {
        let id = req.params.id
        car.getListByCategoryId(id).then(results => {
            req.carsByCategoryId = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 查询商品列表
     */
    getListByKeyword: (req,res,next) => {
        let keyword = req.query.keyword
        car.getListByKeyword(keyword).then(results => {
            req.cars_select = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取指定商品的详情
     */
    getCarsById: (req,res,next) => {
        let car_id = req.params.id
        car.getCarsById(car_id).then(results => {
            req.cars_id = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取指定商品的详情（种类）
     */
    getCarsBycategory_id: (req,res,next) => {
        let category_id = req.params.id
        car.getCarsBycategory_id(category_id).then(results => {
            req.cars_category = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取总商品数
     */
    getCount: (req, res, next) => {
        car.getCount(req.query.category_id).then(results => {
            req.goodsCount = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取指定页商品列表
     */
    getPage: (req, res, next) => {
        car.getPage(res.start, res.size, req.query.category_id).then(results => {
            req.pageList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 添加商品
     */
    add: (req, res, next) => {
        let { car_name, car_price, car_count,category_id,car_producer } = req.body
        let cars = {
            car_name:car_name,
            car_price: car_price,
            car_count: car_count,
            category_id: category_id,
            car_image: req.uploadUrl ? req.uploadUrl : null,
            car_producer:car_producer
        }
        car.add(cars).then(results => {
            req.insertId = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 删除商品
     */
    del: (req, res, next) => {
        let { car_id } = req.query
        car.del(car_id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 编辑商品
     */
    edit: (req, res, next) => {
        let {car_id,car_name, category_id,car_image,car_price,car_count,car_producer } = req.body
        let cars = {
            car_name: car_name,
            car_price: car_price,
            category_id: category_id,
            car_image: req.uploadUrl ? req.uploadUrl : car_image,
            car_count:car_count,
            car_id: car_id,
            car_producer:car_producer
        }
        car.edit(cars).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 添加订单
     */
    addOrders: (req, res, next) => {
        let { car_name, car_price,category_id,client_name,client_sex,client_phone,salesman_id,status } = req.body
        let orders = {
            car_name:car_name,
            car_price: car_price,
            category_id: category_id,
            client_name:client_name,
            client_sex:client_sex,
            client_phone:client_phone,
            salesman_id:salesman_id,
            status:status
        }
        car.addOrders(orders).then(results => {
            req.insertId = results
            next()
        }).catch(err => {
            next(err)
        })
    }
    
}