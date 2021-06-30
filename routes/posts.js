const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Getting all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Getting one post
router.get('/:id', getPost, (req, res) => {
    res.json(res.post)
})

// Updating post
router.patch('/:id', getPost, async (req, res) => {
    if (req.body.postTitle != null) {
        res.post.postTitle = req.body.postTitle;
    }
    if (req.body.postBody != null) {
        res.post.postBody = req.body.postBody;
    }
    res.post.lastEditDate = new Date().toISOString();
    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting post
router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.remove();
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

async function getPost(req, res, next) {
    let post;
    try {
        post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
    res.post = post;
    next();
}

module.exports = router;