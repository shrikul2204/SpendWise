const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { getInsights } = require("../controllers/aiController");

const router = express.Router();

router.use(authenticateToken);

router.get("/", getInsights);

module.exports = router;
