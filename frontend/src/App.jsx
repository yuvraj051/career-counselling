import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcomepage from "./Components/Welcomepage";
import Dashboard from "./Components/Dashboard";
// import RegisterPage from './pages/RegisterPage'; (for later)
// import LoginPage from './pages/LoginPage'; (for later)
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcomepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
