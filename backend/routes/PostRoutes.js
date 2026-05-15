const express = require('express');
const router = express.Router()
const postController = require('../controller/postController')

// get all posts
router.get('/', postController.getAllPosts)

// get single post by id
router.get('/:id', postController.getPostById)

// create new post
router.post('/', postController.createPost)

// update post
router.put('/:id', postController.updatePost)

// delete post
router.delete('/:id', postController.deletePost)

module.exports = router
