const { getPosts, addPost, deletePost } = require("../controllers/post.js");
const express = require("express");

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.delete("/", deletePost);

module.exports = router;