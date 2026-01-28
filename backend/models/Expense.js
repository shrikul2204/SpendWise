const db = require("../config/db");

class Expense {
  // Create a new expense entry
  static async create(userId, category, amount, date, note) {
    // Convert date to MySQL format
    const expenseDate = date ? new Date(date) : new Date();

    const expenseNote = note || null;

    const [result] = await db.execute(
      "INSERT INTO expenses (user_id, category, amount, date, note) VALUES (?, ?, ?, ?, ?)",
      [userId, category, amount, expenseDate, expenseNote],
    );

    return result.insertId;
  }

  // Get all expenses for a user
  static async getAllByUserId(userId) {
    const [rows] = await db.execute(
      "SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC",
      [userId],
    );
    return rows;
  }

  // Get expenses for a specific month
  static async getByUserIdAndMonth(userId, year, month) {
    const [rows] = await db.execute(
      "SELECT * FROM expenses WHERE user_id = ? AND YEAR(date) = ? AND MONTH(date) = ? ORDER BY date DESC",
      [userId, year, month],
    );
    return rows;
  }

  // Update an expense entry
  static async update(id, userId, category, amount, date, note) {
    await db.execute(
      "UPDATE expenses SET category = ?, amount = ?, date = ?, note = ? WHERE id = ? AND user_id = ?",
      [category, amount, date, note, id, userId],
    );
  }

  // Delete an expense entry
  static async delete(id, userId) {
    await db.execute("DELETE FROM expenses WHERE id = ? AND user_id = ?", [
      id,
      userId,
    ]);
  }

  // Get category-wise expenses for a user in a specific month
  static async getCategoryBreakdown(userId, year, month) {
    const [rows] = await db.execute(
      "SELECT category, SUM(amount) as total FROM expenses WHERE user_id = ? AND YEAR(date) = ? AND MONTH(date) = ? GROUP BY category",
      [userId, year, month],
    );
    return rows;
  }
}

module.exports = Expense;
