const express = require('express');
const { getPostsBySearch, getPosts, getPost, createPost, updatePost, deletePost, likePost, commentPost } = require('../controllers/posts');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.post('/', auth, createPost);
router.get('/:id', getPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);

module.exports = router;