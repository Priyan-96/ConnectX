const express = require("express");
const { getSuggestions } = require("../controllers/suggestion.js");

const router = express.Router();

router.post("/", getSuggestions);

module.exports = router;