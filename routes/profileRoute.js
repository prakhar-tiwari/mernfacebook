const express=require('express');
const Router=express.Router();
const profileController=require('../controllers/profile/profileController');

Router.get('/getuser/:userName',profileController.getUser);

Router.post('/getallusers',profileController.getAllUsers);

Router.post('/getfriends',profileController.getFriends);

Router.post('/getfriendschat',profileController.getFriendsChat);

Router.post('/uploadphoto',profileController.uploadPhoto);

module.exports=Router;