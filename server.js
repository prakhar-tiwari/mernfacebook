const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const app = express();

const authRoute = require('./routes/auth');
const postRoute = require('./routes/postRoute');
const profileRoute = require('./routes/profileRoute');
const chatRoute = require('./routes/chatRoute');
const uploadRoute = require('./routes/uploadRoute');

const SocketManager = require('./SocketManager');
const keys = require('./config/keys');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const s3 = new aws.S3({
    accessKeyId: keys.AWS_ACCESS_KEY_ID,
    secretAccessKey: keys.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
});

const s3Storage = multerS3({
    s3: s3,
    bucket: 'socialconnectapp-bucket',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const filter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/png'
        || file.mimetype === 'video/3gpp'
        || file.mimetype === 'video/mp4'
        || file.mimetype === 'video/mpeg'
        || file.mimetype === 'video/webm'
        || file.mimetype === 'video/quicktime'
    ) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

app.use(multer({ storage: s3Storage, fileFilter: filter }).array('fileImages'));

// api
app.use(authRoute);
app.use(postRoute);
app.use(profileRoute);
app.use(chatRoute);
// app.use(uploadRoute);



const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));  // location of build folder

    app.get('*', (req, res, next) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); // location of index.html file
    })
}

mongoose.connect(keys.MONGO_CONNECT_URL, {
    useNewUrlParser: true
})
    .then(result => {
        console.log("mongodb connected");
        const server = app.listen(port);
        const io = require('./socket').init(server);
        io.on('connection', SocketManager);
    })
    .catch(err => {
        console.log(err);
    })

