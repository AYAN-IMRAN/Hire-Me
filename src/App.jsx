// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import JobsSection from "./pages/Jobs";
import CompanyDashboard from "./pages/CompanyDashboard";
import CreateJob from "./pages/CreateJob";
import ApplyJob from "./pages/ApplyJob";

import { useAuth } from "./context/AuthContext";

// ===== Guards =====
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p className="text-gray-300">Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const OnboardingGuard = ({ children }) => {
  const { user } = useAuth();
  if (user && !user.prefs?.role) return <Navigate to="/onboarding" replace />;
  return children;
};

// ===== Layouts =====
const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-[#0B0F19] text-white">
    <Navbar />
    <main className="flex-1 pt-10 px-4">{children}</main>
    <Footer />
  </div>
);

const DashboardLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-[#0B0F19] text-white">
    <Navbar />
    <main className="flex-1 pt-10 px-4">{children}</main>
  </div>
);

// ===== App =====
function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/signup" element={<PublicLayout><Signup /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/jobs" element={<PublicLayout><JobsSection /></PublicLayout>} />

        {/* Protected Routes */}
        <Route
          path="/onboarding"
          element={
            <PrivateRoute>
              <DashboardLayout><Onboarding /></DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <OnboardingGuard>
                <DashboardLayout><Profile /></DashboardLayout>
              </OnboardingGuard>
            </PrivateRoute>
          }
        />
        <Route
          path="/company-dashboard"
          element={
            <PrivateRoute>
              <OnboardingGuard>
                <DashboardLayout><CompanyDashboard /></DashboardLayout>
              </OnboardingGuard>
            </PrivateRoute>
          }
        />
        <Route
          path="/create-job"
          element={
            <PrivateRoute>
              <OnboardingGuard>
                <DashboardLayout><CreateJob /></DashboardLayout>
              </OnboardingGuard>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply-job/:jobId"
          element={
            <PrivateRoute>
              <OnboardingGuard>
                <DashboardLayout><ApplyJob /></DashboardLayout>
              </OnboardingGuard>
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
