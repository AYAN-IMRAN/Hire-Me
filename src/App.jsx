import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner"; 
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Footer from "./components/Footer";

function App() {
  return (
    <Router className="max-w-[80%]" >
      <div className="bg-[#0B0F19] min-h-screen text-white px-4 ">
        {/* Navbar Fixed Top */}
        <Navbar />

        {/* Toast Notifications */}
        <Toaster position="top-right" richColors />

        {/* Page Content Wrapper */}
        <main className="pt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
