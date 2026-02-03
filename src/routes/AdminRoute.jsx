import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { token, role, user } = useSelector((state) => state.auth);

  // ⛔ Not logged in
  if (!token || !user) {
    return (<Navigate to="/login" replace />);
  }

  // ⛔ Logged in but not admin
  if (role !== "admin") {
    return (<Navigate to="/user/dashboard" replace />);
  }

  // ✅ Admin allowed
  return <Outlet />;
};

export default AdminRoute;
