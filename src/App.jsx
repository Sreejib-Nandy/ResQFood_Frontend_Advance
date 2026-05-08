import React from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthRoute from "./route/AuthRoute";
import ProfileRoute from "./route/ProfileRoute";
import PublicRoute from "./route/PublicRoute";
import Spinner from "./components/Spinner";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import CompleteProfile from "./pages/CompleteProfile";
import UpdateProfile from "./pages/UpdateProfile";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import CreateFoodPage from "./pages/CreateFoodPage";
import ClaimsPage from "./pages/ClaimsPage";
import ProtectedRoute from "./route/ProtectedRoute";
import MapView from "./pages/MapView";
import NgoDashboard from "./pages/NgoDashboard";
import NgoRoutePage from "./pages/NgoRoutePage";
import ImpactPage from "./pages/ImpactPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CookieConsent from "./components/CookieConsent";
import NotFound from "./pages/NotFound";

function AppContent() {
  const { loading, showExpiredBanner } = useAuth();
  const location = useLocation();
  const knownRoutes = [
  "/", "/signup", "/login", "/complete-profile", "/updateprofile",
  "/mapview", "/ngo/dashboard"
];
  const isRestaurantDashboard = location.pathname.startsWith('/restaurant');
  const isCompleteProfilePage = location.pathname === "/complete-profile";
  const is404 =
  !knownRoutes.includes(location.pathname) &&
  !location.pathname.startsWith("/restaurant") &&
  !location.pathname.startsWith("/ngo/route");

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Toaster />
      {(!isCompleteProfilePage && !isRestaurantDashboard && !is404) && <Navbar />}
      {showExpiredBanner && <Banner />}
      <Routes>
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LogIn />
            </AuthRoute>
          }
        />
        <Route
          path="/complete-profile"
          element={
            <ProfileRoute>
              <CompleteProfile />
            </ProfileRoute>
          }
        />
        <Route
          path="/updateprofile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant/*"
          element={
            <ProtectedRoute role="restaurant">
              <RestaurantDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<CreateFoodPage />} />
          <Route path="dashboard/create-food" element={<CreateFoodPage />} />
          <Route path="dashboard/claim-handle" element={<ClaimsPage />} />

          {/* BLOCK ONLY THESE */}
          <Route
            path="dashboard/impacts"
            element={
              <ProtectedRoute role="restaurant" requireActive={true}>
                <ImpactPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="dashboard/analytics-csr"
            element={
              <ProtectedRoute role="restaurant" requireActive={true}>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/mapview" element={<ProtectedRoute role="ngo"><MapView /></ProtectedRoute>} />
        <Route path="/ngo/dashboard" element={<ProtectedRoute role="ngo"><NgoDashboard /></ProtectedRoute>} />
        <Route path="/ngo/route/:claimId" element={<ProtectedRoute role="ngo"><NgoRoutePage /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieConsent />
    </>
  );
}

export default function App() {
  return <AppContent />;
}
