/**
 * 用户数据模型
 */

module.exports = class User extends require('./model'){
    /**
     * 用户登录
     * @param {String} username 用户账号
     * @param {String} password 用户密码
     */
    static login(username,password){
        return new Promise((resolve,reject)=>{
            let sql = 'SELECT id,name,username,password,status FROM `users` WHERE username = ? AND `password` = ?'
            this.query(sql,[username,password]).then(results =>{
                resolve(results[0])
            }).catch(err =>{
                console.log('登录失败：'+ err.message)
                reject(err)
            })
        })
    }
    /**
     * 用户注册
     * @param {list} info 注册信息
     */
    static register(info){
        return new Promise((resolve,reject)=>{
            let sql = 'INSERT INTO users SET ?'
            this.query(sql,info).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log('注册失败：'+ err.message)
                reject(err)
            })
        })
    }
    /**
     * 修改个人信息
     * @param {list} info 用户信息
     */
    static update(info){
        return new Promise((resolve,reject)=>{
            let sql = 'UPDATE users SET name = ?, username = ?, password = ?, status=? WHERE id = ?'
            this.query(sql,[info.name,info.username,info.password,info.status,info.id]).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log('修改个人信息：'+ err.message)
                reject(err)
            })
        })
    }
}