const db = require("../config/db");

const getRecentTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const [income] = await db.execute(
      "SELECT id, source AS title, amount, date, 'income' AS type FROM income WHERE user_id = ? ORDER BY date DESC LIMIT 5",
      [userId]
    );

    const [expenses] = await db.execute(
      "SELECT id, category AS title, amount, date, 'expense' AS type FROM expenses WHERE user_id = ? ORDER BY date DESC LIMIT 5",
      [userId]
    );

    const transactions = [...income, ...expenses].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.json(transactions.slice(0, 5));
  } catch (error) {
    console.error("Transaction Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getRecentTransactions };
