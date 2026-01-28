import { useEffect, useState } from "react";
import api from "../api/api";
import "../index.css";
import Navbar from "../components/Navbar.jsx";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [aiMessage, setAiMessage] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [insights, setInsights] = useState([]);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await api.get("/ai");
        setInsights(res.data.insights);
      } catch (err) {
        console.error("AI Insights Error:", err);
      }
    };
    const fetchPrediction = async () => {
      try {
        const res = await api.get("/prediction");
        setPrediction(res.data);
      } catch (err) {
        console.error("Prediction Error:", err);
      }
    };
    const fetchSummary = async () => {
      try {
        const res = await api.get("/summary");
        setSummary(res.data);

        const { totalIncome, totalExpense, balance } = res.data;

        // AI Logic
        if (totalExpense > totalIncome) {
          setAiMessage("⚠️ You are spending more than your income!");
        } else if (balance < 1000) {
          setAiMessage("🚨 Your balance is very low. Spend carefully!");
        } else {
          setAiMessage("✅ Your finances look stable.");
        }
      } catch (err) {
        console.error("Summary Error:", err.response?.data || err.message);
      }
    };
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions");
        setTransactions(res.data);
      } catch (err) {
        console.error("Transaction Error:", err.response?.data || err.message);
      }
    };

    fetchInsights();
    fetchPrediction();
    fetchSummary();
    fetchTransactions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2>📊 Dashboard</h2>

        {/* AI Assistant */}
        <div className="ai-banner">🤖 AI Assistant: {aiMessage}</div>

        {/* AI Prediction */}
        {prediction && (
          <div className="ai-box">
            <h3>🔮 Smart Prediction</h3>
            <p>📊 Daily Income: ₹{prediction.dailyIncome}</p>
            <p>📉 Daily Expense: ₹{prediction.dailyExpense}</p>
            <p>💰 Balance after 30 days: ₹{prediction.futureBalance}</p>

            <div style={{ marginTop: "12px" }}>
              <h4>🧠 AI Insights</h4>
              {insights.map((msg, index) => (
                <p key={index}>• {msg}</p>
              ))}
            </div>

            {prediction.daysLeft !== null && (
              <p style={{ color: "#f87171" }}>
                🚨 Money may run out in {prediction.daysLeft} days.
              </p>
            )}
          </div>
        )}

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Income</h3>
            <div className="stat-value" style={{ color: "#22c55e" }}>
              ₹{summary.totalIncome}
            </div>
          </div>

          <div className="stat-card">
            <h3>Total Expense</h3>
            <div className="stat-value" style={{ color: "#ef4444" }}>
              ₹{summary.totalExpense}
            </div>
          </div>

          <div className="stat-card">
            <h3>Balance</h3>
            <div className="stat-value" style={{ color: "#38bdf8" }}>
              ₹{summary.balance}
            </div>
          </div>
        </div>

        {/* Transactions */}
        <h3 style={{ marginTop: "24px" }}>Recent Transactions</h3>
        <ul className="transaction-list">
          {transactions.map((t) => (
            <li key={t.id}>
              <span>
                {t.type === "income" ? "🟢" : "🔴"} {t.title}
              </span>
              <span>
                ₹{t.amount} • {new Date(t.date).toDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
