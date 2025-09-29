import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Query } from "appwrite";
import { tableDB } from "../services/appwrite";
import { motion } from "framer-motion";
import { Bookmark, Briefcase, Save } from "lucide-react";
import Tag from "../components/Tag";

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("applied");

  // Dummy jobs (future me DB se aayenge)
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

  
  useEffect(() => {
    (async () => {
      try {
        const res = await tableDB.listRows({
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  tableId: import.meta.env.VITE_APPWRITE_PROFILE_TABLE_NAME,
  queries: [
    Query.equal("userId", user.$id) 
  ]
});


        if (res && res.rows.length > 0) {
          setProfile(res.rows[0]); 
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    })();
  }, []);

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

  if (!profile) {
    return <div className="flex h-screen items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Panel */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-[#1A1F2E] rounded-2xl p-6 shadow-lg border border-gray-800 flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-2xl font-bold">
            {profile.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <h2 className="mt-3 text-xl font-bold text-center">{profile.name}</h2>
          <p className="text-gray-400 text-sm text-center">{user?.email}</p>

          {/* Details */}
          <div className="mt-6 space-y-4 w-full">
            <p><span className="text-gray-400 text-sm">Role: </span>{profile.role}</p>

            {profile.role === "seeker" && (
              <>
                <p><span className="text-gray-400 text-sm">Bio: </span>{profile.bio || "Not provided"}</p>
                <p><span className="text-gray-400 text-sm">Skills: </span>{profile.skills || "Not provided"}</p>
                {profile.resumeLink && (
                  <a href={profile.resumeLink} target="_blank" className="text-indigo-400 underline text-sm">
                    View Resume
                  </a>
                )}
              </>
            )}

            {profile.role === "company" && (
              <>
                <p><span className="text-gray-400 text-sm">Company: </span>{profile.companyName}</p>
                <p><span className="text-gray-400 text-sm">Industry: </span>{profile.industry}</p>
                <p><span className="text-gray-400 text-sm">About: </span>{profile.description}</p>
              </>
            )}
          </div>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="lg:col-span-2 bg-[#1A1F2E] rounded-2xl p-6 shadow-lg border border-gray-800"
        >
          <div className="flex flex-wrap gap-4 border-b border-gray-700 pb-2 mb-4">
            <button onClick={() => setActiveTab("applied")} className={activeTab === "applied" ? "text-indigo-400 border-b-2 border-indigo-400 pb-2" : "text-gray-400"}>
              <Briefcase size={18} /> Applied
            </button>
            <button onClick={() => setActiveTab("saved")} className={activeTab === "saved" ? "text-indigo-400 border-b-2 border-indigo-400 pb-2" : "text-gray-400"}>
              <Save size={18} /> Saved
            </button>
            <button onClick={() => setActiveTab("bookmarks")} className={activeTab === "bookmarks" ? "text-indigo-400 border-b-2 border-indigo-400 pb-2" : "text-gray-400"}>
              <Bookmark size={18} /> Bookmarks
            </button>
          </div>

          <div className="flex flex-col gap-4">{renderJobs()}</div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
