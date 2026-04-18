import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

// Use / for login, as it is the "home page"

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>HiberGator Dashboard</h1>
        <p style={styles.subtitle}>
          View all of your sleeping statistics here!
        </p>

        <div style={styles.grid}>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Sleep History</h2>
            <p style={styles.cardText}>Placeholder</p>
          </div>

        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => navigate("/")}>
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#4252a3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "1000px",
    backgroundColor: "#fa9d46",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    padding: "40px",
  },
  title: {
    fontSize: "36px",
    marginBottom: "10px",
    color: "2b2b2b",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "18px",
    color: "#2b2b2b",
    textAlign: "center",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#eef6f1",
    borderRadius: "12px",
    padding: "20px",
    minHeight: "120px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
  cardTitle: {
    fontSize: "20px",
    marginBottom: "12px",
    color: "black",
    textAlign: "center",
  },
  cardText: {
    fontSize: "17px",
    color: "#666",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0c33a9",
    color: "white",
    border: "none",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Dashboard;
