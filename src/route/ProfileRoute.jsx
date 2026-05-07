import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const ProfileRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Already completed profile → don't allow here
  if (user.isProfileComplete) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProfileRoute;
