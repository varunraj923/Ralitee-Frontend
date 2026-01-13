import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import LoginPage from "./components/auth/LoginPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/login" element = {<LoginPage/>}/>
    </Routes>
  </BrowserRouter>
);

export default App;
