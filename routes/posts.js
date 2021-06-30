const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Getting all posts
router.get('/', (req, res) => {
    Post.find().then((result) => {
        res.send(result);
    })
})

//Getting one
router.get('/:id', (req, res) => {

})

module.exports = router;