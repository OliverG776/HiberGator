import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Profile() {
    const navigate = useNavigate();
    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>Profile</h1>
                <div style={styles.buttonContainer}>
                    <button style={styles.dashboardButton} onClick={() => navigate("/Dashboard")}>
                    Dashboard
                    </button>
                </div>
                <div> 
                        <label>Name: </label>
                    </div>
                <div> 
                        <label>Age: </label>
                    </div>
                <div> 
                    <label>Average Hours of Sleep (per night) </label>
                </div>
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
        borderRadius: "8px",
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        width: "100%",
        maxWidth: "1250px",
        height: "600px",
        position: "relative",
    },
    title: {
        fontSize: "36px",
        margin: "0 0 10px 0",
        color: "#2b2b2b",
        textAlign: "center",
    },
    subtitle: {
        fontSize: "18px",
        color: "#2b2b2b",
        margin: "0 0 20px 0",
        textAlign: "center",
    },
    button: {
        backgroundColor: "#0c33a9",
        color: "white",
        border: "none",
        padding: "12px 24px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
            marginTop: "20px",
    },
    dashboardButton: {
    backgroundColor: "#0c33a9",
    color: "white",
    border: "none",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    top: "20px",
    right: "20px",
    width: "100px",
    textAlign: "center",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
  }
 
};

export default Profile;