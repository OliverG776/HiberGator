import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

// Use / for login, as it is the "home page"


function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([]);

  const deleteUser = async (username) => {
  const enteredKey = prompt("Enter admin key to delete user:");
  if (!enteredKey) {
    alert("Admin key is required to delete a user.");
    return;
  }
  try {
    const response = await fetch("/api/delete_user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, admin_key: enteredKey }),
    });
    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("An error occurred while deleting the user.");
  }
};

  const changePassword = async (username) => {
  const newPassword = prompt("Enter new password for user:");
  if (!newPassword) {
    alert("New password is required to change a user's password.");
    return;
  }
  const enteredKey = prompt("Enter admin key to change user password:");
  if (!enteredKey) {
    alert("Admin key is required to change a user's password.");
    return;
  }
  try {
    const response = await fetch("/api/change_user_password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, admin_key: enteredKey, new_password: newPassword }),
    });
    const data = await response.json();

    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.error || "Failed to change user's password.");
    }
  } catch (error) {
    console.error("Error changing user password:", error);
    alert("An error occurred while changing the user's password.");
  }
};

  React.useEffect(() => {
    fetch("/api/collect_all_users/")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);



  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>HiberGator Admin Dashboard</h1>
        

        <div style={styles.grid}>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}> All Users </h2>
            <div style={styles.userList}>
              {users.map((user) => (
                <div style={styles.userRow} key={user.id}>
                  {user.username}
                  <div style={styles.rowButtons}>
                    <button style={styles.changePasswordButton} onClick={() => changePassword(user.username)}>Change Password</button>
                    <button style={styles.deleteButton} onClick={() => deleteUser(user.username)}>
                      Delete User
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>


        <div style={styles.buttonContainer}>
          <button style={styles.logoutButton} onClick={() => navigate("/")}>
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
    height: "400px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
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
    top: "20px",
    right: "20px",
    textAlign: "center",
    width: "100px",
  },
  userList: {
    flex: 1,
    overflowY: "auto",
    paddingRight: "8px",
  },
  userRow: {
    padding: "12px",
    marginBottom: "10px",
    backgroundColor: "#eef6f1",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowButtons: {
    display: "flex",
    gap: "10px",
  }, 
  deleteButton: {
    backgroundColor: "#9b1e08",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  changePasswordButton: {
    backgroundColor: "#0c33a9",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  }

};

export default AdminDashboard;
