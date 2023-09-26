const { getComments, addComment} = require("../controllers/comment.js");
const express = require("express");

const router = express.Router();

router.get("/", getComments);
router.post("/", addComment);

module.exports =  router;