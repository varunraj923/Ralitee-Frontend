import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { token, role } = useSelector((state) => state.auth);

  // ⛔ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ Logged in but not admin
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Admin allowed
  return <Outlet />;
};

export default AdminRoute;
