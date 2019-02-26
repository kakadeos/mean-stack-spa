const express = require("express");

const checkAuth = require('../middleware/check-auth');
const PostController = require('../controller/posts')
const router = express.Router();
const extarctFile = require('../middleware/file');


router.post("", checkAuth, extarctFile, PostController.createPost);

router.put("/:id", checkAuth, extarctFile, PostController.updatePost);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
