import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Create_Acc from "./Create_Acc";
import Admin_Create from "./Admin_Create";
import AdminDashboard from "./AdminDashboard";
import Profile from "./Profile";
import Survey from "./Survey";
import Survey2 from "./Survey2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Create_Acc" element={<Create_Acc />} />
        <Route path="/Admin_Create" element={<Admin_Create />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Survey" element={<Survey />} />
        <Route path="/Survey2" element={<Survey2 />} />
      </Routes>
    </Router>
  );
}

export default App;
