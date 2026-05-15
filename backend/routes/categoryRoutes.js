const express = require('express');
const router = express.Router()
const categoryController = require('../controller/categoryController')

router.get('/', categoryController.getAllCategories)
// router.get('/categories', categoryController.getAllCategories)

module.exports = router