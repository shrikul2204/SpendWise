import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import "../index.css";

const IncomeList = () => {
  const [income, setIncome] = useState([]);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await api.get("/income");
        setIncome(res.data);
      } catch (err) {
        console.error("Error fetching income:", err);
      }
    };

    fetchIncome();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this income?")) return;

    try {
      await api.delete(`/income/${id}`);
      alert("Income deleted successfully");

      // Update UI without reloading page
      setIncome((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete income");
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="glass-box">
          <h2>Your Income</h2>

          {income.length === 0 ? (
            <p>No income records found.</p>
          ) : (
            <table border="1" cellPadding="10" style={{ marginTop: "10px" }}>
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {income.map((item) => (
                  <tr key={item.id}>
                    <td>{item.source}</td>
                    <td>₹{item.amount}</td>
                    <td>{new Date(item.date).toDateString()}</td>
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

export default IncomeList;
