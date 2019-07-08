const express=require('express');
const Router=express.Router();
const postController=require('../controllers/posts/postController');

Router.post('/submitpost',postController.submitPost);

module.exports=Router;