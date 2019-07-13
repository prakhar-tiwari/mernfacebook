const express=require('express');
const Router=express.Router();
const postController=require('../controllers/posts/postController');

Router.post('/getfeed',postController.getFeed);

Router.post('/getallposts',postController.getAllPosts);

Router.post('/getpost',postController.getPost);

Router.post('/submitpost',postController.submitPost);

Router.post('/likepost',postController.likePost);


module.exports=Router;