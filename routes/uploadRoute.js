const express = require('express');
const Router = express.Router();
const uploadController = require('../controllers/upload/uploadController');

Router.get('/uploadfile', uploadController.uploadFile);

module.exports = Router;