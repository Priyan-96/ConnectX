const { getUsers, updateUser } = require("../controllers/user.js");
const express = require("express");

const router = express.Router();

router.get("/", getUsers);
router.put("/", updateUser);

module.exports = router;