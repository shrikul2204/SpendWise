import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import "../index.css";
const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get("/expenses");
        setExpenses(res.data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;

    try {
      await api.delete(`/expenses/${id}`);
      alert("Expense deleted successfully");

      setExpenses((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete expense");
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="glass-box">
          {" "}
          <h2>Your Expenses</h2>
          {expenses.length === 0 ? (
            <p>No expense records found.</p>
          ) : (
            <table border="1" cellPadding="10" style={{ marginTop: "10px" }}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((item) => (
                  <tr key={item.id}>
                    <td>{item.category}</td>
                    <td>₹{item.amount}</td>
                    <td>{new Date(item.date).toDateString()}</td>
                    <td>{item.note || "-"}</td>
                    <td>
                      <button onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpenseList;
