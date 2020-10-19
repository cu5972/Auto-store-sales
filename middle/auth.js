/**
 * 权限中间件
 */

 module.exports = {
     /**
      * 从session中读取用户
      */
     getUser: (req,res,next) => {
        // 从session中读取数据
        req.user = req.session.user
        next()
     }
 }