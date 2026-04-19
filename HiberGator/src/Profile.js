import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = React.useState({
    username: "",
    age: "",
    sex: "",
    height: "",
    weight: "",
  });

  const [editing, setEditing] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    const username = localStorage.getItem("username");
    if(!username) {
      alert("No user logged in. Redirecting to login page.");
      navigate("/");
      return;
    }

    fetch("/api/get_profile/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .then(data => {
      setProfile({
        username: data.username,
        age: data.age,
        sex: data.sex,
        height: data.height,
        weight: data.weight,
      });
    });
  }, [navigate]);

  const editField = (field) => {
    setEditing(field);
    setInputValue(profile[field]);
  };

  const cancelField = () => {
    setEditing("");
    setInputValue("");
  };

  const saveField = async () => {
    if (!editing) return;

    try {
      const body = {username: profile.username};
      if (editing === "password") {
        body.new_password = inputValue;
      } else {
        body[editing] = inputValue;
      } 

    const response = await fetch("/api/update_profile/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (response.ok) {
      setProfile(prev => ({ ...prev, [editing]: inputValue }));
      setEditing("");
      setInputValue("");
    } else {
      alert(data.error || "Failed to update profile.");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("An error occurred while updating the profile.");
  }
  };
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Profile</h1>

        <div style={styles.row}>
          <div style={styles.rowText}>
            <strong>Username:</strong> {profile.username || "Not Entered Yet"}
          </div>
        </div>

        <div style={styles.row}>
        <div style={styles.rowText}>
          <strong>Password:</strong> ********
        </div>
        <button style={styles.smallButton} onClick={() => editField("password")}>
          Change
        </button>
      </div>

      <div style={styles.row}>
        <div style={styles.rowText}>
          <strong>Age:</strong> {profile.age || "Not entered yet"}
        </div>
        <button style={styles.smallButton} onClick={() => editField("age")}>
          {profile.age ? "Change" : "Enter"}
        </button>
      </div>

      <div style={styles.row}>
        <div style={styles.rowText}>
          <strong>Sex:</strong> {profile.sex || "Not entered yet"}
        </div>
        <button style={styles.smallButton} onClick={() => editField("sex")}>
          {profile.sex ? "Change" : "Enter"}
        </button>
      </div>

      <div style={styles.row}>
        <div style={styles.rowText}>
          <strong>Height:</strong> {profile.height || "Not entered yet"}
        </div>
        <button style={styles.smallButton} onClick={() => editField("height")}>
          {profile.height ? "Change" : "Enter"}
        </button>
      </div>

      <div style={styles.row}>
        <div style={styles.rowText}>
          <strong>Weight:</strong> {profile.weight || "Not entered yet"}
        </div>
        <button style={styles.smallButton} onClick={() => editField("weight")}>
          {profile.weight ? "Change" : "Enter"}
        </button>
      </div>

      {editing && (
        <div style={styles.editBox}>
          <h3 style={styles.editTitle}>
            {editing === "password"
              ? "Change Password"
              : `Edit ${editing.charAt(0).toUpperCase() + editing.slice(1)}`}
          </h3>

          <input
            type={editing === "password" ? "password" : "text"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              editing === "password"
                ? "Enter new password"
                : `Enter ${editing}`
            }
            style={styles.input}
          />

          <div style={styles.buttonRow}>
            <button style={styles.button} onClick={saveField}>
              Save
            </button>
            <button style={styles.cancelButton} onClick={cancelField}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <button style={styles.backButton} onClick={() => navigate("/Dashboard")}>
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
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eef6f1",
    borderRadius: "10px",
    padding: "14px 18px",
    marginBottom: "14px",
  },
  rowText: {
    fontSize: "17px",
    color: "#2b2b2b",
  },
  smallButton: {
    backgroundColor: "#0c33a9",
    color: "white",
    border: "none",
    padding: "8px 14px",
    fontSize: "14px",
    borderRadius: "8px",
    cursor: "pointer",
  },editBox: {
  backgroundColor: "#eef6f1",
  borderRadius: "12px",
  padding: "20px",
  marginTop: "20px",
  marginBottom: "20px",
},
editTitle: {
  marginBottom: "12px",
  color: "#2b2b2b",
},
input: {
  width: "100%",
  padding: "12px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
  marginBottom: "16px",
},
buttonRow: {
  display: "flex",
  gap: "10px",
},
cancelButton: {
  backgroundColor: "#9b1e08",
  color: "white",
  border: "none",
  padding: "12px 24px",
  fontSize: "16px",
  borderRadius: "8px",
  cursor: "pointer",
},
backButton: {
  backgroundColor: "#0c33a9",
  color: "white",
  border: "none",
  padding: "12px 24px",
  fontSize: "16px",
  borderRadius: "8px",
  cursor: "pointer",
  display: "block",
  margin: "0 auto",
},
};

export default Profile;
