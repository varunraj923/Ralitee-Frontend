import { Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import LoginPage from "./components/auth/LoginPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import UserDashboard from "./components/User/UserDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/user/dashboard" element={<UserDashboard />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/forgot" element={<ForgotPasswordPage />} />
  </Routes>
);

export default App;
