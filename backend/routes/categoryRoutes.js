const express = require('express');
const router = express.Router()
const categoryController = require('../controller/categoryController')

router.get('api/', categoryController.getAllCategories)
router.post('api/', categoryController.createCategory)

module.exports = router