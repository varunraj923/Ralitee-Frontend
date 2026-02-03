import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { token, user } = useSelector((state) => state.auth);

    // ⛔ Not logged in
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // ✅ Logged in
    return <Outlet />;
};

export default ProtectedRoute;
