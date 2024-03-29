const express=require('express');
const Router=express.Router();
const postController=require('../controllers/posts/postController');

Router.post('/getfeed',postController.getFeed);

Router.post('/getallposts',postController.getAllPosts);

Router.post('/getpost',postController.getPost);

Router.post('/submitpost',postController.submitPost);

Router.post('/updatethumbnail',postController.updateThumbnail);

Router.post('/likepost',postController.likePost);

Router.post('/createcomment',postController.createComment);


module.exports=Router;