import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

// Use / for login, as it is the "home page"

function Create_Acc() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admin_key, setAdminKey] = useState("");

  const handleCreateAccount = async () => {
    if (!username.trim() || !password.trim() || !admin_key.trim()) {
      alert("Username, password and admin key are required");
      return;
    }

    console.log("Create account form values:", { username, password, admin_key });

    try {
      const response = await fetch("/api/create_admin_account/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, admin_key }),
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : { error: await response.text() };

      if (response.ok) {
        alert(data.message);
        navigate("/"); // or to login
      } else {
        alert(data.error || "Unable to create account");
      }
    } catch (error) {
      alert(`Error creating account: ${error.message}`);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Create Account</h1>

        <input 
          type="text" 
          placeholder="Username" 
          style={styles.input} 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={styles.input} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Admin Key" 
          style={styles.input} 
          value={admin_key}
          onChange={(e) => setAdminKey(e.target.value)}
        />


        <button style={styles.button} onClick={handleCreateAccount}>
          Create Account
        </button>
        <button style={styles.backButton} onClick={() => navigate("/")}>
          Back to Login
        </button>
        <button style={styles.backButton} onClick={() => navigate("/Create_Acc")}>
          Back to User Account Creation
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
  },
  container: {
    backgroundColor: "#fa9d46",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    textAlign: "center",
    color: "#1b4332",
    marginBottom: "10px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #fa9d46",
  },
  button: {
    backgroundColor: "#0c33a9",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  backButton: {
    backgroundColor: "#f0e4e4",
    color: "#222",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Create_Acc;
