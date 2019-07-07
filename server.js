const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const app=express();

const authRoute=require('./routes/auth');

mongoose.connect('mongodb+srv://prakhar:admin@cluster0-qejpw.mongodb.net/socialmedia',{
    useNewUrlParser:true
})
.then(result=>{
    console.log("mongodb connected");
})
.catch(err=>{
    console.log(err);
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.use(authRoute);



const port=process.env.PORT || 8080;


app.listen(port,()=>{
    console.log("server listening on port "+port);
})