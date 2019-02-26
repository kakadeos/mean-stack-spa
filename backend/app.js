const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoute = require('./routes/posts');
const userRoutes = require('./routes/user')
const app = express();

mongoose.connect('mongodb+srv://omkar:'+ process.env.MONGO_ATLAS_PWD+'@cluster0-i1zah.mongodb.net/node-angular')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log('Connection Fail' + err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  next();
});

app.use("/api/posts", postsRoute);
app.use("/api/users", userRoutes);


module.exports = app;
