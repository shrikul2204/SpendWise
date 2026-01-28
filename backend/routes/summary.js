const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { getSummary } = require("../controllers/summaryController");

const router = express.Router();

// All summary routes require authentication
router.use(authenticateToken);

// Get summary
router.get("/", getSummary);

module.exports = router;
