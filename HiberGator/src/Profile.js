import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Profile() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Profile</h1>
        <p style={styles.subtitle}>This is your profile page.</p>
        <button style={styles.button} onClick={() => navigate("/Dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4252a3",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#fa9d46",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    padding: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "36px",
    marginBottom: "10px",
    color: "#2b2b2b",
  },
  subtitle: {
    fontSize: "18px",
    color: "#2b2b2b",
    marginBottom: "24px",
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

export default Profile;
