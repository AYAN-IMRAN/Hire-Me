import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
// import toast, { ToastBar } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

function App() {
  return (
    <Router>
      <div className="bg-[#0B0F19] min-h-screen text-white px-4">
        {/* Navbar Fixed Top */}
        <Navbar />

        {/* Routes */}
        <main className="pt-10 px-4">
          <Routes>
            {/* Public Routes */}
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

            
            <Route
              path="/create-job"
              element={
                <PrivateRoute>
                  <OnboardingGuard>
                    <CreateJob />
                  </OnboardingGuard>
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
