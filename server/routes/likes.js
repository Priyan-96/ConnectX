const { getlikes, addlike, deletelike } = require("../controllers/like.js");
const express = require("express");

const router = express.Router();

router.get("/", getlikes);
router.post("/", addlike);
router.delete("/", deletelike);

module.exports = router;