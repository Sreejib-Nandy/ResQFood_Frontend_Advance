import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (user) {
    // profile not completed
    if (!user.isProfileComplete) {
      return <Navigate to="/complete-profile" replace />;
    }

    // fallback
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;
