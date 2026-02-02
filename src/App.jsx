import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import HomePage from "./components/homepage/HomePage";
import LoginPage from "./components/auth/LoginPage";
import { store } from "./redux/store";

import Dashboard from "./components/admin/pages/Dashboard";
import Products from "./components/admin/pages/Products";
import AddProduct from "./components/admin/pages/AddProduct";
import Categories from "./components/admin/pages/Categories";
import AddCategory from "./components/admin/pages/AddCategory";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import UserDashboard from "./components/User/UserDashboard";

import AdminRoute from "./routes/AdminRoute";
import ProductPage from "./features/product/ProductPage";

const App = () => {
  return (
    <Provider store={store}>

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/product" element={< ProductPage/>} />

        {/* 🔐 PROTECTED ADMIN ROUTES */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
        </Route>
      </Routes>

    </Provider>
  );
};

export default App;
