import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Survey2() {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState("");
    const [sleepHours, setSleepHours] = useState("");
    const [sleepByDate, setSleepByDate] = useState({});
    const surveyComplete = sleepHours && currentDate;
    // const[dateResponses, setDateResponses] = useState({
    //     currentDate: "",
    //     dayAnswers: {
    //         monday: false,
    //         tuesday: false,
    //         wednesday: false,
    //         thursday: false,
    //         friday: false,
    //         saturday: false,
    //         sunday: false,
    //     },
    // });


    // const surveyComplete = Object.values(dateResponses.dayAnswers).some((isChecked) => isChecked);

    //These all save responses (I believe, copied the login logic)
    //Colby go through and manipulate these if yk how to save the responses to the database.

    //Prevents the user from submitting the surveyw without answering all questions
    const handleSubmitDate = async () => {
        const username = localStorage.getItem("username");

        if(!currentDate || !sleepHours) {
            return;
        }
        
        try{
            const response = await fetch("/api/save_sleep_data/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, date: currentDate, sleepHours: Number(sleepHours) }),
            });
            const data = await response.json();

            if(response.ok) {
                alert(data.message);
                setSleepByDate((prev) => ({ ...prev, [currentDate]: Number(sleepHours) }));
            }else {
                alert(data.error || "Failed to save sleep data");
            } 
        } catch (error) {
            alert("Server error while saving sleep data: " + error.message);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>Survey</h1>
                <div style={styles.inputContainer}>
                    <div> 
                        <label>Select a date to enter sleep data:</label>
                    </div>

                    <label>
                        <input
                        type = "date"
                        value={currentDate}
                        onChange={(e) => {
                            setCurrentDate(e.target.value);
                            setSleepHours("");
                        }}></input>
                            
                    </label>
                    {currentDate && (
                        <div>
                            <label>How many hours of sleep did you get?</label>
                            <br />
                            <br />

                            <select 
                        value={sleepHours}
                        onChange={(e) => setSleepHours(e.target.value)}
                        style={styles.input}
                    >
                        <option value="">Select an answer</option>
                        <option value="3">Less than 4 hours</option>
                        <option value="4">4 hours</option>
                        <option value="5">5 hours</option>
                        <option value="6">6 hours</option>
                        <option value="7">7 hours</option>
                        <option value="8">8 hours</option>
                        <option value="9">9 or more hours</option>
                    </select>
                    <button style = {styles.submitButton} disabled = {!surveyComplete} onClick = {handleSubmitDate}>

                    Submit Date
                    </button>
                        </div>
                    )}
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
  },
  submitButton: {
    backgroundColor: "#527a5c",
    color: "white",
    border: "none",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "200px",
    textAlign: "center",
    justifyContent: "center",
    display: "block",
    marginTop: "20px",
    marginLeft: "auto",
    marginRight: "auto",
  }
 
};

export default Survey2;