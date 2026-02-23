import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

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
import ProtectedRoute from "./routes/ProtectedRoute";
import ProductPage from "./features/product/ProductPage";
import Navbar from "./components/homepage/Navbar";
import AllProducts from "./features/allProducts/AllProducts";
import CartPage from "./features/cart/CartPage";
import CheckoutPage from "./features/checkout/CheckoutPage";
import OrderSuccessPage from "./features/checkout/OrderSuccessPage";

const App = () => {
  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Navbar />
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />

          {/* 🔐 PROTECTED USER ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<AllProducts />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/product/:id" element={<ProductPage />} />

            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
          </Route>

          {/* 🔐 PROTECTED ADMIN ROUTES */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/add-category" element={<AddCategory />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
