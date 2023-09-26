const express = require("express");
const { getFilters } = require("../controllers/search.js");

const router = express.Router();

router.get("/", getFilters);

module.exports = router;
