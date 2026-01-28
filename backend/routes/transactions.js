const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { getRecentTransactions } = require("../controllers/transactionController");

const router = express.Router();

router.use(authenticateToken);

router.get("/", getRecentTransactions);

module.exports = router;
