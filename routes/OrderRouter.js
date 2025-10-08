const router = require('express').Router()
const controller = require('../controllers/OrderController')
const middleware = require('../middleware/index')

router.get('/', middleware.stripToken, middleware.verifyToken, controller.order_index_get)
router.post('/:product_id', middleware.stripToken, middleware.verifyToken, controller.order_create_post)
router.put('/:order_id', middleware.stripToken, middleware.verifyToken, controller.order_update_put)
router.delete('/:order_id', middleware.stripToken, middleware.verifyToken, controller.order_delete_delete)

module.exports = router