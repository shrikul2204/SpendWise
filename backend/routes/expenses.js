const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { addExpense, getExpenses } = require("../controllers/expenseController");

const router = express.Router();

// All expense routes require authentication
router.use(authenticateToken);

// Add expense
router.post("/", addExpense);

// Get expenses
router.get("/", getExpenses);

module.exports = router;
