import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Survey() {
    const navigate = useNavigate();
    const [surveyAnswer1, setSurveyAnswer1] = useState("");
    const [surveyAnswer2, setSurveyAnswer2] = useState("");
    const [surveyAnswer3, setSurveyAnswer3] = useState("");

    //These all save responses (I believe, copied the login logic)
    //Colby go through and manipulate these if yk how to save the responses to the database.

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>Survey</h1>
                <div style={styles.inputContainer}>
                    <div> 
                        <label>1. What is your full name?</label>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter your response."
                        value={surveyAnswer1}
                        onChange={(e) => setSurveyAnswer1(e.target.value)}
                        style={styles.input}
                    />
                    
                    <div> 
                        <label>2. What is your age?</label>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter your response."
                        value={surveyAnswer2}
                        onChange={(e) => setSurveyAnswer2(e.target.value)}
                        style={styles.input}
                    />

                    <div> 
                        <label>3. How many hours of sleep do you get every night?</label>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter your response."
                        value={surveyAnswer3}
                        onChange={(e) => setSurveyAnswer3(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.buttonContainer}>
                    <button style={styles.dashboardButton} onClick={() => navigate("/Dashboard")}>
                       Dashboard
                    </button>
                    <button style={styles.finishButton} onClick={() => navigate("/Dashboard")}>
                        Finish Survey!
                    </button>
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
        display: "flex",
        flexDirection: "column",
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
        marginTop: "auto",
        paddingTop: "20px",
    },
    inputContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
    },
    input: {
        padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #fa9d46",
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
  },
  finishButton: {
    backgroundColor: "#0c33a9",
    color: "white",
    border: "none",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    top: "550px",
    right: "578px",
    width: "200px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  }
 
};

export default Survey;