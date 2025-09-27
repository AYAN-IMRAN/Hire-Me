import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import JobsSection from "./pages/Jobs";
import { useAuth } from "./context/AuthContext";
import CompanyDashboard from "./pages/CompanyDashboard";


//  Private route guard
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-gray-300">Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

// Onboarding guard
const OnboardingGuard = ({ children }) => {
  const { user } = useAuth();
  if (user && !user.prefs?.role) {
    return <Navigate to="/onboarding" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="bg-[#0B0F19] min-h-screen text-white">
        {/*  Navbar */}
        <Navbar />

        {/*  Routes */}
        <main className="pt-10 px-4">
          <Routes>
            {/*  Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/jobs" element={<JobsSection />} />

            {/* Protected Routes */}
            <Route
              path="/onboarding"
              element={
                <PrivateRoute>
                  <Onboarding />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <OnboardingGuard>
                    <Profile />
                  </OnboardingGuard>
                </PrivateRoute>
              }
            />

            <Route
              path="/company-dashboard"
              element={
                <PrivateRoute>
                  <OnboardingGuard>
                    <CompanyDashboard />
                  </OnboardingGuard>
                </PrivateRoute>
              }
            />

            {/* Catch-all → redirect home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Toast notifications */}
        <Toaster richColors position="top-center" />
      </div>
    </Router>
  );
}

export default App;
