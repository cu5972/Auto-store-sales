const Category = require('../model/category')

/**
 * 商品导航中间件
 */
module.exports = {
    /**
     * 获取商品导航列表
     */
    getList: (req,res,next) => {
        Category.getList().then(results => {
            req.categories = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取指定编号的导航详情
     */
    getCategoryById: (req,res,next) => {
        let category_id = req.params.category_id
        Category.getCategoryById(category_id).then(results => {
            req.category = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}