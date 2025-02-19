import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginRegister from "./pages/login/LoginRegister";
import Dashboard from "./components/dashboard/Dashboard";
import React from "react";
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>

  <Router>
    <Routes>
      <Route path="/login" element={<LoginRegister type="login"/>} />
      <Route path="/register" element={<LoginRegister type="register"/>} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  </QueryClientProvider>

);

export default App;
