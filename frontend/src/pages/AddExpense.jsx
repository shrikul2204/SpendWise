import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar.jsx";

const AddExpense = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await api.post("/expenses", { amount, category });
      alert("Expense added successfully");
      window.location.href = "/dashboard";
      setAmount("");
      setCategory("");
    } catch (err) {
      console.error("Expense Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="glass-box">
          <h2>Add Expense</h2>

          <form onSubmit={handleAddExpense}>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="Category (food, travel, etc.)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <br />
            <button type="submit" className="primary-btn btn-expense">
              💸 Add Expense
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
