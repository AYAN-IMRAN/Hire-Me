import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle, XCircle, Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function CompanyDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Ayan Ahmed",
      role: "Frontend Developer",
      intro: "I love building clean UIs with React & Tailwind.",
      resume: "#",
      status: "pending",
    },
    {
      id: 2,
      name: "Sara Khan",
      role: "UI/UX Designer",
      intro: "Passionate about user-centered design and wireframing.",
      resume: "#",
      status: "pending",
    },
  ]);

  const handleAction = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel: Company Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-[#1A1F2E] rounded-2xl p-6 shadow-lg border border-gray-800 flex flex-col items-center"
        >
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase() || "C"}
          </div>
          <h2 className="mt-3 text-xl font-bold text-center">
            {user?.name || "Company Name"}
          </h2>
          <p className="text-gray-400 text-sm text-center">{user?.email}</p>

          {/* Details */}
          <div className="mt-6 space-y-4 w-full">
            <div>
              <p className="text-gray-400 text-sm">Role</p>
              <p className="font-medium">
                {user?.prefs?.role || "Company"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Industry</p>
              <p className="font-medium">
                {user?.prefs?.industry || "Not provided"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Panel: Applications + Post Job */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="lg:col-span-2 bg-[#1A1F2E] rounded-2xl p-6 shadow-lg border border-gray-800"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Briefcase size={20} /> Applications
            </h2>
            <button
              onClick={() => navigate("/create-job")}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-sm font-medium"
            >
              <Plus size={18} /> Post Job
            </button>
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {applications.map((app) => (
              <motion.div
                key={app.id}
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-[#242B3A] rounded-xl border border-gray-700 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{app.name}</h3>
                    <p className="text-gray-400 text-sm">{app.role}</p>
                    <p className="text-gray-300 text-sm mt-2">{app.intro}</p>
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 text-sm underline mt-1 block"
                    >
                      View Resume
                    </a>
                  </div>

                  {/* Action Buttons */}
                  {app.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(app.id, "accepted")}
                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
                      >
                        <CheckCircle size={16} /> Accept
                      </button>
                      <button
                        onClick={() => handleAction(app.id, "rejected")}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        app.status === "accepted"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {app.status.toUpperCase()}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CompanyDashboard;
