import { Link } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  return (
    <div className="navbar">
  <div className="nav-left">
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/add-income">Add Income</Link>
    <Link to="/add-expense">Add Expense</Link>
    <Link to="/income">Income</Link>
    <Link to="/expenses">Expenses</Link>
  </div>

  <button
    className="logout-btn"
    onClick={() => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }}
  >
    Logout
  </button>
</div>
  );
};


export default Navbar;
