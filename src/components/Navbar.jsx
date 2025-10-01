import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // CTA button
  const renderCTA = () => {
    if (!user) {
      // Guest user
      return (
        <a
          href="/login"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 
                     text-white font-medium shadow hover:shadow-lg hover:scale-105 
                     transition-transform"
        >
          Post a Job
        </a>
      );
    }

    if (user?.prefs?.role === "company") {
      // Company user
      return (
        <a
          href="/company-dashboard"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 
                     text-white font-medium shadow hover:shadow-lg hover:scale-105 
                     transition-transform"
        >
          Post a Job
        </a>
      );
    }

    if (user?.prefs?.role === "seeker") {
      // Seeker user show profile
      return (
        <a
          href="/profile"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 
                     text-white font-medium shadow hover:shadow-lg hover:scale-105 
                     transition-transform"
        >
          My Profile
        </a>
      );
    }

    return null;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B0F19]/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <a href="/" className="text-white text-2xl font-bold">
          Hire<span className="text-indigo-400">Me</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-gray-300 hover:text-indigo-400 transition-colors">
            Home
          </a>
          <a href="/jobs" className="text-gray-300 hover:text-indigo-400 transition-colors">
            Jobs
          </a>

          {/* Conditional CTA */}
          {renderCTA()}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0B0F19]/95 backdrop-blur-md border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          <a href="/" className="text-gray-300 hover:text-indigo-400">
            Home
          </a>
          <a href="/jobs" className="text-gray-300 hover:text-indigo-400">
            Jobs
          </a>
          <a href="/companies" className="text-gray-300 hover:text-indigo-400">
            Companies
          </a>
          <a href="/about" className="text-gray-300 hover:text-indigo-400">
            About
          </a>

          {/* Conditional CTA */}
          {renderCTA()}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
