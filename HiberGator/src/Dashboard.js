import React from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);


// Use / for login, as it is the "home page"

//Basic example, need to change
//
function SleepGraph({sleepData}) {
    const data = {
        labels: sleepData.map((entry) => entry.date),
        datasets: [
            {
                label: "Hours of Sleep",
                data: sleepData.map((entry) => entry.hours),
                backgroundColor: "rgba(38, 187, 38, 0.6)",
                borderColor: "rgb(16, 68, 18)",
                borderWidth: 1,
                pointRadius: 5,
                tension: 0.4,
                fill: false,
            },
        ],
    };
    return <Line data={data} />;

}

function Dashboard() {
  const navigate = useNavigate();
  const exampleSleepData = [
    {date: "Mon", hours: 6 },
    {date: "Tue", hours: 7 },
    {date: "Wed", hours: 6 },
    {date: "Thu", hours: 7 },
    {date: "Fri", hours: 6 },
    {date: "Sat", hours: 7 },
    {date: "Sun", hours: 6 },
  ];


  

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
            <SleepGraph sleepData={exampleSleepData} />
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.profileButton} onClick={() => navigate("/Profile")}>
            Profile
          </button>
        </div>
          

        <div style={styles.buttonContainer}>
          <button style={styles.surveyButton} onClick={() => navigate("/Survey")}>
            Survey
          </button>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.logoutButton} onClick={() => {localStorage.removeItem("username"); navigate("/")}}>
            Logout
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
    position: "relative",
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
  profileButton: {
    backgroundColor: "#0c33a9",
    color: "white",
    border: "none",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    position: "absolute",
    top: "20px",
    right: "20px",
    width: "100px",
  },
  logoutButton: {
    backgroundColor: "#9b1e08",
    color: "white",
    border: "none",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    position: "absolute",
    top: "70px",
    right: "20px",
    textAlign: "center",
    width: "100px",
  },
  surveyButton: {
    backgroundColor: "#0c33a9",
    color: "white",
    border: "none",
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    position: "absolute",
    top: "20px",
    left: "20px",
    textAlign: "center",
    width: "100px",
  }
};

export default Dashboard;
