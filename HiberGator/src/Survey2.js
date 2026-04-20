import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Survey2() {
    const navigate = useNavigate();
    const [surveyAnswer1, setSurveyAnswer1] = useState("");
    const [surveyAnswer2, setSurveyAnswer2] = useState("");
    const [surveyAnswer3, setSurveyAnswer3] = useState("");
    const [surveyAnswer4, setSurveyAnswer4] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    //These all save responses (I believe, copied the login logic)
    //Colby go through and manipulate these if yk how to save the responses to the database.

    //Prevents the user from submitting the surveyw without answering all questions
    const surveyComplete = surveyAnswer1 && surveyAnswer2 && surveyAnswer3 && surveyAnswer4;

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>Survey</h1>
                <div style={styles.inputContainer}>
                    <div> 
                        <label>Please enter the amount of sleep you got for each date (that you can remember):</label>
                    </div>
                    <div> 
                        <label>Enter a day of the week:</label>
                    </div>
                    <select 
                        value={currentDate}
                        onChange={(e) => setCurrentDate(e.target.value)}
                        style={styles.input}
                    >
                        <option value="">Select an answer</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                    
                    <div> 
                        <label>2. How many hours of sleep do you get every night?</label>
                    </div>
                    <select 
                        value={surveyAnswer2}
                        onChange={(e) => setSurveyAnswer2(e.target.value)}
                        style={styles.input}
                    >
                        <option value="">Select an answer</option>
                        <option value="Less than 4 hours">Less than 4 hours</option>
                        <option value="4 hours">4 hours</option>
                        <option value="5 hours">5 hours</option>
                        <option value="6 hours">6 hours</option>
                        <option value="7 hours">7 hours</option>
                        <option value="8 hours">8 hours</option>
                        <option value="9 or more hours">9 or more hours</option>
                    </select>

                    <div> 
                        <label>3. Do you use smart devices before bed?</label>
                    </div>
                    <select 
                        value={surveyAnswer3}
                        onChange={(e) => setSurveyAnswer3(e.target.value)}
                        style={styles.input}
                    >
                        <option value="">Select an answer</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>

                    <div> 
                        <label>4. Do you consume caffeine at all?</label>
                    </div>
                    <select 
                        value={surveyAnswer4}
                        onChange={(e) => setSurveyAnswer4(e.target.value)}
                        style={styles.input}
                    >
                        <option value="">Select an answer</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                
                
                <div style={styles.buttonContainer}>
                    <button style={styles.dashboardButton} onClick={() => navigate("/Dashboard")}>
                       Dashboard
                    </button>

                    <button style={styles.finishButton} 
                            onClick={() => navigate("/Dashboard")}
                            disabled={!surveyComplete}
                            >
                        Complete Survey!
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
        maxWidth: "750px",
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

export default Survey2;