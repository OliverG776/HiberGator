import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>HiberGator Dashboard</h1>
        <p style={styles.subtitle}>
          Welcome to your sleep tracking dashboard
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Account Overview</h2>
            <p style={styles.cardText}>No info available</p>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Sleep History</h2>
            <p style={styles.cardText}>No info available</p>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Weekly Average</h2>
            <p style={styles.cardText}>No info available</p>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Recommendations</h2>
            <p style={styles.cardText}>No info available</p>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => navigate("/login")}>
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
    backgroundColor: "#f4f8fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "1000px",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    padding: "40px",
  },
  title: {
    fontSize: "36px",
    marginBottom: "10px",
    color: "#1b4332",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
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
    minHeight: "140px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
  cardTitle: {
    fontSize: "20px",
    marginBottom: "12px",
    color: "#2d6a4f",
  },
  cardText: {
    fontSize: "16px",
    color: "#666",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#2d6a4f",
    color: "white",
    border: "none",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Dashboard;