const db = require("../config/db");

class Income {
  // Create a new income entry
  static async create(userId, source, amount, date) {
    const [result] = await db.execute(
      "INSERT INTO income (user_id, source, amount, date) VALUES (?, ?, ?, ?)",
      [userId, source, amount, date],
    );
    return result.insertId;
  }

  // Get all income entries for a user
  static async getAllByUserId(userId) {
    const [rows] = await db.execute(
      "SELECT * FROM income WHERE user_id = ? ORDER BY date DESC",
      [userId],
    );
    return rows;
  }
  // Get income for a specific month
  static async getByUserIdAndMonth(userId, year, month) {
    const [rows] = await db.execute(
      "SELECT * FROM income WHERE user_id = ? AND YEAR(date) = ? AND MONTH(date) = ? ORDER BY date DESC",
      [userId, year, month],
    );
    return rows;
  }
}

module.exports = Income;
