const express = require("express");
const {
  addIncome,
  getIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

// All income routes require authentication
router.use(authenticateToken);

// Add income
router.post("/", addIncome);

// Get all income
router.get("/", getIncome);

// Update income
router.put("/:id", updateIncome);

// Delete income
router.delete("/:id", deleteIncome);

module.exports = router;
