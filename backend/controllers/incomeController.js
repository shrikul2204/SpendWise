const Income = require("../models/Income");

const addIncome = async (req, res) => {
  try {
    const { source, amount, date } = req.body;
    const incomeDate = date || new Date();

    const userId = req.user.id;

    const incomeId = await Income.create(userId, source, amount, incomeDate);
    res
      .status(201)
      .json({ message: "Income added successfully", id: incomeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const income = await Income.getAllByUserId(userId);
    res.json(income);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { source, amount, date } = req.body;
    const userId = req.user.id;

    await Income.update(id, userId, source, amount, date);
    res.json({ message: "Income updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await Income.delete(id, userId);
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addIncome, getIncome, updateIncome, deleteIncome };
