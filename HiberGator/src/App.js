import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Create_Acc from "./Create_Acc";
import Admin_Create from "./Admin_Create";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Create_Acc" element={<Create_Acc />} />
        <Route path="/Admin_Create" element={<Admin_Create />} />
      </Routes>
    </Router>
  );
}

export default App;
