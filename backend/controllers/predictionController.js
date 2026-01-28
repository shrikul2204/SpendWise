const db = require("../config/db");

const getPrediction = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get total income
    const [incomeResult] = await db.execute(
      "SELECT SUM(amount) as totalIncome FROM income WHERE user_id = ?",
      [userId]
    );

    // Get total expense
    const [expenseResult] = await db.execute(
      "SELECT SUM(amount) as totalExpense FROM expenses WHERE user_id = ?",
      [userId]
    );

    // Get number of days since first transaction
    const [daysResult] = await db.execute(
      `
      SELECT DATEDIFF(CURDATE(), MIN(date)) + 1 as days
      FROM (
        SELECT date FROM income WHERE user_id = ?
        UNION ALL
        SELECT date FROM expenses WHERE user_id = ?
      ) as all_dates
      `,
      [userId, userId]
    );

    const totalIncome = incomeResult[0].totalIncome || 0;
    const totalExpense = expenseResult[0].totalExpense || 0;
    const days = daysResult[0].days || 1;

    const balance = totalIncome - totalExpense;

    const dailyIncome = totalIncome / days;
    const dailyExpense = totalExpense / days;

    const futureBalance = balance + (dailyIncome - dailyExpense) * 30;

    let daysLeft = null;
    if (dailyExpense > dailyIncome) {
      daysLeft = Math.floor(balance / (dailyExpense - dailyIncome));
    }

    res.json({
      dailyIncome: dailyIncome.toFixed(2),
      dailyExpense: dailyExpense.toFixed(2),
      futureBalance: futureBalance.toFixed(2),
      daysLeft,
    });
  } catch (error) {
    console.error("Prediction Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getPrediction };
