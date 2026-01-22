import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import LoginPage from "./components/auth/LoginPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/login" element = {<LoginPage/>}/>
      <Route path="/forgot" element = {<ForgotPasswordPage/>}/>
    </Routes>
  </BrowserRouter>
);

export default App;
