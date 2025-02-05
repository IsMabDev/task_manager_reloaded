import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginRegister from "./pages/login/LoginRegister";
import Dashboard from "./pages/dashboard/Dashboard";
import React from "react";


const App = () => (

  <Router>
    <Routes>
      <Route path="/login" element={<LoginRegister type="login"/>} />
      <Route path="/register" element={<LoginRegister type="register"/>} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

export default App;
