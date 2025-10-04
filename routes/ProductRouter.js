const router = require('express').Router()
const controller = require('../controllers/ProductController')
const middleware = require('../middleware/index')

router.get('/', middleware.stripToken, middleware.verifyToken, controller.products_index_get)
router.post('/', middleware.stripToken, middleware.verifyToken, controller.products_create_post)

module.exports = router