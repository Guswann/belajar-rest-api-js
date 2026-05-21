const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')
const { authToken } = require('../middleware/authToken')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logout', authToken, UserController.logout)

module.exports = router