const router = require('express').Router()
const controller = require('../controllers/AuthController')

router.post('/signUp', controller.signUp)
router.post('/signIn', controller.signIn)

module.exports = router