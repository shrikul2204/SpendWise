const db = require("../config/db");

const getInsights = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total income
    const [incomeResult] = await db.execute(
      "SELECT SUM(amount) as totalIncome FROM income WHERE user_id = ?",
      [userId]
    );

    // Total expense
    const [expenseResult] = await db.execute(
      "SELECT SUM(amount) as totalExpense FROM expenses WHERE user_id = ?",
      [userId]
    );

    // Category-wise expenses
    const [categoryResult] = await db.execute(
      "SELECT category, SUM(amount) as total FROM expenses WHERE user_id = ? GROUP BY category ORDER BY total DESC",
      [userId]
    );

    const totalIncome = incomeResult[0].totalIncome || 0;
    const totalExpense = expenseResult[0].totalExpense || 0;

    let insights = [];

    // Insight 1: Spending vs Income
    if (totalExpense > totalIncome) {
      insights.push("⚠️ You are spending more than your income.");
    } else {
      insights.push("✅ Your spending is under control.");
    }

    // Insight 2: Top spending category
    if (categoryResult.length > 0) {
      insights.push(
        `💸 Most of your money goes to "${categoryResult[0].category}".`
      );
    }

    // Insight 3: Saving behavior
    const savingRate = totalIncome - totalExpense;
    if (savingRate > totalIncome * 0.3) {
      insights.push("💰 Great job! You are saving a lot.");
    } else if (savingRate < totalIncome * 0.1) {
      insights.push("🚨 Your savings are very low note.");
    }

    res.json({ insights });
  } catch (error) {
    console.error("AI Insight Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getInsights };
