/**
 * 订单管理模型
 */
module.exports = class Order extends require('./model') {
    /**
     * 获取订单列表
     */
    static getOrderList(start, size){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT order_id,car_name,car_price,b.category_name,client_name,client_sex,client_phone,c.`name` salesman_name,a.`status`,profit FROM orders a, categories b, users c WHERE a.category_id=b.category_id AND a.salesman_id = c.id LIMIT ?,?'
            this.query(sql,[start, size]).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`获取订单列表：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 总订单数
     */
    static getOrderCount() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM orders'
            this.query(sql).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获取总商品数失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 修改订单状态
     * @param {list} info 订单信息
     */
    static UpdateOrder(info){
        return new Promise((resolve,reject)=>{
            let sql = 'UPDATE `orders` SET `status`=? where `order_id`=?'
            this.query(sql,[info.status,info.order_id]).then(results =>{
                resolve(results.affectedRows)
            }).catch(err =>{
                console.log('修改订单状态：'+ err.message)
                reject(err)
            })
        })
    }
    /**
     * 删除订单的内容
     * @param {int} id 商品ID
     */
    static delOrder(order_id){
        return new Promise((resolve,reject)=>{
            let sql = 'DELETE FROM `orders` WHERE `order_id` = ?'
            this.query(sql,order_id).then(results =>{
                resolve(results.affectedRows)
            }).catch(err =>{
                console.log('删除订单的内容：'+ err.message)
                reject(err)
            })
        })
    }
    /**
     * 完成订单
     * @param {int} id 商品ID
     */
    static finishOrder(order_id,profit){
        return new Promise((resolve,reject)=>{
            let sql = 'UPDATE `orders` SET profit = ? WHERE `order_id`= ?'
            this.query(sql,[profit,order_id]).then(results =>{
                resolve(results.affectedRows)
            }).catch(err =>{
                console.log('完成订单：'+ err.message)
                reject(err)
            })
        })
    }
    /**
     * 获取订单列表（包括销售员）
     */
    static getOrderUsersList(salesman_id,start, size){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT order_id,car_name,car_price,b.category_name,client_name,client_sex,client_phone,c.`name` salesman_name,a.`status`,profit FROM orders a, categories b, users c WHERE a.category_id=b.category_id AND a.salesman_id = c.id'
            sql += salesman_id != -1 && salesman_id ? ` AND salesman_id=${salesman_id}` : ''
            sql += ' LIMIT ?,?'
            this.query(sql,[start, size, salesman_id]).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`获取订单列表：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 总订单数（包括销售员）
     * @param {int} salesman_id 销售员ID
     */
    static getOrderUserCount(salesman_id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM orders'
            sql += salesman_id != -1 && salesman_id ? ` WHERE salesman_id=${salesman_id}` : ''
            this.query(sql,salesman_id).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获取总商品数失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取销售员列表
     */
    static getSalesmanList(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM users WHERE status = 0'
            this.query(sql).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`获取商品类目列表失败：${err.message}`)
                reject(err)
            })
        })
    }
}