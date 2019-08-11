const express=require('express');
const Router=express.Router();
const chatController=require('../controllers/chats/chatController');

Router.post('/sendmessage',chatController.sendMessage);

Router.post('/getchat',chatController.getChat);

module.exports=Router;