const router = require('express').Router()
const controller = require('../controllers/ProductController')
const middleware = require('../middleware/index')

router.get('/', controller.products_index_get)
router.post('/', middleware.stripToken, middleware.verifyToken, controller.products_create_post)
router.get('/:product_id', controller.products_show_get)
router.put('/:product_id', middleware.stripToken, middleware.verifyToken, controller.products_update_put)
router.delete('/:product_id', middleware.stripToken, middleware.verifyToken, controller.products_delete_delete)

module.exports = router