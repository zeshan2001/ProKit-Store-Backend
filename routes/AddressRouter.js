const router = require('express').Router()
const controller = require('../controllers/AddressConteroller')
const middleware = require('../middleware/index')

router.get('/', middleware.stripToken, middleware.verifyToken, controller.address_index_get)
router.post('/', middleware.stripToken, middleware.verifyToken, controller.address_create_post)
router.put('/:address_id', middleware.stripToken, middleware.verifyToken, controller.address_update_put)
router.delete('/:address_id', middleware.stripToken, middleware.verifyToken, controller.address_delete_delete)

module.exports = router