const Expense = require("../models/Expense");

const addExpense = async (req, res) => {
  try {
    const { category, amount, date, note } = req.body;
    const userId = req.user.id;

    if (!category || !amount) {
      return res
        .status(400)
        .json({ message: "Category and amount are required" });
    }

    const parsedAmount = Number(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ message: "Invalid expense amount" });
    }

    const expenseDate = date ? new Date(date) : new Date();
    const expenseNote = note || null;

    const expenseId = await Expense.create(
      userId,
      category,
      parsedAmount,
      expenseDate,
      expenseNote,
    );
    res
      .status(201)
      .json({ message: "Expense added successfully", id: expenseId });
  } catch (error) {
    console.error("Add Expense Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.getAllByUserId(userId);
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addExpense, getExpenses };
