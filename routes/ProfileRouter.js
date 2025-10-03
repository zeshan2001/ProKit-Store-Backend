const router = require('express').Router()
const controller = require('../controllers/ProfileController')
const middleware = require('../middleware/index')

router.get('/:user_id', middleware.stripToken, middleware.verifyToken, controller.profile_show_get)
router.put('/:user_id', middleware.stripToken, middleware.verifyToken, controller.profile_update_put)


module.exports = router