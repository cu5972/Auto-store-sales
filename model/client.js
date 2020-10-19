/**
 * 客人信息模型
 */
module.exports = class Client extends require('./model') {
    /**
     * 获取客人信息列表
     * @param {int} salesman_id 接待该客户销售员的ID
     */
    static getclientList(salesman_id,start, size){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM client WHERE `salesman_id`=? LIMIT ?,?'
            this.query(sql,[salesman_id,start,size]).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`获取客人信息列表：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 总客人数
     * @param {int} salesman_id 接待该客户销售员的ID
     */
    static getCount(salesman_id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM client WHERE salesman_id=?'
            this.query(sql,salesman_id).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获取总商品数失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 删除客人信息
     * @param {int} client_id 客人ID
     */
    static delClient(client_id){
        return new Promise((resolve,reject)=>{
            let sql = 'DELETE FROM client WHERE `client_id` = ?'
            this.query(sql,client_id).then(results =>{
                resolve(results.affectedRows)
            }).catch(err =>{
                console.log('删除客人信息：'+ err.message)
                reject(err)
            })
        })
    }
    /**
     * 获取指定客人信息列表
     * @param {int} client_id 接待该客户销售员的ID
     */
    static getclientListByID(client_id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM client WHERE `client_id`=?'
            this.query(sql,client_id).then(results=>{
                //交给中间器进行处理
                resolve(results[0]) 
            }).catch(err=>{
                console.log(`获取指定客人信息列表：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 编辑指定客人信息列表
     * @param {int} client 客人信息
     */
    static editClient(client){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE client SET client_name=?,client_phone=?,client_sex=? WHERE client_id=?'
            this.query(sql,[client.client_name,client.client_phone,client.client_sex,client.client_id]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`编辑指定客人信息列表：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 添加客人信息
     * @param {int} client 客人信息
     */
    static addClient(client){
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO client SET ?'
            this.query(sql,client).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log(`添加客人信息：${err.message}`)
                reject(err)
            })
        })
    }
    
}