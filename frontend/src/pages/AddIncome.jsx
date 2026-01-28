import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar.jsx";

const AddIncome = () => {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");

  const handleAddIncome = async (e) => {
    e.preventDefault();
    try {
      await api.post("/income", { amount, source });
      alert("Income added successfully");
      window.location.href = "/dashboard";
      setAmount("");
      setSource("");
    } catch (err) {
      console.error("Backend Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add income");
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="glass-box">
          <h2>Add Income</h2>
          <form onSubmit={handleAddIncome}>
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
              placeholder="Source (e.g. Salary, Freelance)"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <br />
            <br />
            <button type="submit" className="primary-btn btn-income">
              💰 Add Income
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddIncome;
