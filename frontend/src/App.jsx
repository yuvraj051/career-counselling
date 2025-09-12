import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcomepage from "./Components/Welcomepage";
import Dashboard from "./Components/Dashboard";
import RegistrationForm from "./Components/RegistrationForm";
import Test from "./Components/test";
import { UserProvider } from "./Context/UserContext";
import Login from "./Components/Demo2";
// import RegisterPage from './pages/RegisterPage'; (for later)
// import LoginPage from './pages/LoginPage'; (for later)
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Welcomepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/test" element={<Test />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
