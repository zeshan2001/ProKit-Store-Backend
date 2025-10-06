const router = require('express').Router()
const controller = require('../controllers/FeedbackController')
const middleware = require('../middleware/index')

router.get('/:product_id', controller.feedbacks_index_get)
router.post('/:product_id', middleware.stripToken, middleware.verifyToken, controller.feedbacks_create_post)
router.delete('/:feedback_id', middleware.stripToken, middleware.verifyToken, controller.feedbacks_delete_delete)

module.exports = router