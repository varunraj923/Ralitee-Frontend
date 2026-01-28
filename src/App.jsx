import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

/* Public Pages */
import HomePage from "./components/homepage/HomePage";
import LoginPage from "./components/auth/LoginPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";

/* User Pages */
import UserDashboard from "./components/User/UserDashboard";

/* Admin Pages */
import Dashboard from "./components/admin/pages/Dashboard";
import Products from "./components/admin/pages/Products";
import AddProduct from "./components/admin/pages/AddProduct";
import Categories from "./components/admin/pages/Categories";
import AddCategory from "./components/admin/pages/AddCategory";

/* Route Guards */
import AdminRoute from "./routes/AdminRoute";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* 🌐 PUBLIC ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />

          {/* 👤 USER ROUTES */}
          <Route path="/user/dashboard" element={<UserDashboard />} />

          {/* 🔐 ADMIN ROUTES */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/add-category" element={<AddCategory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
