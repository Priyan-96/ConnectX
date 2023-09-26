const express = require('express');
const { addActivity, deleteActivity, getActivities } = require('../controllers/activity.js');

const router = express.Router();

router.get("/", getActivities);
router.post("/", addActivity);
router.delete("/", deleteActivity);

module.exports = router;