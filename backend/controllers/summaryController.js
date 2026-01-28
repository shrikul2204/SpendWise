const db = require("../config/db");

const getSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total Income
    const [incomeResult] = await db.execute(
      "SELECT SUM(amount) as totalIncome FROM income WHERE user_id = ?",
      [userId]
    );

    // Total Expense
    const [expenseResult] = await db.execute(
      "SELECT SUM(amount) as totalExpense FROM expenses WHERE user_id = ?",
      [userId]
    );

    const totalIncome = incomeResult[0].totalIncome || 0;
    const totalExpense = expenseResult[0].totalExpense || 0;
    const balance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      balance,
    });
  } catch (error) {
    console.error("Summary Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getSummary };
