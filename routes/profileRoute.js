const express=require('express');
const Router=express.Router();
const profileController=require('../controllers/profile/profileController');

Router.get('/getuser/:userName',profileController.getUser);

Router.post('/getallusers',profileController.getAllUsers);

Router.post('/getfriends',profileController.getFriends);

Router.post('/getchatfriends',profileController.getChatFriends);

Router.post('/uploadphoto',profileController.uploadPhoto);

Router.post('/sendfriendrequest',profileController.sendFriendRequest);

Router.post('/acceptfriend',profileController.acceptFriend);

Router.post('/getfriendRequests',profileController.friendRequests);

module.exports=Router;