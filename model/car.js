/**
 * 汽车商品模型
 */
module.exports = class Category extends require('./model') {
    /**
     * 获取指定导航下的商品列表
     * @param {int} id 导航编号
     */
    static getListByCategoryId(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM cars a,categories b WHERE a.category_id=? AND a.category_id = b.category_id'
            this.query(sql,id).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`获取指定导航下的商品列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取指定关键词的商品列表（查询）
     * @param {int} id 栏目编号
     * @param {string} keyword 关键词
     */
    static getListByKeyword(keyword){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM cars WHERE `car_name` LIKE ?'
            this.query(sql,`%${keyword}%`).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`获取指定关键词的商品列表（查询）失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取指定指定商品的详情
     * @param {int} car_id 商品编号
     */
    static getCarsById(car_id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM cars  WHERE car_id = ?'
            this.query(sql,car_id).then(results=>{
                //交给中间器进行处理
                resolve(results[0])
            }).catch(err=>{
                console.log(`获取指定指定商品的详情失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取指定指定商品的详情（种类）
     * @param {int} category_id 商品种类编号
     */
    static getCarsBycategory_id(category_id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM cars  WHERE category_id = ?'
            this.query(sql,category_id).then(results=>{
                //交给中间器进行处理
                resolve(results[0])
            }).catch(err=>{
                console.log(`获取指定指定商品的详情（种类）：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 总商品数
     */
    static getCount(category_id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM cars'
            sql += category_id != -1 && category_id ? ` WHERE category_id=${category_id}` : ''
            this.query(sql).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获取总商品数失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取指定页商品列表
     * @param {integer} start 起始索引
     * @param {integer} size 查询条目数
     */
    static getPage(start, size, category_id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM cars'
            sql += category_id != -1 && category_id ? ` WHERE category_id=${category_id}` : ''
            sql += ' LIMIT ?,?'
            this.query(sql, [start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取指定页商品列表：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 添加商品
     * @param {Object} car 商品对象
     */
    static add(cars) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO cars SET ?'
            this.query(sql, cars).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log(`添加商品失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 删除商品
     * @param {integer}} id 商品编号
     */
    static del(car_id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM cars WHERE car_id = ?'
            this.query(sql, car_id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`删除商品失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 编辑商品
     * @param {Object} cars 商品对象
     */
    static edit(cars) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE cars SET car_name = ?, car_image = ?, car_price = ?, car_count = ?,category_id=?,car_producer=? WHERE car_id = ?'
            this.query(sql, [cars.car_name, cars.car_image, cars.car_price, cars.car_count,cars.category_id,cars.car_producer,cars.car_id]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`编辑商品失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 添加到订单
     * @param {Object} orders 订单对象
     */
    static addOrders(orders) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO orders SET ?'
            this.query(sql, orders).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log(`添加商品失败：${err.message}`)
                reject(err)
            })
        })
    }
}