import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children, role, requireActive = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Profile incomplete
  if (!user.isProfileComplete) {
    return <Navigate to="/complete-profile" replace />;
  }

  // Role check
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  if (requireActive && user.status === "expired") {
    toast.error("Your plan expired. Upgrade to continue.");
    return <Navigate to="/restaurant/dashboard/create-food" replace />;
  }

  return children;
};

export default ProtectedRoute;
