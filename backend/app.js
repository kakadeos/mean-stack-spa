const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');


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

app.post('/api/posts', (req,res,next)=>{
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    });
    post.save().then(createdPost=>{
      res.status(201).json({
        message: 'Post Added Successfully',
        postId: createdPost._id
      });
    });

});


app.get('/api/posts',(req,res,next)=>{
  Post.find().then((documents)=>{
    res.status(200).json({
      message: 'Post Fetch Successfully',
      posts: documents
    });
  });


});

app.delete('/api/posts/:id',(req,res,next)=>{
  Post.deleteOne({_id: req.params.id}).then((result)=>{
    console.log(result);
    res.status(200).json({message:'Post Deleted'});
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});




module.exports = app;
