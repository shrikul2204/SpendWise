const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { getPrediction } = require("../controllers/predictionController");

const router = express.Router();

router.use(authenticateToken);

router.get("/", getPrediction);

module.exports = router;
