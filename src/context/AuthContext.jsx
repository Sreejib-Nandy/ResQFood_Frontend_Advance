import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { connectSocket, disconnectSocket } from "../socket/socket";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showExpiredBanner, setShowExpiredBanner] = useState(false);
  const navigate = useNavigate();

  // -----------------------------
  // SESSION RESTORE
  // -----------------------------
  const loadUser = async () => {
    try {
      const res = await api.get("/user/me");
      setUser(res.data);
      // connect socket ONLY if logged in
      connectSocket();
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadUser();
    };

    init();

    return () => {
      disconnectSocket();
    };
  }, []);

  const isExpiredUser =
    user?.role === "restaurant" && user?.status === "expired";

  useEffect(() => {
    if (!isExpiredUser) return;

    setShowExpiredBanner(true);

    const timer = setTimeout(() => {
      setShowExpiredBanner(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isExpiredUser]);

  // -----------------------------
  // LOGIN
  // -----------------------------
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true },
      );

      // backend already returns user
      setUser(res.data.user);

      toast.success(res.data.message);

      connectSocket();

      navigate("/");

      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // SIGNUP
  // -----------------------------
  const signup = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", formData);

      toast.success(res.data.message);

      return { success: true };
    } catch (err) {
      console.log(err.response?.data?.message);
      toast.error(err.response?.data?.message || "Signup failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };
  // -----------------------------
  // COMPLETE PROFILE
  // -----------------------------
  const completeProfile = async (formData) => {
    setLoading(true);
    try {
      const res = await api.put("/auth/complete-profile", formData);

      toast.success(res.data.message);
      navigate("/");

      return { success: true };
    } catch (err) {
      console.log(err.response?.data?.message);
      toast.error(err.response?.data?.message || "Profile creation failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // GOOGLE OAUTH
  // -----------------------------
  const googleAuth = async (code) => {
    try {
      const res = await api.get(`auth/google?code=${code}`);

      const { user, isNewUser } = res.data;

      setUser(user);
      connectSocket();

      toast.success(res.data.message);

      if (isNewUser || !user.isProfileComplete) {
        navigate("/create-profile");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
      const message = err.response?.data?.message || "Google Login Failed";

      toast.error(message);
    }
  };
  // -----------------------------
  // LOGOUT
  // -----------------------------
  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });

      setUser(null);
      disconnectSocket();

      toast.success("Logged out successfully");

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  // FORCE LOGOUT (token expired etc)
  const hardLogout = () => {
    setUser(null);
    disconnectSocket();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        showExpiredBanner,
        login,
        signup,
        logout,
        hardLogout,
        loadUser,
        googleAuth,
        completeProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
