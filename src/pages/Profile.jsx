import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Bookmark, Briefcase, Save } from "lucide-react";
import Tag from "../components/Tag";

function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("applied");

  // Dummy job data
  const jobs = {
    applied: [
      { id: 1, title: "Frontend Developer", company: "TechCorp", status: "Under Review" },
      { id: 2, title: "UI/UX Designer", company: "Creative Studio", status: "Interview Scheduled" },
    ],
    saved: [
      { id: 3, title: "Backend Engineer", company: "Cloudify" },
      { id: 4, title: "Product Manager", company: "InnovateX" },
    ],
    bookmarks: [
      { id: 5, title: "Data Scientist", company: "AI Labs" },
    ],
  };

  const renderJobs = () => {
    return jobs[activeTab].map((job) => (
      <motion.div
        key={job.id}
        whileHover={{ scale: 1.01 }}
        className="p-4 bg-[#1A1F2E] rounded-xl border border-gray-800 shadow-md flex justify-between items-center"
      >
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-400 text-sm">{job.company}</p>
        </div>
         {job.status && <Tag label={job.status} />}
      </motion.div>
    ));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Panel: User Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-[#1A1F2E] rounded-2xl p-6 shadow-lg border border-gray-800 flex flex-col items-center"
        >
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <h2 className="mt-3 text-xl font-bold text-center">{user?.name || "Unnamed User"}</h2>
          <p className="text-gray-400 text-sm text-center">{user?.email}</p>

          {/* Details */}
          <div className="mt-6 space-y-4 w-full">
            <div>
              <p className="text-gray-400 text-sm">Role</p>
              <p className="font-medium">{user?.prefs?.role || "Not selected"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Expertise</p>
              <p className="font-medium">{user?.prefs?.expertise || "Not provided"}</p>
            </div>
          </div>
        </motion.div>

        {/* Right Panel: Tabs + Jobs */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="lg:col-span-2 bg-[#1A1F2E] rounded-2xl p-6 shadow-lg border border-gray-800"
        >
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 border-b border-gray-700 pb-2 mb-4">
            <button
              onClick={() => setActiveTab("applied")}
              className={`flex items-center gap-2 pb-2 ${
                activeTab === "applied" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400"
              }`}
            >
              <Briefcase size={18} /> Applied Jobs
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex items-center gap-2 pb-2 ${
                activeTab === "saved" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400"
              }`}
            >
              <Save size={18} /> Saved Jobs
            </button>
            <button
              onClick={() => setActiveTab("bookmarks")}
              className={`flex items-center gap-2 pb-2 ${
                activeTab === "bookmarks" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400"
              }`}
            >
              <Bookmark size={18} /> Bookmarks
            </button>
          </div>

          {/* Job Cards */}
          <div className="flex flex-col gap-4">{renderJobs()}</div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
