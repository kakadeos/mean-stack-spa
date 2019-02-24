const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoute = require('./routes/post')


const app = express();
mongoose.connect('mongodb+srv://omkar:3KIxeEOPfyt70mx0@cluster0-i1zah.mongodb.net/node-angular?retryWrites=true')
.then(()=>{
  console.log('Connected to DB');
})
.catch((err)=>{
  console.log('Connection Fail'+err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-with, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS");
  next();
});

app.use("/api/posts",postsRoute);

module.exports = app;
